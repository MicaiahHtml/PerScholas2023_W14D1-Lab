require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');

// All routes and controllers are in this file: Step 1 of refactoring
const routes = require('./controllers/logs.js');


const mongoose = require('mongoose');
const app = express();

const jsxViewEngine = require('jsx-view-engine');

// Model Configuration

// const Log = require("./models/log.js");

// Global Configuration
const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
const db = mongoose.connection;

// Connect to Mongo
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {console.log("Connected to Mongo")});


app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', jsxViewEngine());

// ================ Middleware ================
//
app.use((req, res, next) => {
    console.log('Middleware: I run for all routes');
    next();
})

//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}));

app.use(methodOverride('_method'));

// Step 2 of refactoring
app.use('/logs', routes);

// ROOT

app.get('/', (req, res) => {
    //res.send('this is my captain\'s log root route');
    res.render('logs/Home')
});

app.listen(PORT, () => {
    console.log('listening');
});