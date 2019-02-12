console.log("start the server");

const express = require('express'); // analogo alla import dipendenza  di java, dipendenza
const app = express();      // viene istanziata express quindi il server

app.set('view engine', 'ejs'); // view engine 'ejs'  sistema che gestirà le nostre viste


/*
 //Ejs uses by defalut the views in the 'views' folder

app.get('/', function(req,res){
    // var objPassedToView = {user:"Great User", title:"homepage"}
    //res.render('index',objPassedToView);
    // these two line above  are equivalent this line below 
    res.render('index',{user:"Dido", title:"Test di esmepio"});
});

*/ // codice commentato dopo aver stabilito chi sarà il nostro index, cioè la pagina iniziale


/**
 * Create the handler for login page
 */
//MODIFICHIAMO QUEST'HANDLER POICHE' LA NOSTRA PAGINA DI INDEX è LOGIN ,
// COMMENTANDO app.get('/', ...){...}. Bastera togliere login e lasciare '/'
app.get('/', function(req,res){
     res.render('login',{});
});


// initialize the server
app.listen(3000,function(){
    console.log("live at Port 3000");
});