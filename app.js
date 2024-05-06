const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS middleware
const app = express();

// Use CORS middleware
app.use(cors());

app.use(express.static(__dirname)); 

app.use(bodyParser.json());

let items = [];
let users = [];

// Route for fetching all items
app.get('/products', (req, res) => {
    res.json(items);
});

// Route for adding a new item
app.post('/products', (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    res.sendStatus(200);
});

// Route for user registration
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        res.status(409).send('Username already exists'); // Username already exists
    } else {
        users.push({ username, password });
        res.sendStatus(201); // Registration successful
    }
});

// Route for user login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.redirect('/index.html'); // Redirect to index.html upon successful login
    } else {
        res.status(401).send('Invalid username or password'); 
    }
});

// Redirect root URL to login.html
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// Start server
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Navigate to http://localhost:${PORT}/ in your browser.`);
});

// Export app and items array for testing
module.exports = { app, items };
