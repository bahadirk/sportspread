const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const User = require('../models/user');

const TeamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type_account: {
        type: String,
        required: true
    },
    teamname: {
        type: String
    },
    type_account: {
        type: String,
        required: true
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
    members:[User]
});

const Team = module.exports = mongoose.model('Team', TeamSchema);

module.exports.addTeam = function(newTeam, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newTeam.password, salt, (err, hash) => {
            if(err) throw err;
            newTeam.password = hash;
            newTeam.save(callback);
        })
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}

module.exports.updateTeam = function(updatedTeam, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(updatedTeam.password, salt, (err, hash) => {
            if(err) throw err;
            updatedTeam.password = hash;
            Team.update({ "_id": updatedTeam._id }, { $set:
                {
                    name: updatedTeam.name,
                    teamname: updatedTeam.teamname,
                    password: updatedTeam.password,
                    location: updatedTeam.location,
                    members: updatedTeam.members
                }
            }, callback);
        })
    });
}