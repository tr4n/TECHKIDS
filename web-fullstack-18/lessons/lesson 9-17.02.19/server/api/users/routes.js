const express = require('express');
const userModel = require('./model');

const userRouter = express.Router();

//CRUD

userRouter.get('/:userId', async(request, response)=> {
    try {
        const userId = request.params.userId; 
        const userInfo = await userModel.findById(userId).exec();
        response.status(200).json({
            success: true, 
            user: userInfo
        });
    } catch (error) {
        console.log(error);
        response.status(error.status || 500).json({
            success: false,
            error
        })
    }
})

userRouter.post('/', async (request, response) => {
    try {
        const userInfo = request.body; 
        const newUser = new userModel(userInfo);
        await newUser.save();

        //create success
        response.status(201).json({
            success: true, 
            userId: newUser._id,
            message:"create user success"
        });

    } catch (error) {
        console.log(error);
        response.status(error.status || 500).json({
            success: false,
            error
        })
    }
}); 




module.exports = userRouter;