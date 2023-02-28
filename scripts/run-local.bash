#!/bin/bash
scripts/force-local-refresh.sh
tail -f /var/log/apache2/error.log &
scripts/mount-directory-watch.sh
