const express = require("express");
const path = require('path');
const app = express()
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const session = require('express-session');

const homeRoutes = require('./routes/home');
const hospitalRoutes = require('./routes/hospital');
const dbUrl = "mongodb+srv://admin-akhil:akhiliffco@cluster0.9j6lv.mongodb.net/?retryWrites=true&w=majority"
const secret = "thisshouldbeabettersecret!"

const MongoDBStore = require("connect-mongo");

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Database Connected");
})
.catch(err => {
    console.log("Database Connection Error");
    console.log(err);
});
  
const store = MongoDBStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
});

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      expires: Date.now() + (1000 * 60 * 60 * 24 * 7),
      maxAge: (1000 * 60 * 60 * 24 * 7)
    }
}  

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
  
// Middlewares
app.use(session(sessionConfig));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(mongoSanitize());
  
app.use('/', homeRoutes);
app.use('/hospitals', hospitalRoutes);
  
const port = process.env.PORT || 8080;
  
app.listen(port, () =>{
    console.log(`Server started on port: ${port}`);
});