const express = require('express');
const ImageRouter = express.Router();
const ImageModel = require('../models/image.model');

ImageRouter.post('/', (request, response) => {
    const {
        imageUrl,
        owner,
        description,
        title
    } = request.body
    ImageModel.create({
        imageUrl,
        owner,
        description,
        title
    }).then(imageCreated => {
        response.status(201).json({
            success: 1,
            image: imageCreated
        });
    }).catch(error => {
        response.status(500).json({
            success: 0,
            error
        })
    });
});

ImageRouter.get('/', (request, response) => {
    ImageModel.find({})
        .populate('owner', 'username name')
        .exec()
        .then(images => {
            response.status(200).json({
                success: 1,
                images
            })
        })
        .catch(error => {
            response.json({
                success: 0,
                error
            })
        });
})
module.exports = ImageRouter;