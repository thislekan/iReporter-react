[![CircleCI](https://circleci.com/gh/thislekan/iReporter-react.svg?style=svg)](https://circleci.com/gh/thislekan/iReporter-react) [![Test Coverage](https://api.codeclimate.com/v1/badges/4ee44b5be089e464ba9a/test_coverage)](https://codeclimate.com/github/thislekan/iReporter-react/test_coverage)

# iReporter-react
iReporter is a platform created to help members of the society improve the fight against corruption. You can visit the platform [here](https://ireport-react.herokuapp.com/)

## Vision
The vision of this project is to create an online community of citizens who are interested in lending a hand in the fight against corruption. The platform is a channel to report incidents worthy of attention to the right authorities.


## Set up
>The following information explains how to set up this project locally.

If you don't have ```node.js``` installed, please follow this link to [download node.js](https://nodejs.org/en/)

Download the repo by clicking the green ```clone or download``` button above. If you chose the download option, unzip your files into a folder. If you chose the clone option, then run ```git clone 'the-url-copied-by-clicking-the-green-button'```

Please note: This information assumes a basic understanding of node and git


> A few things to note before running the npm install command.

- Visit the [google maps](https://cloud.google.com/maps-platform/?__utma=102347093.83614144.1557219504.1557219514.1557219514.1&__utmb=102347093.0.10.1557219514&__utmc=102347093&__utmx=-&__utmz=102347093.1557219514.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)&__utmv=-&__utmk=200983598&_ga=2.100516311.-83614144.1557219504#get-started) to get an API key
- when picking products from the above link, select the maps and places products
- create a `.env` file
- add the following to the newly created `.env` file
- add the API key to the GOOGLE_API_KEY field

```
API_URL = https://ireporter-endpoint.herokuapp.com/api/v2/
GOOGLE_API_KEY = your google map API key

```

> Run the following commands in your terminal:

```
# Change directory to clone or zipped folder
cd iReporter-react (or the name of the folder you zipped the files in)

# you'll be in the develop branch by default

# Install package modules
npm install

# To run test
npm run test

# Start up the server
npm run start:dev

# To run build
npm run build

# To serve up built files
npm run start

```

```
## Available routes
The available routes are as follows:

### General

`/` - iReporter's homepage
`/signup` - for users to sign up
`/login` - for admin and users to login

### Users (for authentication)

`/user` - Users dashboard


### Admin

`/admin` - the admin dashboard page
```

---

### Available features

The following are the list of features available to users
```
# Create an incident
  - includes ability to upload images relating to an incident
  - accepts both coordinates and actual addresses for incident location
  - includes a comment section for a brief description of an incident
  - incidents can be of two types: 
    - Interventions
    - Red flags

# Edit an incident
  - permits the ability to edit a report's type, location and comment while it's still a draft

# Delete an incident
  - Only incidents with a status of `draft` can be deleted by a user

# Read/View an incident
  - Includes status, date of creation, location's map, comments and attached images
```

The following are features available to the admin
```
# Edit incident status
  - can edit a status from draft to a list of availbale status

> The following status are currently available to the admin
  - draft
  - under investigation
  - resolved
  - rejected

# Read/View an incident
  - Includes status, date of creation, location's map, comments and attached images

```
  