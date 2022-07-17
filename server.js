// Installing all the required modules and setting a path for this port 
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;
const express = require('express');
var app = express();

app.use(express.static('assets'));

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
const { notes } = require('./develop/db/db.json');



function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function createNewNote(body, notesArray) {
    const note = body;
    animalsArray.push(animal);
    fs.writeFileSync(
        path.join(__dirname, './/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    // return finished code to post route for response
    return note;
  }



app.get('/api/notes', (req, res) => {
    res.json(notes);
});


app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
    res.json(result);
    } else {
        res.send(404)
;    }
});

app.post('/api/notes', (req, res) => {
    // req.body is where our incoming content will be
   
    // set id based on what the next index of the array will be
   req.body.id = notes.length.toString();
   

   // add note to json file and animals array in this function
   const note = createNewNote(req.body, notes);
   res.json(note);
  
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/index.html'));
  });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '.Develop/notes.html'));
});

app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, './Develop/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});