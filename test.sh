source ~/.bashrc
mkdir -p static/client/js
touch static/client/js/main.js
cd docker
sudo docker-compose build
sudo docker-compose up -d webserver
sudo docker-compose exec -T webserver bash -c '. scripts/install.sh; python3 manage.py test'
sudo rm -rf ../static
sudo docker-compose down