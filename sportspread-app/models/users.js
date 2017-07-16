const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    location: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    interests:[
    {
        name:{
            type: String,
            required: true
        },
        level:{
            type: String,
            required: true
        }
    }
  ]
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.findTeammatesBySearch = function(search, callback) {
    const query = {
        location: search.location,
        interests: {
            $elemMatch: {
                name: search.sport_name,
                level: search.experience
            }
        }
    };
    console.log(query);
    User.find(query, callback);
}

module.exports.findOpponentsBySearch = function(search, callback) {
    const query = {
        location: search.location,
        interests: {
            $elemMatch: {
                name: search.sport_name,
                level: search.experience
            }
        }
    };
    console.log(query);
    User.find(query, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}

module.exports.updateUser = function(updatedUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(updatedUser.password, salt, (err, hash) => {
            if(err) throw err;
            updatedUser.password = hash;
            User.update({ "_id": updatedUser._id }, { $set:
                {
                    name: updatedUser.name,
                    username: updatedUser.username,
                    email: updatedUser.email,
                    password: updatedUser.password,
                    location: updatedUser.location,
                    interests: updatedUser.interests
                }
            }, callback);
        })
    });
}
