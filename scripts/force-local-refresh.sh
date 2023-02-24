#!/bin/bash
. scripts/install.sh
# Copy updated static files
python3 manage.py collectstatic --no-input
# Recompile javascript bundle
cd client; webpack --stats summary --mode development
# Restart httpd
1>/dev/null pgrep httpd && httpd -k restart || httpd -k start
