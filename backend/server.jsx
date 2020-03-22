const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

// require('dotenv').config();
dotenv.config( '/.env' );

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("mongodb database connection established");
})

const eventsRouter = require('./routes/events');
app.use('/events',eventsRouter);

app.listen(port, () => {
    console.log('Server is running on port:' + port);
})