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

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'johndoe@gmail.com',
            password:'nhoJ',
            entries: 0,
            joined: new Date()
        },
        {
            id: '1234',
            name: 'Mary',
            email: 'marypoppins@gmail.com',
            password:'yraM',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '992',
            hash:'',
            email:'johndoe@gmail.com'
        }
    ]
}

app.get('/', (req,res,next)=>{
    res.send(database.users)
});

app.post('/signin', (req, res, next)=>{
    // res.json('running at port 3030 SIGN IN');
    bcrypt.compare('dude', '$2b$10$DcRgcGE1FybowppE.qTUwO0y3jU9r2lLVGMlexqiF.aFn4j0LWdzu', 
    function(err, res){
        console.log('1-' + res);
    });
    bcrypt.compare('dadaaa', '$2b$10$DcRgcGE1FybowppE.qTUwO0y3jU9r2lLVGMlexqiF.aFn4j0LWdzu', 
    function(err, res){
        console.log('2-' + res);
    })
    
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password){
            // res.json("SUCCESS");
            console.log(database.users[0]);
            res.json(database.users[0]);
        } else {
            res.status(400).json("ERROR!!!")
        }
});

app.post('/register', (req, res)=> {
    const { email, name, password } = req.body;
    // bcrypt.hash(password, saltRounds, function (err, hash){
    //     console.log(hash);
    //     if (!err) {
    //         database.users.push({
    //             id: '1233334',
    //             name: name,
    //             email: email,
    //             entries: 0,
    //             joined: new Date()
    //         });
    //         database.login.push({
    //             id: '1233334',
    //             email: email,
    //             hash: hash
    //         });
    //     }
    // });
    database.users.push({
        id: '1233334',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length-1]);
    
    // res.json(database.login[database.login.length-1]);
            
    
});

app.get('/profile/:id', (req,res)=>{
    const { id } = req.params;
    let found =false;
    database.users.forEach(user => {
        if (user.id===id){
            found=true;
            return res.json(user);
        } 
        
        if (!found) {res.status(400).send("NOT FOUND")};
        
    })
});

app.put('/image', (req,res)=>{
    const { id } = req.body;
    let found =false;
    database.users.forEach(user => {
        if (user.id===id){
            found=true;
            user.entries++;
            return res.json(user.entries);
        } 
        
        if (!found) {res.status(400).send("NOT FOUND")};
        
    })   
})

// app.get('', (req, res, next)=>{
//     res.send(database.login);
// })

// app.post('/signin', (req, res)=>{
//     if (req.body.email===database.users[0].email && 
//         req.body.password===database.users[0].password) {
//             res.json('SuccesS');
//         } else {
//             res.status(400).json('ERR');
//         }
   
// })

// app.post('/register', (req, res)=>{
//     const { email, name, password} = req.body;
    
//     bcrypt.hash(password, saltRounds, function(err, hash){
        
//         if (!err){
//             database.users.push({
//                 id: '1237',
//                 name: name,
//                 email: email,
//                 // password: hash,
//                 entries: 0,
//                 joined: new Date()
//             });
//             database.login.push({
//                 id: '1237',
//                 email: email,
//                 hash: hash,
                
//             });
//         }
//     });
    
//     res.json(database.login[database.login.length-1]);
// })

// app.get('/profile/:id', (req, res)=>{
//     const {id} = req.params;
//     let found=false;
//     database.users.forEach(user => {
//         if (user.id === id) {
//             found=true;
//             return res.json(user);
//         }
//     });

//     if (!found) {
//         res.status(404).json('no such user');
//     }
// })

// app.put('/image', (req, res)=>{
//     const {id} = req.body;
//     let found=false;
//     database.users.forEach(user => {
//         if (user.id === id) {
//             found=true;
//             user.entries++
//             return res.json(user.entries);
//         }
//     });    
//     if (!found) {
//         res.status(404).json('no such user');
//     }    
// })

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