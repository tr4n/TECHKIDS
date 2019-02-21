const express = require('express');
const postModel = require('./model');
const postRouter = express.Router();

//CRUD

postRouter.get('/:postId', async (request, response) => {
    try {
        const postId = request.params.postId;
        const post = await postModel.findById(postId).exec();
        response.status(200).json({
            success: true,
            post
        });
    } catch (error) {
        console.log(error);
        response.status(error.status || 500).json({
            success: false,
            error
        })
    }
});
//http://localhost:3000/api/posts?after=abcxyz&pageSize=10
postRouter.get('/', async (request, response) => {
    try {
        const {
            after
        } = request.query;
        pageSize = Number(request.query.pageSize);
        const filter = {};
        if (after) {
            filter._id = {
                $lt: after
            }
        }
        const data = await postModel.find(filter)
            .sort({
                _id: -1
            }) //decrease
            .limit(pageSize + 1)
            .populate('author', '_id username fullName createdAt')
            .exec();

        // console.log(data);

        response.status(200).json({
            success: true,
            data: data.length > pageSize ? data.slice(0, pageSize) : data,
            after: data.length > pageSize ? data[pageSize - 1]._id : undefined
        })

    } catch (error) {
        console.log(error);
        response.status(error.status || 500).json({
            success: false,
            error
        })
    }
});

postRouter.post('/', async (request, response) => {

    try {
        //  console.log(request.session);
        if (request.session.authUser) {
            const postInfo = request.body;
            const newPost = new postModel(postInfo);
            await newPost.save();

            //create success
            response.status(201).json({
                success: true,
                postId: newPost._id,
                message: `create post success, postId = ${newPost._id}`
            });
        }else{
            response.status(403).json({
                success: false,            
                message: `You must login`
            });
        }


    } catch (error) {
        console.log(error);
        response.status(error.status || 500).json({
            success: false,
            error
        })
    }
})




module.exports = postRouter;