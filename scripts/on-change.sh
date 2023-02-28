#!/bin/bash
echo File change event: $*
. scripts/install.sh
case "$2" in
    # Ignore changes to node_modules
    *node_modules*) exit 1 ;;
    # Force refresh of website resources
    *.py|*.js|*.html|*.css) ./scripts/force-local-refresh.sh ;;
esac
