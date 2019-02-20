const express = require('express');

const postRouter = express.Router();

//CRUD

postRouter.get('/:postId', async(request, response)=> {
    try {
        const postId = request.params.userId; 
        const post = await userModel.findById(postId).exec();
        response.status(200).json({
            success: 1, 
            post
        });
    } catch (error) {
        console.log(error);
        response.status(error.status || 500).json({
            success: 0,
            error
        })
    }
})

postRouter.post('/', async (request, response) => {
    try {
        const post = request.body; 
        const newPost = new userModel(post);
        await newPost.save();

        //create success
        response.status(201).json({
            success: 1, 
            postId: newPost._id,
            message:"create user success"
        });

    } catch (error) {
        console.log(error);
        response.status(error.status || 500).json({
            success: 0,
            error
        })
    }
})




module.exports = postRouter;