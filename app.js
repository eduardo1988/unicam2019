console.log("start the server");

const express = require('express'); // analogo alla import dipendenza  di java, dipendenza
var bodyParser = require('body-parser'); // per usufruire della dipendenza body-parser va istanziata
const app = express();      // viene istanziata express quindi il server
var  session = require('express-session'); // carico il modulo express-session come oggetto session, questo mi servirà per gestire la SESSIONE, quindi l'accesso ad una porzione autenticata del sito
var cookieSession = require('cookie-session');
var cookeParser = require('cookie-parser');

//Creo un Oggetto di utilità di accesso area amministratore
// oggetto di tipo statico
const admin_user = {
    user: "admin@admin.it",
    password: "admin"
};




//CONFIGURAZIONI:
app.set('view engine', 'ejs'); // view engine 'ejs'  sistema che gestirà le nostre viste
app.use(bodyParser.json());     // dichiariamo cosa è necessario che deve accetare la mia app
app.use(bodyParser.urlencoded({extended: true}));
// qui nelle configurazioni va detto al server di usare il Cookie di sessione
//poichè ricordando che le richieste HTTP mutua la sessione con i COOKIE
app.use(cookieSession({
    name:'session',
    keys:['username']
}));



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

// handler che gestirà il metodo POST del form login.ejs
// ora per gestire il redirect voglio dichiarare che se un utente ha determinate credenziali
// può accedere ad una area ristretta, che in questo caso amministratore*.
// Else, altrimenti redirect sulla pagina di login.
// Quindi sto definendo dei flussi di navigazione:
app.post('/login', function(req,res){
    //console.log(req);
    //console.log(req.body);  // formato JSON
    user = req.body.email;  //email corrisponde al nome del campo 'email' del form
    password = req.body.password;   //password corrisponde al nome del campo 'password' del form
    console.log("user,password",user,password,admin_user.user,admin_user.password)
    session = req.session;      // oggetto session 
    console.log("session",session);

    // qui avviene il check di autenticazione AMMINISTRATORE
  if (user == admin_user.user && password == admin_user.password) {
    session.user = admin_user;      //se si accede al campo if vuol dire che le credenziali sono corrette e admin_user sarà(verrà posto) in sessione 
    console.log("is authenticated")
    res.redirect('/students');  // per gestire una richiesta get va definita l'handler affinche mi generi il template students
    
  } else {
    res.redirect('/');
  }
    
});

//Handler per la gestione redirect(/'students') per generare/reindirizzare il template students.ejs
//Oss: gli passiamo una funzione checkAuthentication che verifica se nella sessione esiste un utente
// e se è definito quell'utente allora procedi con la chiamata next() else redirict ('/') [vedere la funzione sopra]
app.get('/students',checkAuthentication,function(req,res){
    
    res.render('students',admin_user);
    
});




// initialize the server
app.listen(3000,function(){
    console.log("live at Port 3000");
});