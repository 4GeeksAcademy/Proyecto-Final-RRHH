"""
Script para crear una imagen de avatar por defecto y actualizar la columna
`foto_perfil` en los usuarios que la tienen vacía o nula.

Ejecución:
  pipenv run python src/scripts/setup_default_avatar.py

Dependencias: debe poder importar `app` y `api.models` desde `src/`.
"""
import os
import base64
from app import app
from api.models import db, User

# 1x1 transparent PNG base64
PNG_BASE64 = (
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAA"
    "SUVORK5CYII="
)

uploads_folder = os.path.join(os.path.dirname(__file__), '..', '..', 'uploads')
logo_path = os.path.join(uploads_folder, 'logo.png')


def ensure_uploads_and_logo():
    os.makedirs(uploads_folder, exist_ok=True)
    # if file exists, do nothing
    if os.path.exists(logo_path):
        print(f"Logo por defecto ya existe en: {logo_path}")
        return

    data = base64.b64decode(PNG_BASE64)
    with open(logo_path, 'wb') as f:
        f.write(data)
    print(f"Escrito logo por defecto en {logo_path}")


def update_users_default_avatar():
    with app.app_context():
        users = User.query.filter(
            (User.foto_perfil == None) | (User.foto_perfil == '')).all()
        if not users:
            print("No hay usuarios con foto_perfil vacía o nula.")
            return
        for u in users:
            u.foto_perfil = 'logo.png'
        db.session.commit()
        print(f"Actualizados {len(users)} usuarios, asignada foto 'logo.png'.")


if __name__ == '__main__':
    ensure_uploads_and_logo()
    update_users_default_avatar()
    print('Hecho.')
