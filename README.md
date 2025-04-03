Backend to a QR Movie Generator 


Installation

- clone the repository


`git clone git@github.com:olawuwo-abideen/qrcodemoviegenerator.git`


- navigate to the folder


`cd qrcodemoviegenerator-main.git`

To run the app in development mode

Open a terminal and enter the following command to install all the  modules needed to run the app:

`npm install` or 


Create a `.env` file with

DATABASE_URL="postgres://postgres:password@localhost:5432/movieqr"

BASE_URL= http://localhost:3000


Enter the following `npm start` command to Command Line Interface to Start the app

This will start the app and set it up to listen for incoming connections on port 3000. 

Use Postman to test the endpoint

API Endpoints

The following API endpoints are available:



**Movies Endpoints**

- **POST /movies/**: Create a movie.
- **GET /movies/id**: Get a list of movies.

**QRcode Endpoint**

- **GET /qrcode**: Generate a QR Code.
- **GET /qrcode/id**: Get Movies in QR Code.

