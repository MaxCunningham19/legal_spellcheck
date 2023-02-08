#!/bin/bash
DJANGO_PROJECT_ROOT="$(dirname $(dirname $(realpath $0)))"
cd "$DJANGO_PROJECT_ROOT"
# Source VENV
source env/bin/activate
# Add node binaries to PATH if they have not been added already. (if
# they exist at all).
([ -d client/node_modules ] && [[ $PATH =~ client/node_modules ]])\
    || PATH+=:$(realpath client/node_modules/.bin/)
# Define manage function that automatically loads the models we
# use. Use this instead of 'python3 mange.py'. When ran without any
# arguments, launches the shell.
manage() {
    (cd "$DJANGO_PROJECT_ROOT";
     PYTHONSTARTUP=./scripts/managerc.py python3 manage.py "${@:-shell}")
}
