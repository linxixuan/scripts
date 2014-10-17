var Music = require('./models/music'),
    mongoose = require('mongoose'),
    path = require('path'),
    fs = require('fs');

mongoose.connect('mongodb://localhost/zmx');
var dir = path.resolve(__dirname, '.'),
    Music = mongoose.model('Music');

fs.readFile(dir + '/webroot/music.txt', function (err, mu) {
    var musicArr = JSON.parse(mu.toString()),
        instance;

    for (var i = 0, len = musicArr.length; i < len; i++) {
        instance = new Music({
            title: musicArr[i].title,
            author: musicArr[i].author,
            track: musicArr[i].track,
            url: '',
            id: ''
        });

        console.log(i);
        instance.save();
    }
});
