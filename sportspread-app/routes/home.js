// Get Dependencies
const express = require('express');
const router = express.Router();
const jwy = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/users');

//Search 
router.post('/search', (req, res, next) => {
    
    "use strict";
    let sport_name = req.body.sport_name

    User.findUserBySearch(sport_name, (err, users) => {
        if(err) {
            res.json({success: false, msg: 'Something went wrong about seach'});
        } else {
            res.json({users: req.user});
        }
    });

    /*res.json({user: User.findUserBySearch(sport_name)}); */
});
