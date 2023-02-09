#!/bin/bash
httpd -k start
inotifyd /var/www/apache/scripts/on-change.sh server:c client:c
