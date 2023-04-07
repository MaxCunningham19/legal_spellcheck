# A string that is either 'local' or 'production'. If set to local,
# the bundle will be copied from your local machine. If set to
# production, it will be produced in docker. Note that this will
# create a new docker image with each package.json update, which will
# occupy hundreds of megabytes on your disk. This should only be used
# in the CI/CD pipeline.
ARG BUNDLE=local

FROM scratch AS local-bundle
COPY ./static/client/js/main.js /var/www/apache/static/client/js/main.js

FROM node:latest AS production-bundle
WORKDIR /var/www/apache/client
COPY client .
RUN npm install
RUN PATH=$PATH:node_modules/.bin webpack

# Depending on the BUNDLE argument, choose the local bundle or the
# production bundle.
FROM $BUNDLE-bundle as final-bundle

FROM alpine:latest AS setup-venv
WORKDIR /var/www/apache
COPY scripts/setup-venv.sh ./scripts/setup-venv.sh
RUN apk add py3-pip python3 && sh ./scripts/setup-venv.sh
 
FROM alpine:latest AS with-venv
RUN apk add apache2 apache2-mod-wsgi bash tzdata nodejs aspell aspell-en
SHELL [ "/bin/bash", "-c" ]
RUN sed -i 's/localhost\/htdocs//' /etc/apache2/httpd.conf
COPY docker/httpd-suffix.conf httpd-suffix.conf
RUN cat httpd-suffix.conf >> /etc/apache2/httpd.conf ; \
    rm httpd-suffix.conf
WORKDIR /var/www/apache
COPY --from=setup-venv /var/www/apache/env ./env
COPY --from=final-bundle \
    /var/www/apache/static/client/js/main.js \
    ./static/client/js/main.js
COPY scripts ./scripts
COPY manage.py ./manage.py
COPY server ./server
COPY client ./client
COPY api ./api
RUN chown -R apache:apache ./
USER apache:apache
RUN . env/bin/activate && echo yes | python3 manage.py collectstatic

USER root:root

ENTRYPOINT [ "bash", "scripts/run-production.bash" ]

EXPOSE 80
EXPOSE 5432
