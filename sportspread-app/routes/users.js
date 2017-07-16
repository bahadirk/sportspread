// Get Dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwy = require('jsonwebtoken');
const config = require('../config/database');
const multer = require('multer');

const User = require('../models/users');

const DIR = './src/assets/profile_photos';

var upload = multer({dest: DIR}).single('photo');

// Register
router.post('/register', (req, res, next) => {
    "use strict";
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err) => {
        if(err) {
            res.json({success: false, msg: 'Failed to register user'});
        } else {
            res.json({success: true, msg: 'User registered'});
        }
    });
});


// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;

        if(!user) {
            res.json({success: false, msg: 'User not found'});
        }

        if(!user.password) {
            res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwy.sign(user,config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT ' +token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

// Update Profile
router.post('/editprofile', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    var path = '';

    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
            console.log(err);
            return res.status(422).send("an Error occured")
        }
        // No error occured.
        path = req.file.path;
    });

    User.updateUser(req.body, (err) => {
        if(err) {
            res.json({success: false, msg: 'Failed to update user'});
        } else {
            res.json({success: true, msg: 'User updated'});
        }
    });
});

//Search Teammates
router.post('/teammates', (req, res, next) => {
    console.log(req.body);
    User.findTeammatesBySearch(req.body, (err, users) => {
        if(err) {
            res.json({success: false, msg: 'Something went wrong in search.'});
        } else {
            res.json({success:true, users: users});
        }
    });
});

//Search Opponents
router.post('/opponents', (req, res, next) => {
    console.log(req.body);
    User.findOpponentsBySearch(req.body, (err, users) => {
        if(err) {
            res.json({success: false, msg: 'Something went wrong in search.'});
        } else {
            res.json({success:true, users: users});
        }
    });
});

module.exports = router;