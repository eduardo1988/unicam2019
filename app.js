console.log("start the server");

const express = require('express'); // analogo alla import dipendenza  di java, dipendenza
const app = express();      // viene istanziata express quindi il server

app.set('view engine', 'ejs'); // view engine 'ejs'  sistema che gestirà le nostre viste



app.get('/', function(req,res){
    res.render('index',{user:"Great User", title:"homepage"});
});



// initialize the server
app.listen(3000,function(){
    console.log("live at Port 3000");
});