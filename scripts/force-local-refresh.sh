#!/bin/bash
. scripts/install.sh
# Copy updated static files
python3 manage.py collectstatic --no-input & collect_pid=$!
# Recompile javascript bundle
cd client; webpack --stats errors-warnings --mode development & webpack_pid=$!
# Restart httpd
(1>/dev/null pgrep httpd && httpd -k restart || httpd -k start) & httpd_pid=$!

wait $collect_pid $webpack_pid $httpd_pid
