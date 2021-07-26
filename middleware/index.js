const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

//express server
const app = express();
const port = process.env.PORT || 5000;

//middleware + cors
app.use(cors());
app.use(express.json({limit: "5mb"}));  

//database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connected!!");
})

const question = require('./routes/questions');
app.use('/questions', question);

// const student = require('./routes/students');
// app.use('/students', student);

const distributor = require('./routes/distributors');
app.use('/distributors', distributor);

const school = require('./routes/schools');
app.use('/schools', school);

// const coach = require('./routes/coaches');
// app.use('/coaches', coach);

const classroom = require('./routes/classrooms');
app.use('/classrooms', classroom);

const user = require('./routes/users');
app.use('/users', user);

const imports = require('./routes/imports');
app.use('/imports', imports);

const test = require('./routes/test');
app.use('/test', test);

const result = require('./routes/results');
app.use('/results', result);

const report = require('./routes/report');
app.use('/report', report);

const speechace = require('./routes/speechace');
app.use('/speechace', speechace);

if(process.env.NODE_ENV=="production"){
    app.use(express.static('./client/build'))

    const path = require('path')
    app.get("*", (req, res) =>{ 
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


