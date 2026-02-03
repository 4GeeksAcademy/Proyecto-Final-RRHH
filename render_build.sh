#!/usr/bin/env bash
# exit on error
set -o errexit

# 1. Instalar dependencias de Python
pip install pipenv
pipenv install

# 2. Ejecutar las migraciones de la base de datos
# Añadimos el path de src para que Flask encuentre la app
export PYTHONPATH=$PYTHONPATH:$(pwd)/src
pipenv run flask --app src/app db upgrade

# 3. Construir el Frontend (React)
# Entramos a la carpeta src donde está tu package.json
cd src
npm install
npm run build

# 4. Mover la carpeta dist a la raíz (Opcional pero recomendado)
# Esto asegura que app.py la encuentre donde la busca: ../dist
cd ..
if [ -d "src/dist" ]; then
    rm -rf dist
    mv src/dist ./dist
fi