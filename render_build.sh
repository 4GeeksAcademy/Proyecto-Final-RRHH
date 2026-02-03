#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build

# Instalación de dependencias de Python
pip install pipenv
pipenv install

# COMENTAMOS la línea de abajo temporalmente para que el despliegue NO falle
# pipenv run flask db upgrade