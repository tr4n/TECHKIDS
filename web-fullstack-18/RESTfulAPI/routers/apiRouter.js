const express = require('express');
const ApiRouter = express.Router();

const ImageRouter = require('./imageRouter');
const UserRouter = require('./userRouter');

ApiRouter.use('/images', ImageRouter); 
ApiRouter.use('/users', UserRouter);

module.exports = ApiRouter;