#!/bin/bash
#Executing this will launch a shell in a running webserver container
#that you started using 'docker compose up webserver-local'. It will
#have the node binary locations placed in PATH and the VENV activation
#script soruced.
# 
# Example Usage:
#  > sh scripts/shell.sh
#  $ (env) ....
container=$(docker container list | awk '/webserver/ { print $1 }')
docker container exec -it $container bash -c '. scripts/install.sh && exec bash -i'
