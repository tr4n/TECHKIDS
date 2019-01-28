const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require('mongoose');
const QuestionModel = require('./models/question');
const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/web18', (error) => {
    console.log(error || "Connect to mongodb success");
});



const Random = {
    nextInt(value) {
        return Math.floor(Math.random() * value);
    },
    getInt(first, second) {
        return first >= second ? second : first + Math.floor(Math.random() * (second - first))
    }
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

app.post('api/questions', async (request, response) => {
    try {
        const questionContent = request.body.questionContent;
        if (questionContent.toString().length < 1) return;

        const newQuestion = {
            content: questionContent,
            createdAt: new Date()
        };

        const result = await QuestionModel.create([newQuestion]);
        console.log(result);

        response.json({
            success: true,
            data: result[0]
        });
    } catch (error) {
        response.json({
            success: false,
            message: error.message
        });
    }

});

app.get('/api/questions/getRandomQuestion', async (request, response) => {
    try {
        const randomQuestion = await QuestionModel.aggregate([{
            $sample: {
                size: 1
            }
        }])[0];

        console.log(randomQuestion);
        response.json(randomQuestion);

    } catch (error) {
        response.json({
            success: false,
            message: error.message
        });
    };

});

app.get('/api/questions/getQuestionById/:questionId', async (request, response) => {
    try {
        const
            questionId = (request.params.questionId),
            selectedQuestion = await QuestionModel.findById(questionId).exec();


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

app.put('/api/questions', async (request, response) => {
    try {
        const questionId = request.body.questionId,
            vote = request.body.vote;

        await QuestionModel.findByIdAndUpdate(questionId, {
            $inc: {
                [vote]: 1
            }

        }).exec();


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