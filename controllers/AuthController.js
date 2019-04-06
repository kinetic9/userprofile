const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/User');

const userController = {};

// Restrict access to root page
userController.home = (req,res)=>{
    res.render('index',{user: req.user});
};

// Goto registration page
userController.register = (req,res)=>{
    res.render('register');
}

//Post registration
userController.doRegister = (req,res) =>{
    User.register(new User({username: req.body.username, name: req.body.name}),
    req.body.password, (err,user)=>{
        if(err){
            return res.render('register',{user: user});
        }

        passport.authenticate('local')(req, res, ()=>{
            console.log('Registration was successful..');
            res.redirect('/');
        });
    });
};

// go to login page
userController.login = (req,res)=>{
    res.render('login');
};

//Post login
userController.doLogin =(req,res)=>{
    passport.authenticate('local')(req,res, ()=>{
        console.log('LogIn was successful..');
        res.redirect('/');
    });
};

//Log out
userController.logout = (req, res)=>{
    req.logout();
    console.log('LogOut was successful..');
    res.redirect('/');
};

module.exports = userController;