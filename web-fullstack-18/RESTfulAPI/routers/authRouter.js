const express = require('express');
const AuthRouter = express.Router();
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt-nodejs');

AuthRouter.post('/login', async (request, response) => {
    const {
        username,
        password
    } = request.body;

    try {
        const userFound = await UserModel.findOne({
            username
        });
        if (!userFound || !userFound._id) {
            response.status(404).json({
                success: 0,
                error: "No such user"
            })
        } else {
            if (bcrypt.compareSync(password, userFound.password)) {
                // console.log("id: " + userFound._id);
                request.session.userInfo = {
                    id: userFound._id,
                    name: userFound.name,
                    username: userFound.username,
                    role: 1
                };
                request.session.save();
                console.log(request.session.userInfo);
                response.json({
                    success: 1,
                    message: "Login success!"
                })
            } else {
                response.status(401).json({
                    success: 0,
                    error: "Wrong password"
                })
            }
        }
    } catch (error) {
        response.status(500).json({
            success: 0,
            error
        });
    }


});

AuthRouter.delete('/logout', (request, response) => {
    request.session.destroy();
    request.session.userInfo = undefined;
    response.json({
        success: 1,
        message: "Logout success"
    });

})


module.exports = AuthRouter;