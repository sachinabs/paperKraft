const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const controller = require('./controller/index')
const validator = require('./middleware/validation')



app.use(bodyParser.json());

app.post('/sign-in', validator.userSignIn, controller.userSignup);
app.post('/log-in', validator.userLogin, controller.userLogin);
app.post('/create-new-post', controller.createNewPost);
app.get('/read-all-post', controller.readAllPost);

// read all post
// read one post 
// delete one post

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`listening on port ${port}...s`);
})