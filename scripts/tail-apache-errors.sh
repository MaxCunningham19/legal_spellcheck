docker exec \
       $(docker container ls | awk '/webserver/ { print $1 }') \
       tail -f /var/log/apache2/error.log
