# Mikah application(editor)

A editor of test React/Nodejs project used as questionnaire to collect user replies and provide the final result with pictures.
The project also has an admin section to make CRUD operations for any question/reply

## Getting Started

To deploy the application on a local machine, 
enter your server url data in .env

### Prerequisites

Make sure you have NodeJS and npm installed before starting the program.


### Installing

After you prepare your .env you can start installing dependencies on the server with the command below

    yarn install

After installing you can start server:
    
    yarn start

## Running the tests

Unit tests are run by the command below:
    
    yarn test
    
## Deployment

Deploy instruction:

1. Change your .env to your server project link and client-side project link 
2. create new Heroku project
    
        $ heroku login
        $ heroku create
        $ git init
        $ heroku git:remote -a ${name_of_your_project}
       
3. Deploy your application

        $ git add .
        $ git commit -am "make it better"
        $ git push heroku master