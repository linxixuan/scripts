var Music = require('../models/music'),
    spawn = require('child_process').spawn,
    mongoose = require('mongoose');

Music = mongoose.model('Music');
mongoose.connect('mongodb://localhost/zmx');

Music.find({id: {$not: {$eq: ""}}, url: ""}).exec(function (err, musics) {
    for (var i = 0, len = musics.length; i < len; i+=10) {
        task(musics.slice(i, i + 10), i);
    }
});

function task(msArr, index) {
    setTimeout(function () {
        for (var i = 0, len = msArr.length; i < len; i++) {
            (function (ii) {
                var id = msArr[ii].id;
                spawn('casperjs', ['scripts/ipadMusic.js', '--id=' + id]).stdout.on('data', function (data) {
                    data = data.toString().trim();
                    console.log(data);
                    if (data.indexOf('music link is') !== -1) {
                        console.log('id is' + id);
                        console.log('第' + (index / 10 + 1) + '次了');
                        var url = data.match(/\{\{(.*)\}\}/)[1];
                        Music.update({id: id}, {url: url}).exec();
                    }
                });
            })(i);
        }
    },index * 1000 * 3);

}
