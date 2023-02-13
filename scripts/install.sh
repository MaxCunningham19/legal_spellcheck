#!/bin/bash
# Make sure that this script is being executed in the project root.
if [ ! -e manage.py ]
then
    echo You must execute this script in the root of the repository!
    exit 1
fi
export DJANGO_PROJECT_ROOT="$(pwd)"
# Source VENV
source env/bin/activate
# Add node binaries to PATH if they have not been added already. (if
# they exist at all).
([ -d client/node_modules/.bin/ ] && [[ ! $PATH =~ client/node_modules ]]) \
    && PATH+=:$(realpath client/node_modules/.bin/)
# Define manage function that automatically loads the models we
# use. Use this instead of 'python3 mange.py'. When ran without any
# arguments, launches the shell.
manage() {
    (cd "$DJANGO_PROJECT_ROOT"
     . scripts/set-postgres-host.sh
     PYTHONSTARTUP=./scripts/managerc.py python3 manage.py "${@:-shell}")
}
