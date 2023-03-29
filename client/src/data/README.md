# Adding Data to the Database

## Connecting to the database:

1. Open Docker Desktop and leave it running in the background.
2. In Shell, move directory to ~/legal_spellcheck# and execute the following commands (you can find them in test.sh):
    #### cd docker
    #### sudo docker-compose build
    #### sudo docker-compose up -d webserver
    
3. Open your browser and connect to http://localhost:8080/api/document/. (If everything is correct, you should see a webpage)

## Creating and adding documents to the database:

1. Convert the contents of your legal document into the format shown below, and save it as a .json file.

NOTE: 
* When naming the file - NO SYMBOLS ALLOWED, INCLUDING UNDERSCORES "_"
* Be aware that the lines in the "blocks" section are actual BLOCKS and not SENTENCES. Use commas to split the blocks.

![image](https://user-images.githubusercontent.com/124046037/228631824-eb5428aa-9a5c-4663-aa8d-cf615753eec5.png)

2. Save the file to the following path: 
    #### ~/legal_spellcheck/client/src/data

3. In Shell, you should see that your directory has changed to ~/docker. Execute the following command:
    #### curl -X POST -H 'Content-Type: application/json' --data "@client/src/data/FILENAME.json" localhost:8080/api/documents/ > debug.html

4. Refresh the browser page you've opened previously. You should see your file uploaded to the page.

For more information regarding docker setup and running servers, please refer to the documentation provided in ~/docker/README.md
