const express = require('express');
const UserRouter = express.Router();
const bcrypt = require('bcrypt-nodejs');

const UserModel = require('../models/userModel');

//CRUD create - read - update - delete

UserRouter.get('/:id', (request, response) => {

    const userId = request.params.id;

    UserModel.findById(userId, (error, userFound) => {
        if (error) {
            response.status(500).json({
                success: 0,
                error
            })
        } else if (!userFound) {
            response.status(404).json({
                success: 0,
                user: "No such user!"
            })
        } else {

            response.json({
                success: 1,
                user: userFound
            });
        }
    });
});

UserRouter.use((request, response, next) => {
    const {
        userInfo
    } = request.session;
    if (userInfo && userInfo.role >= 1) {
        next();
    } else {
        response.status(401).json({
            success: 0,
            message: "Permission denied"
        })
    }
})

UserRouter.post('/', (request, response) => {
    const {
        username,
        password,
        name,
        avatar,
        gender
    } = request.body;


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

UserRouter.get('/', async (request, response) => {
    UserModel.find({}, {
        password: 0
    }).then(users => {
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

});




UserRouter.put('/:id', async (request, response) => {

    const userId = request.params.id || {};
    try {
        const userFound = await UserModel.findById(userId);
        if (!userFound) {
            return response.status(404).json({
                success: 0,
                user: "No such user!"
            })
        } else {
            ["name", "password", "avatar", "gender"].forEach(item => {
                userFound[item] = request.body[item] ? request.body[item] : (userFound[item] || "");
            })

            const userUpdated = await userFound.save();
            response.json({
                success: 1,
                user: userUpdated
            })
        }
    } catch (error) {
        console.log(error);
        response.status(500).json({
            success: 0,
            error
        })
    }

});





module.exports = UserRouter;