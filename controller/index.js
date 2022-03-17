const dynamodbRepo = require('../dynamoDB');
const { v4: uuidv4 } = require('uuid');
const { response } = require('express');

const userSignup = async(req, res) => {
    const user = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        id: uuidv4(32)
    }

    try {
        const response = await dynamodbRepo.signupDetail(user);
        res.send(response);
    } catch (error) {
        res.status(500).send(error);
    }

}
const userLogin = async(req, res) => {
    try {
        const response = await dynamodbRepo.userLoginDetail(req);

        if (response.Item.password == req.body.password) {
            res.send({
                message: "Authorized User",
                useruuid: response.Item.id
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "Unauthorized",
            useruuid: null
        })
    }
}
const createNewPost = async(req, res) => {
    const dateNow = new Date();
    const newPost = {
        title: req.body.title,
        post: req.body.post,
        postuuid: uuidv4(24),
        useruuid: req.body.useruuid, // get uuid from header
        date: dateNow.getDate() + "-" + dateNow.getMonth() + "-" + dateNow.getFullYear(),
        time: dateNow.getTime()
    }
    console.log(newPost);
    try {
        const response = await dynamodbRepo.createPost(newPost);
        res.send(response);
    } catch (error) {
        res.status(500).send(error);
    }

}

const commonRouter=(req,res)=>{
    res.send("hello");
    console.log("From common router");
}


module.exports = {
    userSignup,
    userLogin,
    createNewPost,
    commonRouter
}