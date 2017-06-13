var User = require('../models/user')
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/sportspread');

var users = [
    new User({
        username :  'bahadir',
        password :  '123'
    }),
    new User({
        username :  'burak',
        password :  '456'
    }),
];

var done = 0;
for(var i = 0; i<users.length; i++){
    users[i].save(function(err, result){
        done++;
        if(done == users.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}