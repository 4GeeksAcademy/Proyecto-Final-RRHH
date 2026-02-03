"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from datetime import timedelta

from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

# Configuración de rutas para archivos estáticos
# Buscamos la carpeta 'dist' que está un nivel arriba de 'src'
root_path = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
static_file_dir = os.path.join(root_path, 'dist')

app = Flask(__name__)
app.url_map.strict_slashes = False

# Configuración de JWT
app.config["JWT_SECRET_KEY"] = "super_key"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=7)

# Configuración de Base de Datos
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicialización de extensiones
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)
jwt = JWTManager(app)

# Configuración de CORS
CORS(app, resources={r"/api/*": {"origins": "*"}}, expose_headers=["Authorization"])

# Configuración de Admin y Comandos
setup_admin(app)
setup_commands(app)

# Registro del Blueprint de la API
app.register_blueprint(api, url_prefix='/api')

# Manejo de errores globales
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# --- RUTAS PARA SERVIR EL FRONTEND (REACT) ---

@app.route('/')
def sitemap():
    # Si estamos en modo debug (local), mostramos el sitemap
    if os.getenv("FLASK_DEBUG") == "1":
        return generate_sitemap(app)
    # En producción (Render), servimos el index.html de React
    return send_from_directory(static_file_dir, 'index.html')

@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    # Verificamos si el archivo solicitado existe físicamente en 'dist'
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        # Si no existe (es una ruta de React), enviamos el index.html
        path = 'index.html'
    
    response = send_from_directory(static_file_dir, path)
    # Desactivamos caché para evitar que el navegador cargue versiones viejas
    response.cache_control.max_age = 0 
    return response

# Ejecución del servidor
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)