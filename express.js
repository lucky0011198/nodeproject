var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
//var data = [10, 30, 50, 20, 36, 50, 60, 80, 100, 90, 50];
const { response } = require('express');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login'
});
var app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/login.html'));
});
app.get('/res', function (request, response) {
    response.sendFile(path.join(__dirname + '/regisrtaion.html'));
});

app.post('/auth', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM ak WHERE email=? AND psw=?', [username, password], function (error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/home');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

app.get('/home', function (request, response) {

    if (request.session.loggedin) {
        // response.send('Welcome back, ' + request.session.username + '!');
        response.redirect('/ak');
    } else {
        response.send('Please login to view this page!');
    }
    response.end();
});
app.get('/logout', function (request, response) {
    request.session.loggedin = false;
    response.send('your log-out !');

})
app.get('/ak', function (request, response) {
    if (request.session.loggedin) {
        response.render('hom', { data: [1, 30, 50, 80, 90, 50, 40] })
    } else {
        response.send('Please login to view this page!');
    }
})
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login"
});
app.post('/auth2', function (request, response) {
    var user = request.body.name;
    var email = request.body.email;
    var password = request.body.psw;
    var cpassword = request.body.cpsw;
    if (password == cpassword) {
        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            con.query("INSERT INTO ak (name,email,psw,cpsw) VALUE(?,?,?,?)", [user, email, password, cpassword], function (err, result) {
                if (err) throw err;
                console.log(" inserted");
            });
        });
    }

})


app.listen(3000);