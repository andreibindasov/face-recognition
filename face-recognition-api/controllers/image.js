const Clarifai = require('clarifai');
const app = new Clarifai.App({
    // apiKey: '6ba5f8003f6c49f19815c5eb33c82c10'
    apiKey:'0738174cda9f4394a3a585cc94e838d8'
  });

const handleApiCall =  (req, res)=> {
    app.models
    .predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)
    .then(data => {
        
        res.json(data);
        
    })
    .catch(err=> res.status(400).json("Unable to work with API"))
  
}


const handleImage = (req,res, db)=>{
    const { id, input } = req.body;
    
    // console.log(box);
    db.select('link').from("submits").where('link','=', input)
        .then(data=>{
            if (data[0]!==undefined) {
                res.status(400).json("This face has already been detected")
            } else {
                db('submits').insert({
                    link: input
                }).then(
                    db('users').where('id', '=', id)
                    .increment('entries', 1)
                    .returning('entries')
                    .then(entries=>{
                        res.json(entries[0]);
                    })
                    
                ) 
                .catch(error=>res.status(400).json("Unable to count"));
            }
        })

}

module.exports = {
    handleImage,
    handleApiCall
}