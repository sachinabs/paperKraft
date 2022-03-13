const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const signupDetail = async (user) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const params = {
            TableName: "user_personal_details",
            Key: {
                email: user.email
            }
        };
        const ans = await dynamodb.get(params).promise();
        if (ans.Item) {
            return { message: "User already exists" }
        } else {
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
                message: "User created successfully",
                id: user.id
            }
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const userLoginDetail = async (req, res) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const params = {
            TableName: "user_personal_details",
            Key: {
                email: req.body.email
            }
        };
        const ans = await dynamodb.get(params).promise();
        return ans;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const createPost = async (newPost) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    try {
        const params = {
            TableName: "user_details",
            Key: {
                useruuid: newPost.useruuid
            }
        };
        const isColumnExists = await dynamodb.get(params).promise();
        if (isColumnExists.Item == undefined ) {
            const params = {
                TableName: "user_details",
                Item: {
                    useruuid: newPost.useruuid,
                    post: [{
                        title: newPost.title,
                        post: newPost.post,
                        postuuid: newPost.postuuid,
                        useruuid: newPost.useruuid,
                        date: newPost.date,
                        time: newPost.time
                    }]
                }
            };
            
            const response = await dynamodb.put(params).promise();
            return response;

        } else {
            const params = {
                TableName: "user_details",
                Key: {
                    useruuid: newPost.useruuid
                },
                UpdateExpression: "set post = list_append(post, :post)",
                ExpressionAttributeValues: {
                    ":post": [{
                        title: newPost.title,
                        post: newPost.post,
                        postuuid: newPost.postuuid,
                        useruuid: newPost.useruuid,
                        date: newPost.date,
                        time: newPost.time
                    }]
                },
                ReturnValues: "UPDATED_NEW"
            };
            const response = await dynamodb.update(params).promise();
            return response;
        }

    } catch (error) {
        console.log(error);
    }

}



module.exports = {
    signupDetail,
    userLoginDetail,
    createPost
}
