"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import uuid
import os
from werkzeug.utils import secure_filename
from datetime import datetime
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Rol, Horario, Empresa, Reunion, Fichaje, Tarea
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy import select


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# CREAR TOKEN PARA INICIAR SESIÓN


@api.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = db.session.execute(select(User).where(
        User.email == email, User.password == password)).scalar_one_or_none()

    if user is None:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=str(user.id))
    return jsonify({"token": access_token, "user_id": user.id}), 200


# REUNIONES
# OBTENER REUNIONES DEL USUARIO
@api.route('/reuniones', methods=["GET"])
@jwt_required()
def obtener_reuniones():
    current_user_id = int(get_jwt_identity())
    user = db.session.get(User, current_user_id)

    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    reuniones = (
        db.session.query(Reunion)
        .join(Reunion.usuarios)
        .filter(User.id == current_user_id)
        .distinct(Reunion.link)
        .all()
    )

    return {
        "reuniones": [r.serialize() for r in reuniones]
    }, 200

# CREAR REUNION


@api.route('/reunion', methods=["POST"])
@jwt_required()
def crear_reunion():
    data = request.get_json()
    current_user_id = int(get_jwt_identity())

    organizador = db.session.get(User, current_user_id)
    if organizador is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    nueva_reunion = Reunion(
        nombre=data.get("nombre"),
        link=data.get("link"),
        fecha=datetime.fromisoformat(data.get("fecha")),
        duracion=int(data.get("duracion")),
        organizador_id=current_user_id
    )

    db.session.add(nueva_reunion)
    db.session.commit()

    nueva_reunion.usuarios.append(organizador)

    for u in data.get("usuarios", []):
        user = db.session.execute(
            select(User).where(User.email == u.get("email"))
        ).scalar_one_or_none()

        if user and user not in nueva_reunion.usuarios:
            nueva_reunion.usuarios.append(user)

    db.session.commit()

    return jsonify({
        "msg": "Reunión creada con éxito",
        "reunion": nueva_reunion.serialize()
    }), 200


# PROYECTOS
# OBTENER TODOS LOS PROYECTOS DEL USUARIO CON SUS TAREAS ASIGNADAS
# @api.route('/proyectos', methods=["GET"])
# @jwt_required()
# def obtener_reuniones_y_tareas():
 #   current_user_id = int(get_jwt_identity())
  #  user = db.session.get(User, current_user_id)

   # if user is None:
    #    return jsonify({"msg": "Usuario no encontrado"}), 404

    # proyectos = db.session.execute(select(Proyecto)).scalars().all()

    # return {
    #   "proyectos": [p.serialize() for p in proyectos]
    # }, 200

# OBTENER UN SOLO PROYECTO CON SUS TAREAS
# @api.route('/proyecto/<int:proyecto_id>', methods=["GET"])
# @jwt_required()
# def obtener_proyecto(proyecto_id):
 #   current_user_id = int(get_jwt_identity())
  #  user = db.session.get(User, current_user_id)

   # proyecto = db.session.get(Proyecto, proyecto_id)

    # if user is None:
    #   return jsonify({"msg": "Usuario no encontrado"}), 404

    # if proyecto is None:
    #   return jsonify({"msg": "Proyecto no encontrado"}), 501

    # return jsonify(proyecto.serialize()), 200

# FICHAJES
# OBTENER TODOS LOS FICHAJES DEL USUARIO
@api.route('/mis-fichajes', methods=["GET"])
@jwt_required()
def obtener_mis_fichajes():
    current_user_id = int(get_jwt_identity())

    fichajes = (
        db.session.execute(
            select(Fichaje)
            .where(Fichaje.user_id == current_user_id)
            .order_by(Fichaje.hora_entrada.desc())
        )
        .scalars()
        .all()
    )

    return jsonify({
        "fichajes": [f.serialize() for f in fichajes]
    }), 200

# CRAR REGISTRO DE FICHAJE DEL USUARIO


@api.route('/fichaje', methods=["POST"])
@jwt_required()
def fichar():
    current_user_id = int(get_jwt_identity())

    ultimo_fichaje = (
        db.session.execute(
            select(Fichaje)
            .where(Fichaje.user_id == current_user_id)
            .order_by(Fichaje.hora_entrada.desc())
        )
        .scalars()
        .first()
    )

    if ultimo_fichaje is None or ultimo_fichaje.hora_salida is not None:
        nuevo_fichaje = Fichaje(
            user_id=current_user_id,
            hora_entrada=datetime.now(),
            fecha=datetime.now().date()
        )
        db.session.add(nuevo_fichaje)
        db.session.commit()

        return jsonify({
            "msg": "Entrada registrada",
            "fichaje": nuevo_fichaje.serialize()
        }), 201

    ultimo_fichaje.hora_salida = datetime.now()
    db.session.commit()

    return jsonify({
        "msg": "Salida registrada",
        "fichaje": ultimo_fichaje.serialize()
    }), 200


# USUARIOS
# OBTENER TODOS LOS USUARIOS DE LA MISMA EMPRESA QUE EL ADMINISTRADOR
@api.route('/usuarios', methods=["GET"])
@jwt_required()
def obtener_usuarios():
    current_user_id = int(get_jwt_identity())
    admin = db.session.get(User, current_user_id)

    usuarios = db.session.execute(select(User).where(
        User.empresa_id == admin.empresa_id).order_by(User.id.asc())).scalars().all()

    if admin is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    return {
        "usuarios": [u.serialize() for u in usuarios]
    }, 200

# CREAR USUARIO


@api.route('/usuario', methods=["POST"])
@jwt_required()
def crear_usuario():
    data = request.get_json()
    current_user_id = int(get_jwt_identity())

    user = db.session.get(User, current_user_id)

    if user is None:
        return ({"msg": "Usuario no encontrado"}), 404

    nuevo_usuario = User(
        nombre=data.get("nombre"),
        apellidos=data.get("apellidos"),
        password=data.get("password"),
        email=data.get("email"),
        dni=data.get("dni"),
        telefono=data.get("telefono"),
        foto_perfil=data.get("foto_perfil"),
        estado=data.get("estado"),
        link_calendly=data.get("link_calendly"),
        empresa_id=user.empresa_id,
        rol_id=data.get("rol_id"),
        horario_id=data.get("horario_id")
    )

    db.session.add(nuevo_usuario)
    db.session.commit()

    return jsonify({
        "msg": "Usuario creado correctamente",
        "usuario": nuevo_usuario.serialize()
    }), 200

# ELIMINAR UN USUARIO


@api.route('/usuario/<int:usuario_id>', methods=["DELETE"])
@jwt_required()
def eliminar_usuario(usuario_id):
    current_user_id = int(get_jwt_identity())
    user = db.session.get(User, current_user_id)

    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    if user.id == usuario_id:
        return jsonify({"msg": "No puedes eliminar tu usuario"}), 405

    usuario = db.session.execute(select(User).where(
        User.id == usuario_id)).scalar_one_or_none()
    db.session.delete(usuario)
    db.session.commit()

    return jsonify({
        "msg": "Usuario eliminado correctamente"
    }), 200

# OBTENER EL USUARIO ACTUAL


@api.route('/usuario', methods=["GET"])
@jwt_required()
def obtener_usuario_actual():
    current_user_id = int(get_jwt_identity())
    user = db.session.get(User, current_user_id)

    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    return jsonify({"usuario": user.serialize()}), 200

# ACTUALIZAR EL USUARIO ACTUAL (nombre, apellidos, telefono, etc.)


@api.route('/usuario', methods=["PUT"])
@jwt_required()
def actualizar_usuario_actual():
    current_user_id = int(get_jwt_identity())
    user = db.session.get(User, current_user_id)

    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    data = request.get_json() or {}

    user.nombre = data.get("nombre", user.nombre)
    user.apellidos = data.get("apellidos", user.apellidos)
    user.telefono = data.get("telefono", user.telefono)
    db.session.commit()

    return jsonify({"usuario": user.serialize()}), 200


# SUBIR Y SETEAR FOTO DE PERFIL

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@api.route('/usuario/photo', methods=["POST"])
@jwt_required()
def upload_usuario_foto():
    current_user_id = int(get_jwt_identity())
    user = db.session.get(User, current_user_id)

    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    if 'file' not in request.files:
        return jsonify({"msg": "No file provided"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"msg": "No selected file"}), 400

    if not allowed_file(file.filename):
        return jsonify({"msg": "Invalid file type"}), 400

    filename_ext = secure_filename(file.filename)
    ext = filename_ext.rsplit('.', 1)[1].lower()
    filename = f"{uuid.uuid4().hex}.{ext}"

    # Guardar en la carpeta uploads del proyecto (no en src/uploads)
    uploads_folder = os.path.join(
        os.path.dirname(__file__), '..', '..', 'uploads')
    os.makedirs(uploads_folder, exist_ok=True)

    filepath = os.path.join(uploads_folder, filename)
    file.save(filepath)

    # Eliminar foto previa si existía y no era la por defecto
    try:
        old = getattr(user, 'foto_perfil', None)
        if old and old != 'logo.png':
            old_path = os.path.join(uploads_folder, old)
            if os.path.exists(old_path):
                os.remove(old_path)
    except Exception as e:
        # no bloquear la subida por fallos al eliminar
        print('Warning: no se pudo eliminar foto antigua:', e)

    user.foto_perfil = filename
    db.session.commit()

    # Devolver la URL pública
    base = request.host_url.rstrip('/')
    url = f"{base}/uploads/{filename}"

    return jsonify({"foto_perfil": filename, "url": url}), 200


# OBTENER USUARIO POR ID
@api.route('/usuario/<int:usuario_id>', methods=["GET"])
@jwt_required()
def obtener_usuario_por_id(usuario_id):
    current_user_id = int(get_jwt_identity())
    user = db.session.get(User, current_user_id)

    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    usuario = db.session.get(User, usuario_id)

    if usuario is None:
        return jsonify({"msg": "El usuario seleccionado no se encuentra"}), 500

    return jsonify({"usuario": usuario.serialize()}), 200

# ACTUALIZAR USUARIO POR ID


@api.route('/usuario/<int:usuario_id>', methods=["PUT"])
@jwt_required()
def actualizar_usuario(usuario_id):
    data = request.get_json()
    current_user_id = int(get_jwt_identity())

    user = db.session.get(User, current_user_id)

    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    usuario_actualizado = db.session.get(User, usuario_id)

    if usuario_actualizado is None:
        return jsonify({"msg": "El usuario sleccionado no se ha encontraod"}), 500

    usuario_actualizado.nombre = data.get("nombre", usuario_actualizado.nombre)
    usuario_actualizado.apellidos = data.get(
        "apellidos", usuario_actualizado.apellidos)
    usuario_actualizado.email = usuario_actualizado.email
    usuario_actualizado.dni = usuario_actualizado.dni
    usuario_actualizado.telefono = data.get(
        "telefono", usuario_actualizado.telefono)
    usuario_actualizado.rol_id = data.get("rol_id", usuario_actualizado.rol_id)
    usuario_actualizado.horario_id = data.get(
        "horario_id", usuario_actualizado.horario_id)

    db.session.commit()

    return jsonify({
        "msg": "Usuario creado correctamente",
        "usuario": usuario_actualizado.serialize()
    }), 200

# ROLES
# OBTENER TODOS LOS ROLES DE LA MISMA EMPRESA


@api.route('/roles', methods=["GET"])
@jwt_required()
def obtener_roles():
    current_user_id = int(get_jwt_identity())
    user = db.session.get(User, current_user_id)

    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    roles = db.session.execute(select(Rol).where(
        Rol.empresa_id == user.empresa_id).order_by(Rol.id.asc())).scalars().all()

    return {
        "roles": [r.serialize() for r in roles]
    }, 200

# ELIMINAR UN ROL


@api.route('/rol/<int:rol_id>', methods=["DELETE"])
@jwt_required()
def eliminar_rol(rol_id):
    currrent_user_id = int(get_jwt_identity())
    user = db.session.get(User, currrent_user_id)

    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    rol = db.session.execute(select(Rol).where(
        Rol.id == rol_id)).scalar_one_or_none()
    db.session.delete(rol)
    db.session.commit()

    return jsonify({
        "msg": "Rol eliminado correctamente"
    }), 200

# CREAR UN ROL


@api.route('/rol', methods=["POST"])
@jwt_required()
def crear_rol():
    data = request.get_json()
    current_user_id = int(get_jwt_identity())

    user = db.session.get(User, current_user_id)

    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    nuevo_rol = Rol(
        nombre=data.get("nombre"),
        es_admin=data.get("es_admin", False),
        puede_crear_reunion=data.get("puede_crear_reunion", False),
        empresa_id=user.empresa_id
    )

    db.session.add(nuevo_rol)
    db.session.commit()

    return jsonify({
        "msg": "Rol creado correctamente",
        "rol": nuevo_rol.serialize()
    }), 200

# OBTENER ROL POR ID


@api.route('/rol/<int:rol_id>', methods=["GET"])
@jwt_required()
def obtener_rol_por_id(rol_id):
    current_user_id = int(get_jwt_identity())
    user = db.session.get(User, current_user_id)

    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    rol = db.session.get(Rol, rol_id)

    if rol is None:
        return jsonify({"msg": "El usuario seleccionado no se encuentra"}), 500

    return jsonify({"rol": rol.serialize()}), 200

# ACTUALIZAR UN ROL


@api.route('/rol/<int:rol_id>', methods=["PUT"])
@jwt_required()
def actualizar_rol(rol_id):
    data = request.get_json()
    current_user_id = int(get_jwt_identity())

    user = db.session.get(User, current_user_id)

    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    rol_actualizado = db.session.get(Rol, rol_id)

    if rol_actualizado is None:
        return jsonify({"msg": "El rol seleccionado no se ha encontrado"}), 500

    rol_actualizado.nombre = data.get("nombre", rol_actualizado.nombre)
    rol_actualizado.es_admin = data.get("es_admin", rol_actualizado.es_admin)
    rol_actualizado.puede_crear_reunion = data.get(
        "puede_crear_reunion", rol_actualizado.puede_crear_reunion)
    rol_actualizado.empresa_id = user.empresa_id

    db.session.commit()

    return jsonify({
        "msg": "Rol actualizado correctamente",
        "rol": rol_actualizado.serialize()
    }), 200

# HORARIOS
# OBTENER TODOS LOS HORARIOS DE LA MISMA EMPRESA


@api.route('/horarios', methods=["GET"])
@jwt_required()
def obtener_horarios():
    current_user_id = int(get_jwt_identity())
    user = db.session.get(User, current_user_id)

    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    horarios = db.session.execute(select(Horario).where(
        Horario.empresa_id == user.empresa_id).order_by(Horario.id.asc())).scalars().all()

    return {
        "horarios": [h.serialize() for h in horarios]
    }, 200

# ELIMINAR UN HORARIO


@api.route('/horario/<int:horario_id>', methods=["DELETE"])
@jwt_required()
def eliminar_horario(horario_id):
    current_user_id = int(get_jwt_identity())
    user = db.session.get(User, current_user_id)

    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    horario = db.session.execute(select(Horario).where(
        Horario.id == horario_id)).scalar_one_or_none()
    db.session.delete(horario)
    db.session.commit()

    return jsonify({
        "msg": "Horario eliminado correctamente"
    }), 200

# CREAR UN HORARIO


@api.route('/horario', methods=["POST"])
@jwt_required()
def crear_horario():
    data = request.get_json()
    current_user_id = int(get_jwt_identity())

    user = db.session.get(User, current_user_id)

    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    nuevo_horario = Horario(
        name=data.get("name"),
        lunes_entrada=parse_time(data.get("lunes_entrada")),
        lunes_salida=parse_time(data.get("lunes_salida")),
        martes_entrada=parse_time(data.get("martes_entrada")),
        martes_salida=parse_time(data.get("martes_salida")),
        miercoles_entrada=parse_time(data.get("miercoles_entrada")),
        miercoles_salida=parse_time(data.get("miercoles_salida")),
        jueves_entrada=parse_time(data.get("jueves_entrada")),
        jueves_salida=parse_time(data.get("jueves_salida")),
        viernes_entrada=parse_time(data.get("viernes_entrada")),
        viernes_salida=parse_time(data.get("viernes_salida")),
        sabado_entrada=parse_time(data.get("sabado_entrada")),
        sabado_salida=parse_time(data.get("sabado_salida")),
        domingo_entrada=parse_time(data.get("domingo_entrada")),
        domingo_salida=parse_time(data.get("domingo_salida")),
        empresa_id=user.empresa_id
    )

    db.session.add(nuevo_horario)
    db.session.commit()

    return jsonify({
        "msg": "Horario creado correctamente",
        "horario": nuevo_horario.serialize()
    }), 200

# OBTENER UN HORARIO POR ID


@api.route('/horario/<int:horario_id>', methods=["GET"])
@jwt_required()
def obtener_horario_por_id(horario_id):
    current_user_id = int(get_jwt_identity())

    user = db.session.get(User, current_user_id)

    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 400

    horario = db.session.get(Horario, horario_id)
    return jsonify({"horario": horario.serialize()}), 200

# ACTUALIZAR UN HORARIO


@api.route('/horario/<int:horario_id>', methods=["PUT"])
@jwt_required()
def actualizar_horario(horario_id):
    data = request.get_json()
    current_user_id = int(get_jwt_identity())

    user = db.session.get(User, current_user_id)

    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    horario_actualizado = db.session.get(Horario, horario_id)

    horario_actualizado.name = data.get("name", horario_actualizado.name)
    horario_actualizado.lunes_entrada = parse_time(
        data.get("lunes_entrada")) or horario_actualizado.lunes_entrada
    horario_actualizado.lunes_salida = parse_time(
        data.get("lunes_salida")) or horario_actualizado.lunes_salida
    horario_actualizado.martes_entrada = parse_time(
        data.get("martes_entrada")) or horario_actualizado.martes_entrada
    horario_actualizado.martes_salida = parse_time(
        data.get("martes_salida")) or horario_actualizado.martes_salida
    horario_actualizado.miercoles_entrada = parse_time(
        data.get("miercoles_entrada")) or horario_actualizado.miercoles_entrada
    horario_actualizado.miercoles_salida = parse_time(
        data.get("miercoles_salida")) or horario_actualizado.miercoles_salida
    horario_actualizado.jueves_entrada = parse_time(
        data.get("jueves_entrada")) or horario_actualizado.jueves_entrada
    horario_actualizado.jueves_salida = parse_time(
        data.get("jueves_salida")) or horario_actualizado.jueves_salida
    horario_actualizado.viernes_entrada = parse_time(
        data.get("viernes_entrada")) or horario_actualizado.viernes_entrada
    horario_actualizado.viernes_salida = parse_time(
        data.get("viernes_salida")) or horario_actualizado.viernes_salida
    horario_actualizado.sabado_entrada = parse_time(
        data.get("sabado_entrada")) or horario_actualizado.sabado_entrada
    horario_actualizado.sabado_salida = parse_time(
        data.get("sabado_salida")) or horario_actualizado.sabado_salida
    horario_actualizado.domingo_entrada = parse_time(
        data.get("domingo_entrada")) or horario_actualizado.domingo_entrada
    horario_actualizado.domingo_salida = parse_time(
        data.get("domingo_salida")) or horario_actualizado.domingo_salida
    horario_actualizado.empresa_id = user.empresa_id

    db.session.commit()

    return jsonify({
        "msg": "Horario actualizado correctamente",
        "horario": horario_actualizado.serialize()
    }), 200


def parse_time(value):
    if not value or value.strip() == "":
        return None
    return datetime.strptime(value, "%H:%M").time()

# cambios de yessi empresa


@api.route('/empresa', methods=["GET"])
@jwt_required()
def obtener_empresa():
    current_user_id = int(get_jwt_identity())
    user = db.session.get(User, current_user_id)

    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    empresa = db.session.get(Empresa, user.empresa_id)

    if empresa is None:
        return jsonify({"msg": "Empresa no encontrada"}), 404

    return jsonify({
        "empresa": empresa.serialize()
    }), 200


@api.route('/empresa', methods=["POST"])
def crear_empresa():
    data = request.get_json()

    if not data.get("nombre"):
        return jsonify({"msg": "El nombre de la empresa es obligatorio"}), 400

    nueva_empresa = Empresa(
        nombre=data.get("nombre"),
        imagen=data.get("imagen", "logo.jpg")
    )

    db.session.add(nueva_empresa)
    db.session.commit()

    return jsonify({
        "msg": "Empresa creada correctamente",
        "empresa": nueva_empresa.serialize()
    }), 201


@api.route('/empresa/<int:empresa_id>', methods=['DELETE'])
def eliminar_empresa(empresa_id):
    empresa = Empresa.query.get(empresa_id)
    if not empresa:
        return jsonify({"error": "Empresa no encontrada"}), 404

    try:
        db.session.delete(empresa)
        db.session.commit()
        return jsonify({"mensaje": f"Empresa {empresa.nombre} eliminada correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "No se pudo eliminar la empresa", "detalle": str(e)}), 500

# CAMBIOS DE YESSICA DEL FETCH

# ELIMINAR UN FICHAJE (solo administrador)


@api.route('/fichaje/<int:fichaje_id>', methods=['DELETE'])
@jwt_required()
def eliminar_fichaje(fichaje_id):
    current_user_id = int(get_jwt_identity())
    admin = db.session.get(User, current_user_id)

    if admin is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    # Solo admin puede eliminar
    if not admin.rol.es_admin:
        return jsonify({"msg": "No tienes permisos para eliminar fichajes"}), 403

    fichaje = db.session.get(Fichaje, fichaje_id)
    if fichaje is None:
        return jsonify({"msg": "Fichaje no encontrado"}), 404

    db.session.delete(fichaje)
    db.session.commit()
    return jsonify({"msg": "Fichaje eliminado correctamente"}), 200


# EDITAR UN FICHAJE (solo administrador)
@api.route('/fichaje/<int:fichaje_id>', methods=['PUT'])
@jwt_required()
def editar_fichaje(fichaje_id):
    current_user_id = int(get_jwt_identity())
    admin = db.session.get(User, current_user_id)

    if admin is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    if not admin.rol.es_admin:
        return jsonify({"msg": "No tienes permisos para editar fichajes"}), 403

    data = request.get_json()
    fichaje = db.session.get(Fichaje, fichaje_id)
    if fichaje is None:
        return jsonify({"msg": "Fichaje no encontrado"}), 404

    # Actualizamos solo si vienen los campos
    if "hora_entrada" in data:
        fichaje.hora_entrada = datetime.fromisoformat(
            data["hora_entrada"]) if data["hora_entrada"] else None
    if "hora_salida" in data:
        fichaje.hora_salida = datetime.fromisoformat(
            data["hora_salida"]) if data["hora_salida"] else None
    if "fecha" in data:
        fichaje.fecha = datetime.fromisoformat(
            data["fecha"]).date() if data["fecha"] else fichaje.fecha

    db.session.commit()
    return jsonify({"msg": "Fichaje actualizado correctamente", "fichaje": fichaje.serialize()}), 200

# CAMBIOS DE YESSICA DE TAREAS Y PROYECTO

# -----------------------------
# TAREAS
# -----------------------------

# GET todas las tareas del usuario


@api.route('/tareas', methods=['GET'])
@jwt_required()
def get_tareas():
    user_id = int(get_jwt_identity())

    tareas = Tarea.query.filter_by(user_id=user_id).all()
    return jsonify([tarea_serialize(t) for t in tareas]), 200


@api.route('/tareas', methods=['POST'])
@jwt_required()
def create_tarea():
    user_id = int(get_jwt_identity())
    data = request.get_json() or {}

    nombre = data.get("nombre")
    estado = data.get("estado", "Por Hacer")

    if not nombre:
        return jsonify({"msg": "El nombre es requerido"}), 400

    nueva_tarea = Tarea(
        nombre=nombre,
        estado=estado,
        user_id=user_id
    )

    db.session.add(nueva_tarea)
    db.session.commit()

    return jsonify(tarea_serialize(nueva_tarea)), 201


@api.route('/tareas/<int:tarea_id>', methods=['PUT', 'PATCH'])
@jwt_required()
def update_tarea(tarea_id):
    user_id = int(get_jwt_identity())
    tarea = db.session.get(Tarea, tarea_id)

    if not tarea:
        return jsonify({"msg": "Tarea no encontrada"}), 404

    if tarea.user_id != user_id:
        return jsonify({"msg": "No autorizado"}), 403

    data = request.get_json() or {}

    if "nombre" in data:
        tarea.nombre = data["nombre"]
    if "estado" in data:
        tarea.estado = data["estado"]

    db.session.commit()
    return jsonify(tarea_serialize(tarea)), 200


@api.route('/tareas/<int:tarea_id>', methods=['DELETE'])
@jwt_required()
def delete_tarea(tarea_id):
    user_id = int(get_jwt_identity())
    tarea = db.session.get(Tarea, tarea_id)

    if not tarea:
        return jsonify({"msg": "Tarea no encontrada"}), 404

    if tarea.user_id != user_id:
        return jsonify({"msg": "No autorizado"}), 403

    db.session.delete(tarea)
    db.session.commit()
    return jsonify({"msg": "Tarea eliminada"}), 200


def tarea_serialize(tarea):
    return {
        "id": tarea.id,
        "nombre": tarea.nombre,
        "estado": tarea.estado,
        "user_id": tarea.user_id
    }

# Mensajes Yessica
