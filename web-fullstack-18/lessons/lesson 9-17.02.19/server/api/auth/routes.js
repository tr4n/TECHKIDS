const express = require('express');
const bcryptjs = require('bcryptjs');
const userModel = require('../users/model');
const authRouter = express.Router();

authRouter.post('/register', async (request, response) => {
    try {
        const userInfo = request.body;
        //hashPassword
        const hashPassword = bcryptjs.hashSync(userInfo.password, 10);

        //save to database
        const newUser = new userModel({
            ...userInfo,
            password: hashPassword
        });
        await newUser.save();
        response.status(201).json({
            success: true,
            message: "You have registered successfully",
            user: newUser
        })

    } catch (error) {
        console.log(error);
        response.status(error.status || 500).json({
            success: false,
            error
        })
    }
});

authRouter.post('/login', async (request, response) => {
    try {
        const {
            username,
            password
        } = request.body;
        const existUser = await userModel.findOne({
            username
        }).exec();

        if (existUser) {
            if (bcryptjs.compareSync(password, existUser.password)) {
                //save user to session storage 

                request.session.authUser = {
                    id: existUser._id,
                    username: existUser.username, 
                    fullName: existUser.fullName
                };
                request.session.save();
                
                response.status(200).json({
                    success: true,
                    message: "You have registered successfully"
                })
            } else {
                response.status(200).json({
                    success: false,
                    message: "Incorrect password"
                })
            }

        } else {
            response.status(404).json({
                success: false,
                message: "Username not found"
            })
        }

    } catch (error) {
        console.log(error);
        response.status(error.status || 500).json({
            success: 0,
            error
        })
    }
})


module.exports = authRouter;