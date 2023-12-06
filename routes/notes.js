const notesApi = require('express').Router();
const { uid } = require('uid');
const fs = require('fs');

const notes_dbList = require('../db/db.json');
const { log } = require('console');

notesApi.get('/notes', (req, res) => {
    res.json(notesList);
    
});
    

notesApi.post('/notes', (req, res) => {
    //Save request
    const{ noteTitle, noteText} = req.body;
    const newNote = {
        title: noteTitle,
        text: noteText,
        note_id: uid(5)
    }

    //Name undefined title
    if (typeof newNote.title === 'undefined'){
        newNote.title = 'Untitled Note '+ newNote.note_id
    }

    //Add new note to database
    notes_dbList.push(newNote);
    const dbString = JSON.stringify(notes_dbList);
    fs.writeFile('./db/db.json', dbString, err => {
        if (err){
            console.log(err)
        } else {
            console.log('New note has been added');
        }
    });
    
});

notesApi.delete('/notes/:id', (req, res) => {
    //Find and remove note from list
    const note_id = req.params.id;
    const updatedDb = notes_dbList.filter(note => {
        return note.note_id !== note_id;
    })

    //Remove current note from database
    dbString = JSON.stringify(updatedDb);
    fs.writeFile('./db/db.json', dbString, err => {
        if (err){
            console.log(err)
        } else {
            console.log(`Note ${note_id} has been removed`);
        }
    });
})

module.exports = notesApi;