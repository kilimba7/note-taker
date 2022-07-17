const fs = require('fs');

const router = require('express').Router();
const notes = require('../../db/db');


router.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        console.log(JSON.parse(data));

        res.send(data)
    })
})

router.post('/api/notes', (req, res) => {
    let newNote = {
        title: req.body.title,
        text: req.body.text
    }
    //  console.log(typeof db)
    // //1. use fs to read the db.json
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;

        let newData = JSON.parse(data);

        newData.push(newNote);
        console.log(newData)

        fs.writeFile('./db/db.json', JSON.stringify(newData), (err) => {
            if (err) throw err;

            res.send('successfully added');
        })
    });

})

module.exports = router;


