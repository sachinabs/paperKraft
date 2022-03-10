const dynamodbRepo = require('../dynamoDB');
const { v4: uuidv4 } = require('uuid');

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


module.exports = {
    userSignup,
    userLogin
}