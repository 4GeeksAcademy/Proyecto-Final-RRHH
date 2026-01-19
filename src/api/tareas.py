from flask import Blueprint, jsonify
from .models import Tarea, db

tareas_bp = Blueprint('tareas', __name__)

@tareas_bp.route('/api/tareas', methods=['GET'])
def obtener_tareas():
    try:
        tareas = Tarea.query.all()
        return jsonify([t.serialize() for t in tareas])
    except Exception as e:
        return jsonify({"error": str(e)}), 500