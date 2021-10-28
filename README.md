# Uhart Web Dev Bootcamp Industry Project - Privy Customer Messaging Tool

This projects aims to help small ecommerce stores by implementing a tool to help increase their sales. This will be achieved by implementing a CRM dashboard, allowing merchants to send personalized SMS to thier customers. This project will be composed of multiple pieces, databases, back end, front end, and API requests. 

## Demo

### Live Demo

**Please allow app 30 seconds to load from cold start**
**Live demo:** [here](https://privy-kevinsalina.herokuapp.com/) 

To use live demo, please download a sample customer CSV file <a href="/resources/static/assets/mocks/CSV-customers - Sheet1.csv" download>here</a>.

* Once the app loads, you can upload the CSV data, and the customers will appear in the data grid.
* You can search and filter through customers, making seletions by clicking the box on the the left side of each row.
* After a group of customers is selected, click 'Send Message' button to be brought to the message page. Click the 'Delete' button to delete the selection from the database.
* Once a message is sent, you will be redirect to the message log page, that shows a history of the messages sent.

**Please Note** - the Twilio API is linked to a trial account that can only send SMS messages to verified phone numbers. To link you own Twilio account, please follow steps below to download app.

### Download App

##### Requirements
* MySQL
* Node
* Twilio Account (trial or paid)

##### Steps
* Fork & Clone main repo to local machine.
* **Install Dependencies**
    * **Server Side**
        * Run `npm install` in root directory
    * **Client Side**
        * From root directory `cd client` and then run `npm install`
* **Setup MySQL Database**
```
CREATE DATABASE [database];
CREATE USER '[username]'@'localhost' IDENTIFIED BY '[password]';
GRANT ALL ON [database].* TO '[username]'@'localhost';
```
* Set database enviromental variables:
    * Create a .env file in main directory. Use .env-sample file as guide.
    ```
    DB_USERNAME='[DB_USERNAME]'
    DB_PASSWORD='[DB_PASSWORD]'
    DB_DATABASE='[DB_DATABASE]'
    DB_HOST='[DB_HOST]'
    DB_DIALECT=[DB_DIALECT] 
    ```
* Run Sequelize migration to create tables in MySQL.
    * From root directory run `npm run dev:migrate`

* **Set up Twilio Account**
    * Head to [Twilio's Website](https://www.twilio.com/try-twilio) to sign up for a trial account.
    * Once account is made, follow [this](https://www.twilio.com/blog/send-bulk-sms-twilio-node-js-html) guide on how to set up new Twilio Messaging Service (scroll down to multi pack section of guide).
    * Set up Twilio enviromental variables in .env file. Tokens can be found in your Twilio Console.
        ```
        TWILIO_ACCOUNT_SID=[TWILIO_ACCOUNT_SID]
        TWILIO_AUTH_TOKEN=[TWILIO_AUTH_TOKEN]
        TWILIO_MESSAGING_SERVICE_SID=[TWILIO_MESSAGING_SERVICE_SID]
        ``` 
* **Set up AWS S3 Bucket**
    * Head to [AWS](https://aws.amazon.com/) to sign in or create account
    * Generate new AWS Access and Secret Key
        * Click Username in top right > My Security Credentials > Access keys (access key ID and secret access key) > Create New Access Key
    * Add AWS Keys & Bucket name to .env file
        ```
        AWS_ACCESS_KEY_ID=[AWS_ACCESS_KEY_ID]
        AWS_SECRET_KEY=[AWS_SECRET_KEY]
        AWS_BUCKET='[AWS_BUCKET]'
        ```
    * From root directory run `node utilites/create-bucket.js`. This will create a S3 bucket to store CSV files. You can change region in create-bucket.js file if needed.

* **Start App**
    * Run `npm run dev` in root directory to start up server and client side!
    * Download example CSV file from above for formatting reference.
    * CSV files must be formated as below to work:
        ```
        Email,First Name,Last Name,Phone number,City,State,Last Order Price,Last Order Date
        ```
    * If using Twilio trial account - phone numbers must be verified in Twilio Console in order to send messages. Read more [here](https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account).

    
## Built with

### Technologies/Tools

* Node
* Express
* React
* React Router
* MySQL
* Sequelize
* Sequelize CLI
* Twilio API
* Material UI
* Heroku
* AWS S3

### Third party code
* Multer
* MulterS3
* csvtojson
* AWS SDK
* Dotenv
* Concurrently

## Outcome

* Implemented a dashboard that is able to upload and parse a CSV file, and visualize the customers.
* Created a database to store the customers’ list.
* Implemented back end service to handle the data from the front end and save it into the database.
* Filter customers based on different parameters, ex: name or the price of their last purchase.
* Integration with an Twilio to be able to send personalized SMS.

## Summary

### What I learned

* Process of building a full stack web application from start to finish.
* Working with SERN stack (SQL, Express.js, React.js, Node.js).
* React / React State (Hooks, useState, useEffect).
* Seperation of concerns.
* Working with front end React library (Material UI).
* Storing files in AWS S3 Bucket.
* Parsing CSV data to JSON using npm packages.
* Creating RESTful API routes.
* Working with third party API (Twilio)
* Deployment with Heroku and JawsDB.
* Single Responsibility Principle.
* Presistence - never give up!

### What could be improved / Future Updates
* User Authentication.
* Improved error handling and feedback.
* Implement Redux to manage gloabl state. 

## Author

👤 **KevinSalina**
* GitHub: [KevinSalina](https://github.com/KevinSalina)