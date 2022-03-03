const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const controller = require('./controller/index')




app.use(bodyParser.json());

app.post('/create-new-post', controller.createNewPost);




const port = process.env.PORT || 3000;
app.listen(port,() =>{
    console.log(`listening on port ${port}...s`);
})