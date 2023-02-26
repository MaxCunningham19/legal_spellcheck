mkdir -p static/client/js
touch static/client/js/main.js
cd docker
docker-compose build
docker-compose up -d webserver
docker-compose exec -T webserver bash -c '. scripts/install.sh; python3 manage.py test'
