#!/bin/bash

. scripts/install.sh

case "$1/$2" in
    *node_modules*)
        # Ignore changes to node_modules
        exit 1
        ;;
    *.py|*.js|*.html|*.css)
        # Copy updated static files
        echo yes | python3 manage.py collectstatic
        # Recompile javascript bundle
        cd client; webpack --mode development
        # Restart httpd
        httpd -k restart
        ;;
esac
