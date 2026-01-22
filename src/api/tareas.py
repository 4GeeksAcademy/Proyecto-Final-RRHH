# src/api/tareas.py
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from .models import Tarea, User, db

tareas_bp = Blueprint('tareas', __name__)

@tareas_bp.route('/tareas', methods=['GET'])  
@jwt_required()
def obtener_tareas():
    try:
        current_user_id = int(get_jwt_identity())
        user = db.session.get(User, current_user_id)
        
        if user is None:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        # Obtener tareas de los proyectos del usuario
        tareas = []
        for proyecto in user.proyectos:
            tareas.extend(proyecto.tareas)
        
        return jsonify([t.serialize() for t in tareas]), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500