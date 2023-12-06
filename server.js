const express = require('express');
const path = require('path');
const api = require('./routes/notes.js')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

// //Open index.html in root
// app.get('/', (req,res) => {
//     res.sendFile(path.join(__dirname,'public/index.html'));
// });

//Open notes.html 
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname,'public/notes.html'));
});
//Open index.html for not found
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
});



app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);