const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const User = require('../models/users');

const TeamSchema = mongoose.Schema({
    sport_name: {
        type: String,
        required: true
    },
    teamname: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    type_account: {
        type: String
    },
    location: {
        type: String
    },
    level: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    members:{
        User: []
    }
});

const Team = module.exports = mongoose.model('Team', TeamSchema);

module.exports.getTeamById = function(id, callback) {
    Team.findById(id, callback);
}

module.exports.addTeam = function(newTeam, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newTeam.password, salt, (err, hash) => {
            if(err) throw err;
            newTeam.password = hash;
            newTeam.save(callback);
        })
    });
}

module.exports.getTeamByTeamname = function(teamname, callback) {
    const query = {teamname: teamname};
    Team.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}


module.exports.findOpponentBySearch = function(search, callback) {
    const query = {
        location: search.location,
        sport_name: search.sport_name,
        level: search.experience
    };
    console.log(query);
    Team.find(query, callback);
}


module.exports.updateTeam = function(updatedTeam, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(updatedTeam.password, salt, (err, hash) => {
            if(err) throw err;
            updatedTeam.password = hash;
            Team.update({ "_id": updatedTeam._id }, { $set:
                {
                    teamname: updatedTeam.teamname,
                    password: updatedTeam.password,
                    location: updatedTeam.location,
                }
            }, callback);
        })
    });
}