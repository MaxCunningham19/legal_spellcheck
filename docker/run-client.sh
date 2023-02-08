docker run \
       -e POSTGRES_HOST=${POSTGRES_HOST:-postgres} \
       -e POSTGRES_USER=${POSTGRES_USER:-dev} \
       -e POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-dev} \
       -e POSTGRES_PORT=${POSTGRES_PORT:-5432} \
       -e POSTGRES_DB=${POSTGRES_DB:-database} \
       -it --rm ${DEBUG:+--entrypoint bash} \
       --network sweng-net "$@" \
       sweng-32-client
