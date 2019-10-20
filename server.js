const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');



const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var cors = require('cors')

app.use(cors()) 

// DB Config
const db = require('./config/keys').mongoURI;

// connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true } ).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));


// Passport Middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


port = process.env.PORT || 5050;

app.listen(port, () => console.log(`server running on ${port}`));