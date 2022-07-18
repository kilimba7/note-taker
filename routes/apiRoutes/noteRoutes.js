const fs = require('fs');

// Pulling from the array in db and added a module to generate a unique ID
const router = require('express').Router();
const { notes } = require('../../db/db');
const { v4: uuidv4 } = require('uuid');
uuidv4(); 


router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, noteData) => {
        if (err) throw err;

        res.send(noteData);
    })
});


router.post('/notes', (req, res) => {
    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }
    fs.readFile('./db/db.json', (err, noteData) => {
        if (err) throw err;

        let newData = JSON.parse(noteData);
        newData.push(newNote);


    fs.writeFile('./db/db.json', JSON.stringify(newData), (err) => {
        if (err) throw err;

        res.send(noteData);
        })
    })
});


// Will come back to this delete function (should receive a query parameter containing the id of note, need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.)
// router.delete('/notes/:id', (req, res) => {
    


module.exports = router;


