// Get Dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwy = require('jsonwebtoken');
const config = require('../config/database');
const multer = require('multer');

const User = require('../models/users');
const Team = require('../models/team');
const DIR = './src/assets/profile_photos';

var upload = multer({dest: DIR}).single('photo');


// Register Team
router.post('/registerteam', (req, res, next) => {
    console.log(req.body);

    let newTeam = new Team({
        sport_name: req.body.sport_name,
        teamname: req.body.teamname,
        password: req.body.password,
        level: req.body.level,
        type_account: "team"
    });

    Team.addTeam(newTeam, (err) => {
        if(err) {
            res.json({success: false, msg: 'Failed to register team'});
        } else {
            res.json({success: true, msg: 'Team registered'});
        }
    });
});

// Authenticate Team
router.post('/authenticateteam', (req, res, next) => {
    const teamname = req.body.teamname;
    const password = req.body.password;

    Team.getTeamByTeamname(teamname, (err, team) => {
        if(err) throw err;

        if(!team) {
            res.json({success: false, msg: 'Team not found'});
        }

        if(!team.password) {
            res.json({success: false, msg: 'Team not found'});
        }

        Team.comparePassword(password, team.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwy.sign(team,config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT ' +token,
                    team: {
                        id: team._id,
                        sport_name: team.sport_name,
                        teamname: team.teamname,
                        type_account: team.type_account
                    }
                });
            } else {
                res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

// Register Personal User
router.post('/register', (req, res, next) => {
    "use strict";
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        is_instructor: req.body.is_instructor,
        sports_prof: req.body.sports_prof,
        type_account: "user"
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
    console.log("USER" + req.user);
    res.json({user: req.user});
});


router.get('/teamprofile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({team: req.user});
});

// Update Profile
router.post('/editprofile', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    User.updateUser(req.body, (err) => {
        if(err) {
            res.json({success: false, msg: 'Failed to update user'});
        } else {
            res.json({success: true, msg: 'User updated'});
        }
    });
});

// Update Team Profile
router.post('/editteamprofile', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    Team.updateTeam(req.body, (err) => {
        if(err) {
            res.json({success: false, msg: 'Failed to update team'});
        } else {
            res.json({success: true, msg: 'Team updated'});
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


//Search Instructors
router.post('/instructors', (req, res, next) => {
    console.log(req.body);
    User.findInstructorsBySearch(req.body, (err, users) => {
        if(err) {
            res.json({success: false, msg: 'Something went wrong in search.'});
        } else {
            res.json({success:true, users: users});
        }
    });
});

router.post('/opponentteam', (req, res, next) => {
    console.log(req.body);
    Team.findOpponentBySearch(req.body, (err, users) => {
        if(err) {
            res.json({success: false, msg: 'Something went wrong in search.'});
        } else {
            res.json({success:true, users: users});
        }
    });
});



module.exports = router;