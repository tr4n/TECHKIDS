const express = require('express');
const UserRouter = express.Router();
const UserModel = require('../models/user.model');

//CRUD create - read - update - delete

UserRouter.post('/', (request, response) => {
    const {
        username,
        password,
        name,
        avatar,
        gender
    } = request.body
    UserModel.create({
        username,
        password,
        name,
        avatar,
        gender
    }).then(userCreated => {
        response.status(201).json({
            success: 1,
            user: userCreated
        });
    }).catch(error => {
        response.status(500).json({
            success: 0,
            error
        })
    });
});

UserRouter.get('/', (request, response) => {
    UserModel.find({}, {password: 0}).then(users => {
        response.status(200).json({
            success: 1,
            users
        })
    }).catch(error => {
        response.json({
            success: 0,
            error
        })
    });

})



module.exports = UserRouter;