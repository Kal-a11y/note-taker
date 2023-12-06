const notesApi = require('express').Router();
const { uid } = require('uid');
const fs = require('fs');

const notes_dbList = require('../db/db.json')

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
    const note_id = req.params.id;
    //get all notes
    //check if note_id is the id of a note
        //if yes remove
    //overwrite database with new notes list
})

module.exports = notesApi;