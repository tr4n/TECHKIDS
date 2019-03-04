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
const cors = require('cors');
const admin = require ('firebase-admin');


const bootstrap = async () => {
    try {
        //init app
        const app = express();
        //connect mongoDB
        await moongoose.connect('mongodb://localhost:27017/techkids-hotgirl');

        const serviceAccount = require('./techkids-hotgirl-firebase-adminsdk-dhsr2-44bf56fffb.json');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://techkids-hotgirl.firebaseio.com"
        });
        //middle wares
        app.use(cors({
            origin: ['http://localhost:3000', 'http://localhost:3001'],
            credentials: true
        }))
        app.use(bodyParser({
            extended: false
        }));
        app.use(bodyParser.json());
        app.use(expressSession({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: false
            }
        }))

        app.use('/api', apiRouter);
        app.use('/api/auth', authRouter);

        //start server
        await app.listen(process.env.PORT || 3001);
        console.log(`Server is listening on PORT ${process.env.PORT||3001} ...`);
        // set PORT=8080 && npm start



    } catch (error) {
        console.log(error);

    }
}

bootstrap();