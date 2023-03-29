# Adding Data to the Database

#### Connecting to the database:

Step 1. Open Docker Desktop and leave it running in the background.
Step 2. In Shell, move directory to ~/legal_spellcheck# and execute the following commands: 
### cd docker
### sudo docker-compose build
### sudo docker-compose up -d webserver
Step 3. Open your browser and connect to http://localhost:8080/api/document/. (If everything is correct, you should see a webpage)

#### Creating and adding documents to the dtatabase:

Step 1. Convert the contents of your legal document into the format shown below, and save it as a .JSON file.

NOTE: 
* When naming the file - NO SYMBOLS ALLOWED, INCLUDING UNDERSCORES "_"
* Be aware that the lines in the "blocks" section are actual BLOCKS and not SENTENCES. Use commas to split the blocks.
---
{
	"documents": [
    	{
        	"title": "NON-DISCLOSURE AGREEMENT",
            "blocks": [
                "Parties",
                "This Non-Disclosure Agreement (hereinafter referred to as the “Agreement”) is entered into (the “Effective Date”), by and between Party A, with an address of (hereinafter referred to as the “Disclosing Party”) and  with an address of Party B (hereinafter referred to as the “Receiving Party”) (collectively referred to as the “Parties”).",
				"Confidential Information",
				"The Receiving Party agrees not to disclose, copy, clone, or modify any confidential information related to the Disclosing Party and agrees not to use any such information without obtaining consent.",
				"“Confidential information” refers to any data and/or information that is related to the Disclosing Party, in any form, including, but not limited to, oral or written. Such confidential information includes, but is not limited to, any information related to the business or industry of the Disclosing Party, such as discoveries, processes, techniques, programs, knowledge bases, customer lists, potential customers, business partners, affiliated partners, leads, know-how, or any other services related to the Disclosing Party.",
				"Return Of Confidential Information",
				"The Receiving Party agrees to return all the confidential information to the Disclosing Party upon the termination of this Agreement.",
				"Ownership",
				"This Agreement is not transferable and may only be transferred by written consent provided by both Parties.",
				"Governing Law",
				"This Agreement shall be governed by and construed in accordance with the laws of Institution A.",
				"Signature And Date",
				"The Parties hereby agree to the terms and conditions set forth in this Agreement and such is demonstrated by their signatures below:"
                ]
            }
        ]
	}
  ---

Step 2. Save the file to the following path: 
### ~/legal_spellcheck/client/src/data

Step 3. Open Shell, in the terminal execute the following command:
### curl -X POST -H 'Content-Type: application/json' --data "@client/src/data/FILENAME.json" localhost:8080/api/documents/ > debug.html

Step 4. Refresh the browser page you've opened prevously. You should see your file uploaded to the page.
