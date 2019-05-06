[![CircleCI](https://circleci.com/gh/thislekan/iReporter-react.svg?style=svg)](https://circleci.com/gh/thislekan/iReporter-react) [![Test Coverage](https://api.codeclimate.com/v1/badges/4ee44b5be089e464ba9a/test_coverage)](https://codeclimate.com/github/thislekan/iReporter-react/test_coverage)

# iReporter-react
iReporter is a platform created to help members of the society improve the fight against corruption. You can visit the platform [here](https://ireport-react.herokuapp.com/)

## Set up
>The following information explains how to set up this project locally.

If you don't have ```node.js``` installed, please follow this link to [download node.js](https://nodejs.org/en/)

Download the repo by clicking the green ```clone or download``` button above. If you chose the download option, unzip your files into a folder. If you chose the clone option, then run ```git clone 'the-url-copied-by-clicking-the-green-button'```

Please note: This information assumes a basic understanding of node and git


> A few things to note before running the npm install command.

You need to provide values for the enviroment variables in a ```.env``` file


> Run the following commands in your terminal:

```
# Change directory to clone or zipped folder
cd iReporter-react (or the name of the folder you zipped the files in)

# by default, you'll be in the develop branch


# see the 'few things to note' section from above and provide data for the GOOGLE_API_KEY field

```
API_URL = https://ireporter-endpoint.herokuapp.com/api/v2/
GOOGLE_API_KEY = get a Google map API key

```

# Install package modules
npm install

# To run test
npm run test

# Start up the server
npm run start:dev

```


## Available routes
The available routes are as follows:

### General

`/` - iReporter's homepage

### Users (for authentication)


`/signup` - for users to sign up
`/login` - for users to login
`/user` - Users dashboard


### Admin

`/login` - log in the admin
`/admin` - the admin dashboard page
