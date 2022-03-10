const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});


const createNewUser = async (user) => {

    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const params = {
            TableName: "user_personal_details",
            Key: {
                email: user.email
            }
        };
        const data = await dynamodb.get(params).promise();
        if (data.Item) {
           return { 
                message: "User already exists"
           }
        }
        else {
            const params = {
                TableName: "user_personal_details",
                Item: {
                    email: user.email,
                    name: user.name,
                    password: user.password,
                    id: user.id
                }
            };
            await dynamodb.put(params).promise();
            return {
                message: "User created successfully"
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const createNewPostInDynamoDB = async (req, res) => {

    const userPost = {
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

const readPostById = async (req, res) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const params = {
            TableName: "user_personal_details",
            Key: {
                email: req.body.email
            }
        };
        const data = await dynamodb.get(params).promise();
        res.send(data);
    } catch (error) {
        console.log(error);
        throw error;
    }
}



module.exports = {
    createNewUser,
    createNewPostInDynamoDB,
    readPostById,
}