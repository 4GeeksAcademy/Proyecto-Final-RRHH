"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

import os
from flask_cors import CORS
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from datetime import timedelta


from flask_mail import Mail, Message

# from models import Person


ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../dist/')
app = Flask(__name__)
CORS(app)
app.url_map.strict_slashes = False
app.config["JWT_SECRET_KEY"] = "super_key"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=7)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)
jwt = JWTManager(app)

CORS(
    app,
    resources={r"/api/*": {"origins": "*"}},
    expose_headers=["Authorization"],
)

# CONFIGURACION DE CORREO ELECTRONICO (YESSI)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'teamcore2026@gmail.com'
app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD")

CORS(app)
mail = Mail(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


# @app.route('/email-prueba', methods=['GET'])
# def email_prueba():

# msg = Message(subject="email de prueba", sender='teamcore2026@gmail.com', recipients=['yessigarrido.work@gmail.com'])
# msg.body = ''
# mail.send(msg)

# return jsonify({
# "mensaje": 'Email sent successfully!'
# }),200


# route de correos electronicos Yessica

@app.route('/email-prueba', methods=['POST'])
def email_prueba():
    data = request.get_json()
    recipient = data.get("recipient")
    nombre = data.get("nombre")
    apellidos = data.get("apellidos")
    password = data.get("password")
    empresa_nombre = data.get("empresa_nombre")
   

    if not recipient or not nombre or not apellidos or not password:
        return jsonify({"error": "Faltan datos para el correo"}), 400

    # HTML inline basado en tu CardCorreoElectronico.jsx
    html_body = f"""
    <!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Bienvenido a {empresa_nombre}</title>
    <style>
        body {{ margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f5f7ff; }}
        .container {{ max-width:600px; margin:auto; background:white; border-radius:10px; padding:20px; }}
        .header {{ text-align:center; font-size:24px; font-weight:bold; margin-bottom:20px; }}
        .image-wrapper {{ text-align:center; margin:20px 0; }}
        .text-center {{ text-align:center; }}
        .text-blue {{ color:#1e40af; font-weight:bold; }}
        .text-red {{ color:#b91c1c; font-weight:bold; }}
        .border-bottom {{ border-bottom:2px solid black; padding-bottom:5px; display:inline-block; margin-bottom:10px; }}
        .mb-6 {{ margin-bottom:1.5rem; }}
        .w-150 {{ width:90%; max-width:450px; margin:auto; }}
        a {{ color:#1e40af; text-decoration:underline; }}
        p {{ margin:5px 0; }}
        table {{ width:100%; border-spacing:0; }}
        td {{ padding:0; }}
    </style>
    </head>
    <body>
    <table class="bodycorreo" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <div class="container">
            <div class="header">
              Bienvenido/a {nombre} {apellidos}! 🎉<br>ya formas parte de nuestro equipo🎉
            </div>

            <br>
            <br>

            <p class="text-center w-150 mb-6">
              <span class="border-bottom">Estamos muy felices de que te unas a nuestro equipo.</span><br>
              En <strong>{empresa_nombre}</strong> valoramos las ideas, el compromiso y las personas que hacen que las cosas sucedan.
              Aquí encontrarás un equipo dispuesto a apoyarte, aprender contigo y celebrar cada logro en el camino.<br>
              <span class="border-bottom">Esta es una nueva etapa, y estamos seguros de que tu aporte será clave para seguir construyendo grandes cosas juntos.
              ¡Gracias por sumarte, nos encanta tenerte aquí! 🚀</span>
            </p>

            <div class="text-center w-150 mb-6">
              <a href="">Acceso a {empresa_nombre}</a>
            </div>

            <div class="text-center w-150 mb-6">
              <span class="text-blue">Usuario:</span>
              <p>{recipient}</p>
              <span class="text-blue">Contraseña:</span>
              <p>{password}</p>
            </div>

            <p class="text-center w-150 mb-6">
              Para cambiar tu contraseña podrás hacerlo tal y como te indicamos aquí.<br>
              Por favor, no olvides que debes acceder siempre desde la <a href="https://tusitio.com/login">URL indicada en este email</a>.
              <br>
              <br>
              <span class="text-red">IMPORTANTE:</span> Es obligatorio generar una nueva contraseña por motivos de seguridad.
              <br>
              <br>
              Gracias😊
            </p>

            <div class="text-center w-150 mb-6 ">
             <strong>{empresa_nombre}</strong>
            </div>
          </div>
        </td>
      </tr>
    </table>
    </body>
    </html>
    """

    msg = Message(
        subject=f"Bienvenido a {empresa_nombre} 🚀",
        sender='teamcore2026@gmail.com',
        recipients=[recipient],
        html=html_body
    )

    mail.send(msg)
    return jsonify({"mensaje": "Email enviado correctamente"}), 200





@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

# Serve uploaded files (user profile images)
@app.route('/uploads/<path:filename>')
def uploaded_file(filename):
    uploads_folder = os.path.join(os.path.dirname(__file__), '..', 'uploads')
    return send_from_directory(uploads_folder, filename)


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
