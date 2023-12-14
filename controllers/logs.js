const express = require("express");
const Log = require("../models/log");

const router = express.Router();

// These are my routes
// We are going to create the 7 RESTful routes
// There is an order for them to listed in the code
// I - N - D - U - C - E - S
//  Action      HTTP Verb   CRUD 
// I - Index    GET         READ - display a list of elements
// N - New      GET         CREATE * - but this allows user input
// D - Delete   DELETE      DELETE
// U - Update   PUT         UPDATE * - this updates our database
// C - Create   POST        CREATE * - this adds to our database
// E - Edit     GET         UPDATE * - but this allows user input
// S - Show     GET         READ - display a specific element



// I - INDEX - dsiplays a list of all fruits
router.get('/', async (req, res) => {
    // res.send(fruits);
    try{
        const foundLogs = await Log.find({});
        res.status(200).render('logs/Index', {logs: foundLogs});
    }catch(err){
        res.status(400).send(err);
    }
    
});


// N - NEW - allows a user to input a new fruit
router.get('/new', (req, res) => {
    res.render('logs/New');
});

// D - DELETE - PERMANENTLY removes fruit from the database
router.delete('/:id', async (req, res) => {
    try {
        const deletedLog = await Log.findByIdAndDelete(req.params.id);
        console.log(deletedLog);
        res.status(200).redirect('/logs');
    } catch (err) {
        res.status(400).send(err);
    }
})


//U - UPDATE - makes the actual changes to the database
router.put('/:id', async(req, res) => {
    (req.body.shipIsBroken === 'on')? req.body.shipIsBroken = true : req.body.shipIsBroken = false;
    try{
        const updatedLog = await Log.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true}
        );
        console.log(updatedLog);
        res.status(200).redirect(`/logs/${req.params.id}`);
    }catch(err){
        res.status(400).send(err);
    }
});



// C - CREATE - update our data store
router.post('/', async (req, res) => {
    (req.body.shipIsBroken === 'on') ? req.body.shipIsBroken = true : req.body.shipIsBroken = false;
    try{
        const createdLog = await Log.create(req.body);
        //STATUS 200 = SUCCESS
        res.status(200).redirect('/logs');
    }catch (err){
        res.status(400).send(err);
    }
});

// E - EDIT - allow the user to provide the inputs to change the fruit

router.get("/:id/edit", async (req, res) => {
    try{
        const foundLog = await Log.findById(req.params.id);
        res.status(200).render('logs/Edit', {log: foundLog});
    }catch(err){
        res.status(400).send(err);
    }
});


// S - SHOW - show route displays details of an individual fruit
router.get('/:id', async (req, res) => {
    try{
        const foundLog = await Log.findById(req.params.id);
        res.render('logs/Show', {log: foundLog});
    }catch (err){
        res.status(400).send(err);
    }
});



module.exports = router;