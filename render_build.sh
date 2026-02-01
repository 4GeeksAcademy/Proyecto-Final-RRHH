#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build

python3 -m venv .venv
source .venv/bin/activate 
pip install pipenv

pipenv install

pipenv run upgrade
