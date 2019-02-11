console.log("start the server");

const express = require('express');
const app = express();

// initialize the server
app.listen(3000,function(){
    console.log("live at Port 3000");
});