// Get the express package 
const express = require('express');

// Get mariadb package 

const mariadb = require('mariadb');
const { message } = require('statuses');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '611795',
    database: 'guestbook'
});

async function connect() {
    try {
        const conn = await pool.getConnection();
        console.log('Connected to the database');
        return conn;
    } catch (err) {
        console.log('Error connecting to the database: ' + err)
    }
}

// Instantiate an express (web) app
const app = express();

// Define a port number for the app to listen on
const PORT = 3000;

// Tell the app to encode data into JSON format
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

// Set your view (templating) engine to "EJS"
// (We use a templating engine to create dynamic web pages)
app.set('view engine', 'ejs');

// Define a "default" route, 
app.get('/', (req, res) => {
	// Log message to the server's console
	console.log("Hello, world - server!");

    // Return home page
    res.render('home');
});

// Define a "confirm" route, using the GET method
app.get('/confirm', (req, res) => {

    // Send a response to the client
    res.send('You need to post!');
});

// Define a "confirm" route, using the POST method
app.post('/success', async (req, res) => {
    // Get the data from the form that was submitted
    // from the body of the request object
    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        jobTitle: req.body.jobTitle,
        company: req.body.company,
        linkedin: req.body.linkedin,
        email: req.body.email,
        howMeet: req.body.howMeet,
        other: req.body.other,
        message: req.body.message
    }

    const conn = await connect();

    conn.query(`
        INSERT INTO guest (firstName, lastName, jobTitle, company, linkedin, email, howMeet, other, message)
        VALUES ('${data.firstName}', '${data.lastName}', '${data.jobTitle}', '${data.company}', '${data.linkedin}', '${data.email}', '${data.howMeet}', '${data.other}', '${data.message}');
    `);

    // Display the confirm page, pass the data
    res.render('success', { details: data });
})

app.get('/admin', async (req, res) => {

    const conn = await connect();

    const rows = await conn.query('SELECT * FROM guest;');

    console.log(rows);

    res.render('admin', { data: rows });
});

// Tell the app to listen for requests on the designated port
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
});