#!/bin/bash

# You should invoke this script via:
#
#      . scripts/install.sh
#
# It should set up the project root directory for you.

DJANGO_PROJECT_ROOT="$(dirname $(dirname $(realpath $0)))"
alias pushdq='1>/dev/null pushd'
alias popdq='1>/dev/null popd'

pushdq "$DJANGO_PROJECT_ROOT"

# Set up VENV if VENV does not already exist
[ ! -d env ] && sh scripts/setup-venv.sh

# Source VENV
source env/bin/activate

# Add node binaries to PATH if they have not been added already.
pushdq client
[[ $PATH =~ client/node_modules ]] || PATH+=:$(npm bin)
popdq

# Define manage function that automatically loads the models we
# use. Use this instead of 'python3 mange.py'. When ran without any
# arguments, launches the shell.
manage() {
    pushdq "$DJANGO_PROJECT_ROOT"
    PYTHONSTARTUP=./scripts/managerc.py python3 manage.py "${@:-shell}"
    popdq
}

popdq
