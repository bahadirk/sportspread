const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwT = require('passport-jwt').ExtractJwt;
const User = require('../models/users');
const Team = require('../models/team');
const config = require('../config/database');

module.exports = function(passport) {
    "use strict";
    let opts = {};
    opts.jwtFromRequest = ExtractJwT.fromAuthHeader();
    opts.secretOrKey = config.secret;

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        if(jwt_payload._doc.type_account === "team"){
            Team.getTeamById(jwt_payload._doc._id, (err, team) => {
                if(err) {
                    return done(err, false);
                }

                if(team) {
                    console.log(team);
                    return done(null, team);
                } else {
                    console.log("TEAM2");
                    return done(null, false);
                }
            });
        }else{
            User.getUserById(jwt_payload._doc._id, (err, user) => {
                if(err) {
                    return done(err, false);
                }

                if(user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
        }
    }));
}
