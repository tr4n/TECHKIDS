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
    if (!fs.existsSync(__dirname + "/database.json")) {
        fs.writeFileSync("/database.json", JSON.stringify([]));
    }

    try {
        questions = JSON.parse(fs.readFileSync("database.json"));
    } catch (error) {
        console.log(error);
    }

    return questions;
}


// routers for page
app.get("/", (request, response) => {
    response.sendFile(__dirname + "/public/html/index.html");

});

app.get("/ask", (request, response) => {
    response.sendFile(__dirname + "/public/html/ask.html");
});

app.get("/answer/:questionId", (request, response) => {
    response.sendFile(__dirname + "/public/html/answer.html");
});




// routers for json data

/*
 * get -> lay data
 * post -> tao moi
 * put -> update data
 * delete -> delete
 */

app.post('api/questions', (request, response) => {
    try {
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
        fs.writeFileSync("database.json", JSON.stringify(questions));
        response.json({
            success: true
        });
    } catch (error) {
        response.json({
            success: false,
            message: error.message
        });
    }

});

app.get('/api/questions/getRandomQuestion', (request, response) => {
    try {
        const questions = getQuestions(),
            questionId = Random.nextInt(questions.length),
            randomQuestion = questions[questionId];
        response.json(randomQuestion);

    } catch (error) {
        response.json({
            success: false,
            message: error.message
        });
    };

});

app.get('/api/questions/getQuestionById/:questionId', (request, response) => {
    try {
        const questions = getQuestions(),
            questionId = (request.params.questionId),
            selectedQuestion = questions.filter((item) => (item.id == questionId))[0];

        if (selectedQuestion) {
            response.json(selectedQuestion);
        } else {
            response.json({
                success: false,
                message: 'question not found'
            })
        }

    } catch (error) {
        response.json({
            success: false,
            message: error.message
        });
    }
});

app.put('/api/questions', (request, response) => {
    try {
        const questionId = request.body.questionId,
            vote = request.body.vote;
        const questions = getQuestions();
        questions.every((item) => {
            if (item.id.toString() == questionId.toString()) {
                vote === 'yes' ? item.yes++ : item.no++;
                return false;
            }
            return true;
        });

        fs.writeFileSync('database.json', JSON.stringify(questions));
        response.json({
            success: true
        });

    } catch (error) {
        response.json({
            success: false,
            message: error.message
        });
    }
});


// see result vote


app.use('/', express.static('public'));
app.listen("1234", (error) => {
    console.log(error || "server start success!! port: 1234");
});