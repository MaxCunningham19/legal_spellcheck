#!/bin/bash

. scripts/install.sh

case "$2/$3" in
    # Ignore changes to node_modules
    *node_modules*) exit 1 ;;
    # Force refresh of website resources
    *.py|*.js|*.html|*.css) ./scripts/force-local-refresh.sh ;;
esac
