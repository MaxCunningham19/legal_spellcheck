LSC_HOST=localhost
LSC_PORT=8080
LSC_URL=$LSC_HOST${LSC_PORT/#/:}

for static_file in $(find client/static static -type f -printf 'static/%P\n')
do
    echo -n Checking $static_file ...' '
    if curl --output /dev/null --silent --fail $LSC_URL/$static_file
    then
        echo success 👼
    else
        echo failure 😡
        failure=1
    fi
done

exit $failure
