
FROM alpine:latest AS setup-venv
WORKDIR /var/www/apache
COPY scripts ./scripts
RUN apk add py3-pip python3 && sh ./scripts/setup-venv.sh
 
FROM alpine:latest AS with-venv
RUN apk add apache2 apache2-mod-wsgi bash
SHELL [ "/bin/bash", "-c" ]
RUN sed -i 's/localhost\/htdocs//' /etc/apache2/httpd.conf
COPY docker/httpd-suffix.conf httpd-suffix.conf
RUN cat httpd-suffix.conf >> /etc/apache2/httpd.conf ; \
    rm httpd-suffix.conf
WORKDIR /var/www/apache
COPY --from=setup-venv /var/www/apache/env ./env
COPY scripts ./scripts
COPY manage.py ./manage.py
COPY server ./server
COPY client ./client
RUN chown -R apache:apache ./
USER apache:apache
RUN . env/bin/activate && echo yes | python3 manage.py collectstatic

ENTRYPOINT [ "/bin/bash" ]
CMD [ "-c", "httpd" ]

USER root:root

EXPOSE 8080
EXPOSE 5432
