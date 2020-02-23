const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

const db = require('knex')({
    client:'pg',
    connection:{
        host:'127.0.0.1',
        user:'postgres',
        password:'1973BindaS',
        database: 'smartbrain'
    }
});

db.select('*').from('users').then(data=>{
    console.log(data);
});

app.get('/', (req,res,next)=>{
    res.send(database.users)
});

app.post('/signin', (req, res, next)=>{
    // res.json('running at port 3030 SIGN IN');
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data=>{
            bcrypt.compare(req.body.password, data[0].hash, function(error, result){
                if (result) {
                    return db.select('*').from('users')
                        .where('email','=',req.body.email)
                        .then(user=>{
                            console.log(user);
                            res.json(user[0]);
                    })
                    .catch(err=> res.status(400).json('Unable to get user'))
                } else {
                    return res.status(400).json('Wrong credentials')
                }   
            });
        })
        .catch(err=>res.status(400).json('wrong credentials'))
});



app.post('/register', (req, res)=> {
    const { email, name, password } = req.body;
    // 
    bcrypt.hash(password, saltRounds, function (err, hash){
        db.transaction(trx=>{
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                .returning('*')
                .insert({
                    name: name,
                    email: loginEmail[0],
                    joined: new Date()
                })
                .then(user=>{
                    res.json(user[0])
                })
            
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })    
        .catch(err=> res.status(400).json('unable to register'))
    })
      
   
});

app.get('/profile/:id', (req,res)=>{
    const { id } = req.params;
    db.select('*').from('users').where({id})
        .then(user=>{
           
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json('User Not Found!')
            }
        })
});

app.put('/image', (req,res)=>{
    const { id } = req.body;
    db('users').where('id','=',id)
      .increment('entries', 1)
      .returning('entries')
      .then(entries=>{
          res.json(entries[0]);
      })
      .catch(err=> res.status(400).json("Unable to Count"))
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