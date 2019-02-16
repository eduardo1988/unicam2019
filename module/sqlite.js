//Modulo per la nostra app.js per fare la chiamata sqlite

//MODULO PER INTERFACCIARSI AL DB SQLITE
const sqlite3 = require('sqlite3').verbose();
const database = '.student.db';

module.export = {
    getStudents: function (callback){
        let db = new sqlite3.Database(database);
        
        var students = [];

        let sql = 'SELECT * FROM STUDENT ORDER BY NAME DESC';

        db.all(sql, [], (err,rows) => {
            if(err){
                throw err;
            }
            rows.forEach((row) =>{
                console.log("row", row);
                var student ={};
                student.id = row.ID;
                student.name = row.NAME;
                student.surname = row.SURNAME;
                console.log("student", student);

                students.push(student);                           
            });
            //call the callback
            callback(students);
        });

        db.close();



    }
}