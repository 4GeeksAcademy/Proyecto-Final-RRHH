"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Rol, Horario, Empresa, Reunion, Fichaje, Proyecto, Tarea
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy import select
from datetime import datetime


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user= db.session.execute(select(User).where(User.email == email, User.password == password)).scalar_one_or_none()

    if user is None:
        return jsonify({"msg": "Bad email or password"}), 401
    
    access_token = create_access_token(identity=str(user.id))
    return jsonify({"token": access_token, "user_id": user.id}), 200

@api.route('/reuniones', methods=["GET"])
@jwt_required()
def obtener_reuniones():
    current_user_id = int(get_jwt_identity())
    user = db.session.get(User, current_user_id)

    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    
    reuniones = user.reuniones

    return{
        "reuniones": [r.serialize() for r in reuniones]
    }, 200

@api.route('/proyectos', methods=["GET"])
@jwt_required()
def obtener_reuniones_y_tareas():
    current_user_id = int(get_jwt_identity())
    user = db.session.get(User, current_user_id)

    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    
    proyectos = user.proyectos

    return{
        "proyectos": [p.serialize() for p in proyectos]
    }, 200

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