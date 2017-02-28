const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const users = require('./routes/users');
const config = require('./config/database');

//Connect to Database
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to '+config.database);
})

//On Error
mongoose.connection.on('error', (err) => {
    console.log('Error '+err);
})

const app = express();

//Port Number
const port = 3000;

//Cors Middleware
app.use(cors());

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Express Static Folder
app.use(express.static(path.join(__dirname, '/public')));

//Users Middleware
app.use('/users', users);

//Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
})

//Start Server
app.listen(port, () => {
    console.log('server started on port '+port);
})