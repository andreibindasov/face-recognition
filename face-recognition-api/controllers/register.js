const handleRegister = (req, res, db, bcrypt)=> {
    const { email, name, password } = req.body;
    const saltRounds = 10;
    if (!name || !email || !password){
        return res.status(400).json('some fields are empty')
    }
    
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
      
   
}

module.exports = {
    handleRegister: handleRegister
}