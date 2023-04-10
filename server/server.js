var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');

var app = express();

app.get('/', function(req, res) {
        res.send({'message': 'Hello'});
});

app.listen(3001, function () {
        console.log('Node app is running on port 3001');
});

const db = mysql.createPool({
    host: '34.68.202.24',
    user: 'root',
    password: '1234',
    database: 'test'
});

app.post('/report', function(req,res) {
        console.log(req.body);
});

app.get('/all', function(req, res) {
var qr = `
SELECT w.Weapon_Desc, count(w.Weapon_Used_Cd)/?*100
from crime c natural join crimetype c1 natural join subarea s2 natural join weaponinfo w
where s2.AREA_NAME = 'Central'
group by w.Weapon_Used_Cd
having 5 < count(c.DR_NO);
`
var before = `
select count(w.Weapon_Used_Cd)
from crime c natural join weaponinfo w natural join subarea s2
where s2.AREA_NAME = 'Central';`

db.query(before, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            db.query(qr, [result], (err1, result1) => {
            if (err1) {
                console.log(err1)
            } else {
                res.send(result1);
        }})}
    });
});