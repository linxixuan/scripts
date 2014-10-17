var casper = require('casper').create({   
    verbose: true, 
    logLevel: 'debug',
    clientScripts:  [
        'scripts/lib/jquery-1.11.1.min.js',      // These two scripts will be injected in remote
    ],
    pageSettings: {
         loadPlugins: true,         
         userAgent: 'Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10',
    }
});
phantom.outputEncoding="utf-8";
casper.options.viewportSize = {width: 1024, height: 768};
var id = casper.cli.get('id');
casper.start('http://music.163.com/m/song/' + id)
.waitForSelector('#detailBox', function () {
})
.wait(2000, function () {
    var wsurl = 'http://music.163.com/api/song/detail/?id=' + 'id' + '&ids=%5B' + id + '%5D';
    var music = this.evaluate(function(wsurl) {
        try {
            return JSON.parse(__utils__.sendAJAX(wsurl, 'GET', null, false)).songs[0].mp3Url;
        } catch (e) {
        }
    }, {wsurl: wsurl});
    this.echo('music link is {{' + music + '}}');
    //this.download(music, 'test.mp3');
})
.run();
