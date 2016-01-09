(function(){
    'use strict';
    var chatDb = require('./chat-db.js');
    //inserts a new user records into the DB
    chatDb.registerUser({user: 'DonchoMinkov', pass: '123456q'});
    chatDb.registerUser({user: 'PeshoGoshov', pass: '1qaz2wsx'});
    //inserts a new message record into the DB
    //the message has two references to users (from and to)
    chatDb.sendMessage({
        from: 'DonchoMinkov',
        to: 'NikolayKostov',
        text: 'Hey, Niki!'
    });
    chatDb.sendMessage({
        from: 'NikolayKostov',
        to: 'DonchoMinkov',
        text: 'Hey, Doncho!'
    });
        chatDb.sendMessage({
        from: 'PeshoGoshov',
        to: 'DonchoMinkov',
        text: 'Hey, Doncho! I am Pesho!'
    });
    //returns an array with all messages between two users
    chatDb.getMessages({
        with: 'DonchoMinkov',
        and: 'NikolayKostov'
    });
}())
