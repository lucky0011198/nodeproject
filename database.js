var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "form"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var user = 'laxmikant';
    var email = 'akshata';
    con.query("INSERT INTO ak (name,email) VALUE(?,?)", [user, email], function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});