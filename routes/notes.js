const notesApi = require('express').Router();

const notesList = require('../db/db.json')

notesApi.get('/notes', (req, res) => {
    res.json(notesList);
    
});
    

notesApi.post('/notes', (req, res) => {
    const{ noteTitle, noteText} = req.body;
    const newNote = {
        title: noteTitle,
        text: noteText,
        note_id: "test"
    }
    console.log(newNote)
    //Add unique id module
    //get all notes
    //add newNote
    //overwrite database with new notes list
    //create a card for new note
    //add new note to notes.html on left column

    //if title is undefined then set to Untitled
});

notesApi.delete('/notes/:id', (req, res) => {
    const note_id = req.params.id;
    //get all notes
    //check if note_id is the id of a note
        //if yes remove
    //overwrite database with new notes list
})

module.exports = notesApi;