const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');  //set this up but don't really use it

const app = express();

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;          //If not available we run on port 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));