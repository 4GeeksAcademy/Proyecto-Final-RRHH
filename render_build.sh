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
# Ejecutar npm en la carpeta donde está el package.json (raíz del repo).
# Detectamos dónde está `package.json` y construimos ahí. Añadimos diagnóstico para facilitar debugging en Render.
echo "Node: $(node --version)  npm: $(npm --version)"

if [ -f "package.json" ]; then
    echo "Usando package.json en $(pwd)"
elif [ -f "src/package.json" ]; then
    echo "Usando package.json en src/"
    cd src
else
    echo "ERROR: package.json no encontrado en la raíz ni en src/."
    exit 1
fi

npm install
npm run build

# 4. Asegurar que `dist` quede en la raíz (app.py lo busca en ./dist)
# - Si el build creó `src/dist`, lo movemos a la raíz.
# - Si el build creó `dist` en la raíz, no hacemos nada.
if [ -d "src/dist" ]; then
    rm -rf dist
    mv src/dist ./dist
fi