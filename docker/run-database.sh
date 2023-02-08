docker run \
       -p ${POSTGRES_PORT:-5432}:5432 \
       -v sweng-32:/var/lib/postgresql/data \
       -e POSTGRES_USER=${POSTGRES_USER:-dev} \
       -e POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-dev} \
       -e POSTGRES_DB=${POSTGRES_DB:-database} \
       --network sweng-net \
       --name ${POSTGRES_HOST:-postgres} \
       ${DEBUG:+--entrypoint bash} \
       postgres:14.5
