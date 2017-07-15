// Get Dependencies
const express = require('express');
const router = express.Router();
const jwy = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/users');

//Search 
router.post('/opponents', (req, res, next) => {
    console.log(req.body);
    User.findOpponentsBySearch(req.body, (err, users) => {
        if(err) {
            res.json({success: false, msg: 'Something went wrong in search.'});
        } else {
            res.json({success:true, users: users});
        }
    });

    /*res.json({user: User.findUserBySearch(sport_name)}); */
});
