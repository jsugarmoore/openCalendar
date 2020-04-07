const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose');
const router = require('express').Router();
const User = require('../models/user.model');


router.route('/register').post((req, res) => {
    
    User.register({username:req.body.username},req.body.password, function(err,user) {
        if (err) {
            console.log("ERROR IN REGISTRATION... ",err);
            return;
        } else {
            passport.authenticate("local")(req,res,function(){
                console.log("********authenticated*******",user);
                return;
             })
            }
    })

})

router.route('/checkAuth').get((req,res) => {

    if(req.isAuthenticated()){
        console.log('not authenticated via checkAuth',req)
    } else {
        passport.authenticate("local")(req,res, () => {
            console.log('authenticated via checkAuth',req)
        })

    }

})


module.exports = router;