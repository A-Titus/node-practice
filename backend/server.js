const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Configuring the database
const dbConfig = require('../config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

require('./app/routes/note.routes.js')(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})