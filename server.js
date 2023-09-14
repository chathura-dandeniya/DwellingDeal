const express = require('express');
var path = require('path');
global.appRoot = path.resolve(__dirname);


const app = express();

const port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public')) //set home folder to serve files from


app.get('/', (req, res)=>{
    res.sendFile('index.html'); //sends index.html on load at localhost:port 
})

app.listen(port, ()=>{
    console.log(`Server running on port http://localhost:${port}`);
    console.log("Press ctrl+c to shutdown");
})