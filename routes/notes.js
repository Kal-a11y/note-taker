const notesApi = require('express').Router();
const { uid } = require('uid');
const fs = require('fs');

const notes_dbList = require('../db/db.json');
const { log } = require('console');

notesApi.get('/notes', (req, res) => {
    res.json(notes_dbList);
    
});
    

notesApi.post('/notes', (req, res) => {
    //Save request
    const{ title, text} = req.body;
    const newNote = {
        title: title,
        text: text,
        id: uid(5)
    }

    //Add new note to database
    notes_dbList.push(newNote);
    const dbString = JSON.stringify(notes_dbList);
    fs.writeFile('./db/db.json', dbString, err => {
        if (err){
            console.log(err)
        } else {
            res.send('New note has been added');
        }
    });
    
});

notesApi.delete('/notes/:id', (req, res) => {
    //Find and remove note from list
    const note_id = req.params.id;
    const updatedDb = JSON.stringify(notes_dbList.filter(note => {
        return note.id !== note_id;
    }))

    //Remove current note from database
    fs.writeFile('./db/db.json', updatedDb, err => {
        if (err){
            res.send(err);
            console.log(err)
        } else {
            res.send(`Note ${note_id} has been removed`);
            console.log(`Note ${note_id} has been removed`);
        }
    });
})

module.exports = notesApi;