const joi = require('joi');

const userSignIn = (req,res,next) => {
    // userDetails is a object which contain user details
    const userDetails = {
        "email": req.body.email,
        "name" : req.body.name,
        "password": req.body.password
    }
    // i create rules for user data
    const schema = joi.object({
        email:joi.string(),
        name:joi.string(),
        password:joi.string().min(8)
    })
    //  compare user data with my rules (schema)
    // if result gives success msg i pass to route function or else i will show the error
    const result = schema.validate(userDetails);
    if (result.error)
    {
        throw new Error(result.error);
    }
    console.log("validation is pass");
    // next is use to call another route function like santization, database , 
    next();
    
    console.log("userSignIn validation");
}

const userLogin = (req,res,next) => { 
    const userData = {
        "email" : req.body.email,
        "password" : req.body.password
    }
    const schema = joi.object({
        email:joi.string(),
        password:joi.string().min(8)
    })
    const result = schema.validate(userData);
    if (result.error)
    {
        throw new Error(result.error);
    }
    console.log("validation is pass");
    next();
    console.log("userlogin validation");
    
}
module.exports = {userSignIn, userLogin}

