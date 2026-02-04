#!/bin/bash
set -e

echo "🔄 Limpiando migraciones anteriores..."
# Eliminar migraciones previas completamente
rm -rf ./migrations
rm -f /tmp/test.db

# Configurar para usar SQLite
export DATABASE_URL="sqlite:////tmp/test.db"

echo "🔧 Inicializando migraciones..."
# Reinicializar Alembic
pipenv run init

echo "📝 Creando migración inicial..."
# Crear primera migración desde los modelos actuales
pipenv run migrate -m "Initial migration"

echo "📤 Aplicando migraciones..."
# Aplicar todas las migraciones
pipenv run upgrade

echo "✅ Base de datos reseteada correctamente"
