from datetime import datetime, timedelta
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, Rol, Horario, Empresa, Reunion, Fichaje, Proyecto, Tarea, Estado
from api.utils import APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy import select

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['GET'])
def handle_hello():
    return jsonify({"message": "Hello from backend!"}), 200

# --- 1. AUTENTICACIÓN ---

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

# --- 2. USUARIOS (GESTIÓN Y PERFIL) ---

@api.route('/usuario-actual', methods=["GET"])
@jwt_required()
def obtener_usuario_actual():
    current_user_id = get_jwt_identity()
    user = db.session.get(User, current_user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    return jsonify(user.serialize()), 200

@api.route('/usuarios', methods=["GET"])
@jwt_required()
def obtener_usuarios():
    current_user_id = get_jwt_identity()
    admin = db.session.get(User, current_user_id)
    if not admin:
        return jsonify({"msg": "No autorizado"}), 401
    
    usuarios = db.session.execute(
        select(User).where(User.empresa_id == admin.empresa_id).order_by(User.id.asc())
    ).scalars().all()
    return jsonify({"usuarios": [u.serialize() for u in usuarios]}), 200

@api.route('/usuario', methods=["POST"])
@jwt_required()
def crear_usuario():
    data = request.get_json()
    current_user_id = get_jwt_identity()
    admin = db.session.get(User, current_user_id)
    
    if not admin:
        return jsonify({"msg": "Admin no encontrado"}), 404

    nuevo_usuario = User(
        nombre=data.get("nombre"),
        apellidos=data.get("apellidos"),
        password=data.get("password"),
        email=data.get("email"),
        dni=data.get("dni"),
        telefono=data.get("telefono"),
        empresa_id=admin.empresa_id,
        rol_id=data.get("rol_id"),
        horario_id=data.get("horario_id")
    )
    db.session.add(nuevo_usuario)
    db.session.commit()
    return jsonify({"msg": "Usuario creado", "usuario": nuevo_usuario.serialize()}), 201

@api.route('/usuario/<int:usuario_id>', methods=["GET", "PUT", "DELETE"])
@jwt_required()
def gestionar_usuario(usuario_id):
    usuario = db.session.get(User, usuario_id)
    if not usuario:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    if request.method == "GET":
        return jsonify(usuario.serialize()), 200

    if request.method == "PUT":
        data = request.get_json()
        usuario.nombre = data.get("nombre", usuario.nombre)
        usuario.apellidos = data.get("apellidos", usuario.apellidos)
        usuario.telefono = data.get("telefono", usuario.telefono)
        usuario.rol_id = data.get("rol_id", usuario.rol_id)
        db.session.commit()
        return jsonify({"msg": "Usuario actualizado", "usuario": usuario.serialize()}), 200

    if request.method == "DELETE":
        current_user_id = get_jwt_identity()
        if str(current_user_id) == str(usuario_id):
            return jsonify({"msg": "No puedes eliminarte a ti mismo"}), 400
        db.session.delete(usuario)
        db.session.commit()
        return jsonify({"msg": "Usuario eliminado"}), 200

# --- 3. PROYECTOS Y TAREAS ---

@api.route('/proyectos', methods=["GET"])
@jwt_required()
def obtener_proyectos():
    proyectos = db.session.execute(select(Proyecto)).scalars().all()
    return jsonify({"proyectos": [p.serialize() for p in proyectos]}), 200

@api.route('/proyecto/<int:proyecto_id>', methods=["GET"])
@jwt_required()
def obtener_proyecto(proyecto_id):
    proyecto = db.session.get(Proyecto, proyecto_id)
    if not proyecto:
        return jsonify({"msg": "Proyecto no encontrado"}), 404
    return jsonify(proyecto.serialize()), 200

@api.route('/tareas', methods=["POST"])
@jwt_required()
def crear_tarea():
    data = request.get_json()
    nombre = data.get("nombre")
    proyecto_id = data.get("proyecto_id")
    
    if not nombre or not proyecto_id:
        return jsonify({"msg": "Faltan datos obligatorios"}), 400

    nueva_tarea = Tarea(
        nombre=nombre,
        proyecto_id=proyecto_id,
        estado=Estado.pendiente
    )
    db.session.add(nueva_tarea)
    db.session.commit()
    return jsonify(nueva_tarea.serialize()), 201

@api.route('/tareas/<int:tarea_id>', methods=["DELETE"])
@jwt_required()
def eliminar_tarea(tarea_id):
    tarea = db.session.get(Tarea, tarea_id)
    if not tarea:
        return jsonify({"msg": "Tarea no encontrada"}), 404
    db.session.delete(tarea)
    db.session.commit()
    return jsonify({"msg": "Tarea eliminada"}), 200

# --- 4. REUNIONES ---

@api.route('/reuniones', methods=["GET"])
@jwt_required()
def obtener_reuniones():
    current_user_id = get_jwt_identity()
    reuniones = (
        db.session.query(Reunion)
        .join(Reunion.usuarios)
        .filter(User.id == current_user_id)
        .distinct()
        .all()
    )
    return jsonify({"reuniones": [r.serialize() for r in reuniones]}), 200

# --- 5. FICHAJES ---

@api.route('/fichaje', methods=["POST"])
@jwt_required()
def fichar():
    current_user_id = get_jwt_identity()
    ultimo_fichaje = db.session.execute(
        select(Fichaje).where(Fichaje.user_id == current_user_id).order_by(Fichaje.hora_entrada.desc())
    ).scalars().first()

    if ultimo_fichaje is None or ultimo_fichaje.hora_salida is not None:
        nuevo_fichaje = Fichaje(user_id=current_user_id, hora_entrada=datetime.now(), fecha=datetime.now().date())
        db.session.add(nuevo_fichaje)
        db.session.commit()
        return jsonify({"msg": "Entrada registrada", "fichaje": nuevo_fichaje.serialize()}), 201

    ultimo_fichaje.hora_salida = datetime.now()
    db.session.commit()
    return jsonify({"msg": "Salida registrada", "fichaje": ultimo_fichaje.serialize()}), 200

# --- 6. ROLES Y HORARIOS ---

@api.route('/roles', methods=["GET"])
@jwt_required()
def obtener_roles():
    current_user_id = get_jwt_identity()
    user = db.session.get(User, current_user_id)
    roles = db.session.execute(select(Rol).where(Rol.empresa_id == user.empresa_id)).scalars().all()
    return jsonify({"roles": [r.serialize() for r in roles]}), 200

@api.route('/horarios', methods=["GET"])
@jwt_required()
def obtener_horarios():
    current_user_id = get_jwt_identity()
    user = db.session.get(User, current_user_id)
    horarios = db.session.execute(select(Horario).where(Horario.empresa_id == user.empresa_id)).scalars().all()
    return jsonify({"horarios": [h.serialize() for h in horarios]}), 200
