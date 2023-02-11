#!/bin/bash
# Copy updated static files
echo yes | python3 manage.py collectstatic
# Recompile javascript bundle
cd client; webpack --mode development
# Restart httpd
1>/dev/null pgrep httpd && httpd -k restart || httpd -k start
