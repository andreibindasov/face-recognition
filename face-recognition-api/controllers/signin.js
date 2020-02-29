const handleSignin = (req, res, db, bcrypt)=>{
    // res.json('running at port 3030 SIGN IN');
    const { email, password } = req.body;
    if (!email || !password){
        return res.status(400).json('some fields are empty')
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data=>{
            bcrypt.compare(password, data[0].hash, function(error, result){
                if (result) {
                    return db.select('*').from('users')
                        .where('email','=',email)
                        .then(user=>{
                            // console.log(user);
                            res.json(user[0]);
                    })
                    .catch(err=> res.status(400).json('Unable to get user'))
                } else {
                    return res.status(400).json('Wrong credentials')
                }   
            });
        })
        .catch(err=>res.status(400).json('wrong credentials'))
}

module.exports = {
    handleSignin
}