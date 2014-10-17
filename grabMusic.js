var casper = require('casper').create({   
    verbose: true, 
    logLevel: 'debug',
    clientScripts:  [
        'scripts/lib/jquery-1.11.1.min.js',      // These two scripts will be injected in remote
    ],
    pageSettings: {
         loadPlugins: true,         
         userAgent: 'Mozilla/5.0 (Windows NT 6.1; rv:17.0) Gecko/20100101 Firefox/17.0',
    }
});
var music = casper.cli.get('ms');
var id;
phantom.outputEncoding="utf-8";
casper.options.viewportSize = {width: 1680, height: 924};
casper.start('http://music.163.com/#/search')
.waitForSelector('#g_iframe', function () {
})
.withFrame(0, function () {
    this.sendKeys('#m-search-input', music);
    this.sendKeys('#m-search-input', casper.page.event.key.Enter);
    this.waitForSelector('.srchsongst', function () {
        this.click('.srchsongst .item .w0 a');
    })
})
.waitForSelector('#g_iframe', function () {
})
.wait(2000,function () {})
.withFrame(0, function () {
    id = this.evaluate(function () {
        return location.href.match(/id=(\d*)/)[1];
    });
    this.echo('music id is ' + id);
    this.exit();
})
.run(function () {
});
