//Modulo per la nostra app.js per fare la chiamata sqlite
//QUESTO MODULO ESPONE UNA FUNZIONE DI ALTO LIVELLO getStudents

//MODULO PER INTERFACCIARSI AL DB SQLITE
const sqlite3 = require('sqlite3').verbose(); //utilizziamo anche qui il require, dipendenza da sqlite per poter utilizzarla
const database = './students.db';

module.exports = { // qui viene detto con .exports al modulo di esportare  questa funzione getStudents
    getStudents: function (callback){
        let db = new sqlite3.Database(database);// inzializza una funzione sqlite DB ponendola in un variabile locale
        var students = [];  // creaimo un array  dove andranno messi in seguito l'elenco di studenti trovatei sul db
        let sql = `SELECT * FROM STUDENT ORDER BY NAME DESC`; // faccio la query select al db


        //chaiamata al metodo di db per ricavare i dati dal DB e passargli a chi effettua la chiamata
        db.all(sql, [], (err,rows) => {
            if(err){
                throw err;          // controllo errori
            }
            rows.forEach((row) =>{      // per ogni riga/row che trova ne crea 
                console.log("row", row);
                var student ={};            // una variabile student
                student.id = row.STUDENT_ID;
                student.name = row.NAME;
                student.surname = row.SURNAME;
                console.log("student", student);
                // una volta caricato ad ogni ciclo lo(student) inseiriamo nell'array students
                students.push(student);    // array di oggetti                       
            });
            //call the callback
            callback(students);
        });

        db.close();

        

    }
}