(function(){
    'use strict';
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/chat');

    var User = mongoose.model('User', { user: String, pass: String });
    var Message = mongoose.model('Message', {from: String, to: String, text: String});

    exports.registerUser = function (user) {
        var newUser = new User({user: user.user, pass: user.pass});
        newUser.save(function(err){
            if(err){
                console.log(error);
            } else {
                console.log('User ' + user.user + ' added to db');
            }
        });
    }

    exports.sendMessage = function (message) {
        var newMessage = new Message({from: message.from, to: message.to, text: message.text});
        newMessage.save(function(err){
            if(err){
                console.log(error);
            } else {
                console.log(message.from + ' said ' + message.text + ' to ' + message.to);
            }
        });
    }

    exports.getMessages = function (message) {
        Message.find()
            .or([{from: message.with, to: message.and},
                {from: message.and, to: message.with}])
            .exec(function (err, results) {
                if(err){
                    console.log(err)
                } else{
                    console.log(results);
                }
            });
    }
}())

