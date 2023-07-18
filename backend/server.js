// bring in express and dotenv for env variables
const express = require('express');
const dotenv = require('dotenv').config();
// server will run on .env variable port or default port of 3000
const port = process.env.PORT || 8000;

// initialize express and start the server
const app = express();

app.listen(port, () => console.log(`Server started on port ${port}`));
