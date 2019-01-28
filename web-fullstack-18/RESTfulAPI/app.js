const express = require('express');
const mongoose = require('mongoose');
const apiRouter = require('./routers/apiRouter');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/techkids-hotgirl', (error)=> {
    console.log(error|| "Connect DB success!");
}); 

let app = express(); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.send("Techkids hotgirl api.");
})

app.use('/api', apiRouter);







app.listen(3000, (error) => {
    console.log(error || "App started! port 3000");
});