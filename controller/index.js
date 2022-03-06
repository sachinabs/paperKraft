const dynamodbRepo = require('../dynamoDB');

const createNewPost = (req, res) => {

    try {
        dynamodbRepo.createNewPostInDynamoDB(req);
        res.send("success");
    }
    catch (error) {
        res.status(500).send(error);
    }
    
}

module.exports = {
    createNewPost
}