#!/bin/bash
# 
# This script sets the POSTGRES_HOST environment variable to the
# IP Address of the running database container.
container=$(docker container list | awk '/database/ { print $1 }')
[ -z "$container" ] && echo No database container running... Doing nothing && return 1
host=$(docker inspect -f '{{ range .NetworkSettings.Networks }}{{ .IPAddress }}{{end}}' $container)
export POSTGRES_HOST=$host
