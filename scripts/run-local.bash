#!/bin/bash
./scripts/force-local-refresh.sh
inotifyd /var/www/apache/scripts/on-change.sh server:c client:c
