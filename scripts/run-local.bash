#!/bin/bash
./scripts/force-local-refresh.sh
tail -f /var/log/apache2/error.log &
find client server api \
     -regex '.*\.\(py\|js\|html\|svg\|css\)$' \
     -exec echo {}:c \; \
    | xargs inotifyd /var/www/apache/scripts/on-change.sh
