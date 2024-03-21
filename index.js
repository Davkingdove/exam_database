const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = 3000;
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Serve static files (CSS and client-side JS)
app.use(express.static('public'));

// Parse JSON bodies
app.use(express.json());

//create mysql connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db'
  });
  // connecting to database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to database');
  });
// Handle form submission
app.post('/save', (req, res) => {
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const cmaths30=req.body.maths30;
    const cmaths70=req.body.maths70;
    const english30 =req.body.english30;
    const english70 =req.body.english70;
    const science30=req.body.science30;
    const science70=req.body.science70;
    const studies30=req.body.studies30;
    const studies70=req.body.studies70;
    const maths30=req.body.maths30;
    const maths70=req.body.maths70;
    const chemistry30=req.body.chemistry30 ; 
    const chemistry70=req.body.chemistry70 ; 
    const physics30=req.body.physics30;
    const physics70=req.body.physics70;
    const biology30=req.body.biology30
    const biology70=req.body.biology70

    // Check if data already exists
  const query = `SELECT COUNT(*) AS count FROM 2science1 WHERE first_name = '${firstname}' AND last_name = '${lastname}'`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
      return;
    }
    const count = results[0].count;
    if (count > 0) {
      // Data already exists, send response to display toast
      res.status(200).json({ message: 'Data already exists you can only edit Data' });
    } else {
      // Data does not exist, proceed with insertion
      const insertQuery = "INSERT INTO `db`.`2science1` (`first_name`, `last_name`,`english30`,`english70`,`core_maths30`,`core_maths70`,"
      +"`int.science30`,`int.science70`,`social_std30`,`social_std70`,`elective_maths30`,`elective_maths70`,`biology30`,`biology70`,"
      +"`chemistry30`,`chemistry70`,`physics30`,`physics70`)"
      +"VALUES "+"('"+firstname+"',"+ "'"+lastname+"',"+"'"+english30+"',"+ "'"+english70+"',"+"'"+cmaths30+"',"+ "'"+cmaths70+"',"+"'"+science30+"',"+ "'"+science70+"',"
      +"'"+studies30+"',"+ "'"+studies70+"',"+"'"+maths30+"',"+ "'"+maths70+"',"+"'"+chemistry30+"',"+ "'"+chemistry70+"',"+"'"+physics30+"',"+ "'"+physics70+"',"
      +"'"+biology30+"',"+ "'"+biology70+"'"+");"

      connection.query(insertQuery, (err, results) => {
        if (err) {
          console.error('Error executing insertion query:', err);
          res.status(500).json({ message: 'Failed to save data' });
          return;
        }

        res.status(200).json({ message: 'Data successfully saved' });
      });
    }
  });
});
   
 


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/home', (req, res) => {
    res.render('home')
})  
app.post('/save', (req, res) => {
  
})
app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
})


 // console.log('first name :'+req.body.firstname)
    // console.log('last Name :'+req.body.lastname)
    // console.log('first name:'+firstname)
    // console.log('lastname :'+lastname)
    // console.log('english30 :'+english30)
    // console.log('english70 :'+english70)
    // console.log('maths30 :'+cmaths30)
    // console.log('maths70 :'+cmaths70)
    // console.log('intScience30 : '+science30+' interscience70 :'+science70)
    // console.log('emaths30 :'+maths30+' emaths70 : '+maths70)
    // console.log('physics30 :' +physics30+' physics70 :'+physics70)
    // console.log('chemistry30 :'+chemistry30+ ' chemistry70 :'+chemistry70)
    // console.log('biology30 :'+biology30+ 'biology70 : '+biology70)
    // console.log('social30 : '+studies30+' social70 :'+studies70)
