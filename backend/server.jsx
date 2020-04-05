const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

// require('dotenv').config();
dotenv.config( '/.env' );

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

app.use(session({
    secret:"whateverforeverbaby",
    resave:false,
    saveUninitialized:false
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("mongodb database connection established");
}).catch((err) => console.log(err));

const usersRouter = require('./routes/users');
app.use('/users',usersRouter);

const eventsRouter = require('./routes/events');
app.use('/events',eventsRouter);

const calendarsRouter = require('./routes/calendars');
app.use('/calendars',calendarsRouter);

app.listen(port, () => {
    console.log('Server is running on port:' + port);
})