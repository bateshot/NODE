(function () {
    'use strict';

    var express = require('express'),
        db = require('./public/db'),
        server = express(),
        port = 8001;

    // Configuration
    server.set('view engine', 'jade');
    server.set('views', './public/views/');

    //routes
    server.get('/', function (req, res) {
        res.render('home');
    });
    server.get('/smartphones', function (req, res) {
        res.render('smartphones', db);
    });
    server.get('/tablets', function (req, res) {
        res.render('tablets', db);
    });
    server.get('/wearables', function (req, res) {
        res.render('wearables', db);
    });

    server.listen(port, function(){
        console.log('server listening on port: ' + port);
    });
} ());
