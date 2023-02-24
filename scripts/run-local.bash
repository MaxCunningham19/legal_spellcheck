#!/bin/bash
./scripts/force-local-refresh.sh
tail -f /var/log/apache2/error.log &
inotifyd /var/www/apache/scripts/on-change.sh server:c client:c api:c
