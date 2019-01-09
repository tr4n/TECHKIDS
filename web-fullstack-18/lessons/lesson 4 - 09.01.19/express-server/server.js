const express = require("express");
const app = express();
//Router - receive request

app.get("/", (rerequest, response) => {
    
    console.log(request);
    response.send("Hello world");
});

app.get("/about", (request, response) => {
   // response.send("<h1>djjdjdjd<h1>");
    response.sendFile(__dirname + "/test.txt");
})
app.listen("1432", (error) => {
    console.log(error || "Server start success !!!");
});