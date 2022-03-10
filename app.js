const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const controller = require('./controller/index')
const validator = require('./middleware/validation')



app.use(bodyParser.json());


app.post("/sign-in",controller.userSignIn);




app.post('/create-new-post', validator.userDetails, controller.createNewPost);
// learning purpose
app.post('/read-post-by-id', controller.readPostById);






const port = process.env.PORT || 3000;
app.listen(port,() =>{
    console.log(`listening on port ${port}...s`);
})