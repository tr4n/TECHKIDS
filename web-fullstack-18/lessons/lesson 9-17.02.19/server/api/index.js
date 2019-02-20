const express = require('express');
const userRouter = require('./users/routes');
const postRouter = require('./posts/routes');
const apiRouter = express.Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/posts', postRouter);

module.exports = apiRouter;