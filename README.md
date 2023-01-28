# Legal Spellcheck MVP

This application is a legal spellcheck system built for Propylon as a part of a college module. This module entails a group of 3rd and 2nd year students working together to create an application for their client. This entails weekly meetings with the client as well as implementing industry best practice software design principals and standards. To that end we also have weekly standups, agile processes, project backlogs, user stories, test driven development, ect. This read me contains the overview for the application we were tasked with developing.

## Application Functionality

The below section contains the overview of the application, it's features and requirements.

The goal for this application is to allow users to create, upload, modify and edit legal documents while providing inbuilt spellcheck functionality and metrics. This entails the spellcheck function being applied whenever a user saves a section they are working on or whenever they run an evaluation of the document in order to see the document metrics.

In order to fulfil this goal the project will have to complete the following set of functionality:

* Allow users to upload documents.
* Allow users to create documents.
* Store multiple user(s) documents.
* Let users create/add pages, sections & chapters to a document.
* Allow users delete pages, sections & chapters to a document.
* Allow users to edit & save sections of a document.
* Let users download their documents (docx format).
* Allow users to run spellcheck on an entire document.
* Display spellcheck metrics to users.
* Automatically run spellcheck on a section when a user saves it.

## Technical Requirements

In order to complete the above functionality and requirements the following technical design must be programed.

* Create a client side frontend web application.
* Build a REST application on the back end to access functionality and data from the frontend.
* Create a relational DB to store user documents as well as legal references for spellcheck.
* Use AWS/AZURE for ML and spellcheck functionality.
* Host application on AWS/AZURE.

![Simple System Design](https://user-images.githubusercontent.com/78432096/215277879-ee8b72ed-71c2-4303-ab3b-032b3fc9234c.jpeg)

## Design Choices

This section details some key design decisions we made at the start of our project for the technologies we would use and application design we would take.

For languages and frameworks we decided to go with React and JS on the front end. We made this choice as two of the third years have experience with react as well as one second year. On the backend we chose to develop in Python usign a flask framework. This is because of client as well as the third years have knowledge of python and its large amount of helpful libraries and easy integration with AWS hosting and functionality.

TODO(3rdyrs): Add in more design choices.

## The A Team

#### Team Leads:

Max Cunnignham - 3rd Year 

Niall Sauvage - 3rd Year

Cianna MacMahon - 3rd Year

---
#### Frontend:

Petra Marcokova - 2nd Year

Massimiliano Romagnoli - 2nd Year

---
#### Backend:

Dylan Thompson - 2nd Year

Essien Thompson - 2nd Year

Ignatii Tsitsenko - 2nd Year

Chinaza Uzoukwu - 2nd Year

Qiming Nie - 2nd Year

