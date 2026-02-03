#!/usr/bin/env bash
# exit on error
set -o errexit

# Frontend
npm install
npm run build

# Backend - Instalación
pip install pipenv
pipenv install --deploy

# Migraciones (Quita el espacio y el comentario)
pipenv run flask db upgrade