const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const urlExists = require('url-exists');
// const saltRounds = 10;

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

const db = require('knex')({
    client:'pg',
    connection:{
        host:'127.0.0.1',
        user:'postgres',
        password:'postgres',
        database: 'smartbrain'
    }
});

db.select('*').from('users').then(data=>{
    console.log(data);
});

app.get('/', (req, res)=> { res.send("HELLOOOOOOOO.....") })

app.post('/signin', (req, res)=> {
    signin.handleSignin(req, res, db, bcrypt)
});



app.post('/register', (req, res) => { 
    register.handleRegister(req, res, db, bcrypt)
});

app.get('/profile/:id', (req, res)=>{
     profile.handleProfile(req, res, db)
});

app.put('/image', (req, res)=> {
    urlExists(req.body.imageUrl, (err, exists)=>{
        if (exists && (req.body.imageUrl.toLowerCase().includes('.jpg') || 
                       req.body.imageUrl.toLowerCase().includes('.gif') || 
                       req.body.imageUrl.toLowerCase().includes('.png') || 
                       req.body.imageUrl.toLowerCase().includes('.bing'))) {
            image.handleImage(req, res, db)
        } else {
            res.json("URL doesn't exist")
        }
    })
    
    
});

app.post('/imageurl', (req, res)=> {
    image.handleApiCall(req, res)
})


app.listen(3030, ()=>{
    console.log('app is running');
})

/*
--> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/