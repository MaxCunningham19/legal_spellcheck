#!/bin/bash

# Ensure the lock exists
touch ${lock=/var/log/mount-watch.lock}
# Declare lock file descriptor for use with flock
exec 4<>$lock

# If a there is mount watch is running, send a kill signal, since
# there may be new directories to watch.
[ -s $lock ] && [ -e /proc/${parent_pid=`cat<$lock`} ] \
    && kill -9 $parent_pid $(pgrep -P $parent_pid)

# Acquire the lock or die
flock -n 4 && >&4 echo $$ || exit 1

# Mount new file watches as new files may have been added
scripts/mount-file-watch.sh

# Spawn a new watch including all directories.
find client server api -type d \! -name '*node_modules*' \
    | sed 's/$/:ny/' \
    | xargs inotifyd $(realpath scripts/mount-watch.sh)
