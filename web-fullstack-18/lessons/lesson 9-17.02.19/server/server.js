/*
 *   Connect moongoDB
 *    Use middlewares + routers
 *   Start server port
 */

const express = require('express');
const moongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRouter = require('./api/index');
const authRouter = require('./api/auth/routes');
const expressSession = require('express-session');

const bootstrap = async () => {
    try {
        //init app
        const app = express();
        //connect mongoDB
        await moongoose.connect('mongodb://localhost:27017/techkids-hotgirl');

        //middle wares
        app.use(bodyParser({
            extended: false
        }));
        app.use(bodyParser.json());
        app.use(expressSession({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false }
          }))

        app.use('/api', apiRouter);
        app.use('/api/auth', authRouter); 

        //start server
        await app.listen(process.env.PORT || 3000);
        console.log(`Server is listening on PORT ${process.env.PORT||3000} ...`);
        // set PORT=8080 && npm start



    } catch (error) {
        console.log(error);

    }
}

bootstrap(); 