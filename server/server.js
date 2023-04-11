var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
const cors = require('cors');

var app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  next();
})

app.use(cors());

app.use(express.json());

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

app.get('/reportCrime', function(req,res) {
  var a = `select * from selfreportcrime`
  db.query(a, (err, result)=>{
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.post('/report', function(req,res) {
  console.log(req.body);
  var a = req.body.dateocc

  var findmax = `select max(ReportID)
                 from selfreportcrime`
  
  var insert2 = ` insert into selfreportcrime
  values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

  db.query(findmax, (err, result) => {
    if (err) {
      console.log(err);
    } else  {
      console.log(result);
      var val = JSON.stringify(result[0]);
      var newValue = JSON.parse(val);
      var jsonValue = newValue['max(ReportID)']
      var newVal = jsonValue + 1

      console.log()

      db.query(insert2, [newVal, req.body.dateocc, req.body.location, req.body.crime, req.body.description, req.body.fname, req.body.lname, req.body.phone, req.body.email, "06DY5F"], (err1, result1) => {
        if (err1) {
            console.log(err1)
        } else {
            res.send(result1);
        }
      })
    }
  });

  var a = req.body.dateocc;
  var insert = `
  insert into selfreportcrime
  values (1+?, req.body.dateocc, req.body.location, req.body.crime, req.body.description, req.body.fname, req.body.lname, h, req.body.email, "")
  `
  /*
  db.query(findmax, (err, result) => {
    if (err) {
        console.log(err)
    } else {
        db.query(insert, [result], (err1, result1) => {
        if (err1) {
            console.log(err1)
        } else {
            res.send(result1);
        }
        }
        )
    }
  });
  */
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