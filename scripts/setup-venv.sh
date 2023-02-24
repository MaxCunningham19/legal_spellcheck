#!/bin/bash

# Create VENV
python3 -m venv env

# Activate VENV
source env/bin/activate

# Install django and djangorestframework
pip3 install django djangorestframework psycopg2-binary
