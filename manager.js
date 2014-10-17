var Music = require('../models/music'),
    cp = require('child_process'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/zmx');
Music = mongoose.model('Music');
Music.find({}).exec(function (err, musics) {
    musics = musics.slice(0, 10);
    for(var current = 0, sum = musics.length; current < sum; current+=2) {
        setTimeout(function () {
            console.log('开始计划');
            cp.fork('scripts/update.js', [current]);
        }, current * 1000 * 60);
    }
});
