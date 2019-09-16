const express = require('express');
const bodyParser = require('body-parser');
const User = require('./User');
var router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));

router.use(bodyParser.json());

router.post('/',(req,res)=>{ User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
},  (err, user)=> {
        if(err)
            return res.status(500).send("There was a problem adding the information to database! ");
        res.status(200).send(user);
    }
)
});

router.get('/',(req,res) =>{
    User.find({},(err,users) => {
        if(err)
            res.status(500).send("Error finding users!");
        res.status(200).send(users);
            })  
});

router.get('/:id', (req, res) =>{
    User.findById(req.params.id, (err, user) =>{
        if (err) 
            return res.status(500).send("There was a problem finding the user.");
        if (!user)
            return res.status(404).send("No user found.");
        res.status(200).send(user);
    })

});

router.delete('/:id', (req, res) =>{

    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err)
            return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send(`User: ${user.name} was deleted.`);
    });

});

router.put('/:id', (req, res) =>{
    
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) =>{
        if (err)
            return res.status(500).send("There was a problem updating the user.");
        res.status(200).send("User Updated\n"+user);
    });

});

module.exports = router;