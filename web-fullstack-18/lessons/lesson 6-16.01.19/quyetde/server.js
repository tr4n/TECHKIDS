const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));



const Random = {
    nextInt(value) {
        return Math.floor(Math.random() * value);
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


// homepage: see questions
app.get("/", (request, response) => {
    response.sendFile(__dirname + "/views/answer.html");
    const questions = getQuestions();

    if (questions.lenth == 0) {
        response.send("Question list is empty");
    } else {
        const randomQuestion = questions[Random.nextInt(questions.length)];

        response.send(`
        <h1>  ${randomQuestion.content}  </h1>
        <a href="/vote/${randomQuestion.id}?yes=1&no=0"><button>True</button></a>
        <a href="/vote/${randomQuestion.id}?yes=0&no=1"><button>False</button></a>
        <a href="/result/${randomQuestion.id}"><button>Vote Result</button></a>        
        `);
    }

});

// see result vote
app.get("/result/:questionId", (request, response) => {
    const questions = getQuestions(),
        questionId = request.params.questionId,
        question = questions.filter(element => (element.id == questionId))[0],
        yesVote = question.yes,
        noVote = question.no,
        yesPercent = Number(Number((yesVote * 100) / (yesVote + noVote)).toFixed(2)),
        noPercent = 100 - yesPercent;
    response.send(`
    <h1>  ${question.content}  </h1>
    <div> ${yesVote + noVote} votes </div>
    <div> ${yesVote} votes at Yes (${yesPercent}%) </div>
    <div> ${noVote} votes at No (${noPercent}%) </div>
    <a href="/"><button>See others</button></a>
    `);


});

// vote 
app.get("/vote/:questionId", (request, response) => {

    const questions = getQuestions(),
        questionId = (request.params.questionId),
        answer = request.query;

    questions.every((item, index) => {
        if (item.id == questionId) {
            questions[index].yes += parseInt(answer.yes);
            questions[index].no += parseInt(answer.no);
            return false;
        }
        return true;
    });
    fs.writeFileSync("views/database.json", JSON.stringify(questions));
    response.redirect(`/result/${questionId}`);

});

app.get("/ask", (request, response) => {
    response.sendFile(__dirname + "/views/ask.html");
});

// add-question
app.post("/add-question", (request, response) => {

    const questionContent = request.body.questionContent;
    if (questionContent.toString().length < 1) return;
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

//get total questions
app.get("/getTotalQuestions", (request, response) => {
    console.log("request received");
    const total = getQuestions().length;

    response.status(200).send({
        totalQuestions: total
    });
    
});


app.use('/', express.static('views'));
app.listen("1234", (error) => {
    console.log(error || "server start success!! port: 1234");
});