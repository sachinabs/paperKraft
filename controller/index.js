const dynamodbRepo = require('../dynamoDB');
const { v4: uuidv4 } = require('uuid');


const userSignIn = async (req,res) => {
    const user = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        id: uuidv4(43),
    }
    try {
       const response = await dynamodbRepo.createNewUser(user);
       res.send(response);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

const createNewPost = (req, res) => {

    try {
        dynamodbRepo.createNewPostInDynamoDB(req);
        res.send("success");
    }
    catch (error) {
        res.status(500).send(error);
    }
    
}

const readPostById = (req, res) => {
    try {
        dynamodbRepo.readPostById(req, res);
    }
    catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {
    createNewPost,
    readPostById,
    userSignIn
}