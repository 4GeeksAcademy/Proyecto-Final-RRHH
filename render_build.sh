#!/usr/bin/env bash
# exit on error
set -o errexit

# 1. Instalar dependencias
pip install pipenv
pipenv install

# 2. Ejecutar las migraciones
# Usamos --chdir o export PYTHONPATH para que encuentre 'wsgi' o 'app'
export PYTHONPATH=$PYTHONPATH:$(pwd)/src
pipenv run flask --app src/wsgi db upgrade