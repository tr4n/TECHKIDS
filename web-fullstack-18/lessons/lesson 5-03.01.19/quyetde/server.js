const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
let Random = {
    nextInt(value) {
        return Math.floor(math.random() * value);
    },
    getInt(first, second) {
        return first >= second ? second : first + Math.floor(Math.random() * (second - first))
    }
}
let getQuestions = function () {
    let questions = [];
    if (!fs.existsSync(__dirname + "/views/database.json")) {
        fs.writeFileSync("views/database.json", JSON.stringify([]));
    }

    try {
        questions = JSON.parse(fs.readFileSync("views/database.json"));
    } catch (error) {
        console.log(error);
    }

    return questions;
}

app.use(bodyParser.urlencoded({
    extended: false
}));

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/views/answer.html");
    let questions = getQuestions(),
        question;

    if (questions.lenth == 0) {
        response.send("Question list is empty");
    } else {
        const index = Math.floor(Math.random() * questions.length);
        const randomQuestion = questions[index];
        console.log(randomQuestion + "------------\n");
        response.send(`
        <h1>  ${randomQuestion.content}  <h1>
        <a href="/vote/no/${randomQuestion.id}"><button> False </button></a>
        <a href="/vote/yes/${randomQuestion.id}"><button> True </button></a>
        `);
    }

});

app.get("/vote/yes/:questionId", (request, response) => {
    
    const questions = getQuestions(),
        { questionId } = (request.params),
        question = questions.filter(item => item.id == questionId)[0];

    console.log("Questions: --------------", questions);
    questions.forEach((item, index) => {
        if (item.id == questionId) {
            questions[index].yes +=1;
            console.log("item: ", item);
        }
    });
    fs.writeFileSync("views/database.json", JSON.stringify(questions));
    response.redirect("/");

});

app.get("/ask", (request, response) => {
    response.sendFile(__dirname + "/views/ask.html");
});

app.post("/add-question", (request, response) => {

    const questionContent = request.body.questionContent;
    let questions = getQuestions();
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