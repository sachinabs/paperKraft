
const joi = require('joi');

const userDetails = (req, res, next) => {

    const userData = {
        email: req.body.email,
        id: req.body.id,
        title: req.body.title,
        content: req.body.content
    }
    const schema = joi.object(
        {
            email: joi.string().min(5).required().email(),
            id: joi.string(),
            title: joi.string().min(5).required(),
            content: joi.string().min(5).required()
        }
    );
    const result = schema.validate(userData);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    console.log("passed validation");
    next();
    
}



module.exports = { userDetails };