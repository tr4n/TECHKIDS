const express = require('express');
const mongoose = require('mongoose');
const apiRouter = require('./routers/apiRouter');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const session = require('express-session');

mongoose.connect('mongodb://localhost/techkids-hotgirl', (error) => {
    console.log(error || "Connect DB success!");
});

let app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true, 
    cookie: {
        httpOnly: false, 
        maxAge: 7 *24*60*60*1000
    }
}))

app.get('/', (request, response) => {

    console.log(request.session);
    console.log(request.sessionID);
    response.send("Techkids hotgirl api.");
})

app.use('/api', apiRouter);







app.listen(3000, (error) => {
    console.log(error || "App started! port 3000");
});