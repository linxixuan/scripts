var Music = require('../models/music'),
    spawn = require('child_process').spawn,
    mongoose = require('mongoose');

Music = mongoose.model('Music');
mongoose.connect('mongodb://localhost/zmx');
var updateLen = 0,
    len;

Music.find({id: ""}).exec(function (err, musics) {
    len = musics.length;
    for(var i = 0; i < len; i+=2) {
        var ms = musics.slice(i, i+2);
        task(ms, i);
    }

    (function cal() {
        if (updateLen < len) {
            setTimeout(function () {cal();}, 200);
        } else {
            console.log('update is done!');
            process.kill();
        }
    })();
});

/**
 * 给一个音乐数组
 */
function task(msArr, index) {
    setTimeout(function () {
        console.log('开始任务了');
        console.log('当前更新数：' + updateLen);
        console.log('总数：' + len);
        console.log('还剩：' + (len - updateLen));
        for (var ii = 0; ii < msArr.length; ii++) {
            (function (j) {
                var m = msArr[j];
                var ms = m['title'] + ' - ' + m['author'];
                spawn('casperjs', ['scripts/grabMusic.js', '--ms=' + ms]).stdout.on('data', function (data) {
                    data = data.toString().trim();
                    console.log(data);
                    if (data.indexOf('music id is') !== -1) {
                        var id = data.match(/\d+/)[0];
                        console.log('我知道id了');
                        Music.update({title: m['title'], author: m['author']}, {id: id}).exec();
                        updateLen++;
                    }
                });
            })(ii);
        }
    }, index * 1000 * 10);
}
