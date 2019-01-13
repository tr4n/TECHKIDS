const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/views/answer.html");
});

app.get("/ask", (request, response) => {
    response.sendFile(__dirname + "/views/ask.html");
});

app.post("/add-question", (request, response) => {

    const questionContent = request.body.questionContent;
    let questions = [];
    if (!fs.existsSync(__dirname + "/views/database.json")) {
        fs.writeFileSync("views/database.json", JSON.stringify([]));
    }

    try {
        questions = JSON.parse(fs.readFileSync("views/database.json"));
    } catch (error) {
        console.log(error);
    }

    let newQuestion = {
        id: questions.length,
        content: questionContent,
        yes: 0,
        no: 0
    };
    questions.push(newQuestion);
    fs.writeFileSync("views/database.json", JSON.stringify(questions));
    response.redirect("/");



});

app.listen("1234", (error) => {
    console.log(error || "server start success!! port: 1234");
});