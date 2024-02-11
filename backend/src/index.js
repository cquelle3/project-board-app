const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRoutes = require('./apiRoutes');
const authRoutes = require('./authRoutes');
const ping = require('./ping');

//accesses .env file for project
require('dotenv').config();

const app = express();
const PORT = 3001;

//TODO put in frontend url as param instead
app.use(cors({
    origin: `${process.env.FRONTEND_URL}`
}));
app.use(bodyParser.json({ limit: '100mb' }));

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

app.get('/', function(req, res) {
    res.send('hello!').status(200);
});

const start = async () => {
    try{
        await mongoose.connect(
            process.env.MONGO_URI2
        );

        app.listen(PORT, (err) => {
            if(!err){
                console.log(`Server running on port ${PORT}`);
                ping.start();
            }
            else console.log("Error occurred, server can't start", err);
        });
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
};

start();