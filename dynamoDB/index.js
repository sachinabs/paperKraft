const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});


const createNewPostInDynamoDB = async (req, res) => {
    
    const userPost={
        email: req.body.email,
        id: req.body.id,
        title: req.body.title,
        content: req.body.content,
    }
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const params = {
            TableName: "paper-kraft",
            Item: userPost,
            ReturnValues: "ALL_OLD"
        };
        await dynamodb.put(params).promise();

    } catch (error) {
        console.log(error);
        throw error;
    }


}

module.exports = {
    createNewPostInDynamoDB
}