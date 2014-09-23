// 在console里运行，自动保存音乐信息
var current = 0,
    res = [];
setTimeout(function () {
    if ($('.page_links a')[$('.page_links a').length - 1].innerHTML === '&gt;') {
        console.log(123);
        getInfo();
        $('.page_links a')[$('.page_links a').length - 1].click();
        setTimeout(arguments.callee, 1000);
    }
    current++;

    function getInfo () {
        $('.song_info').each(function (index) {
            var music = {};
            music.title = $(this).find('.song_title').html();
            music.author = $(this).find('.performer').html();
            music.track = $(this).find('.source a').html()
            music.id = $(this).find('.icon').attr('href').match(/(\d+)\/$/)[1];
            res.push(music);
        });
    }
}, 1000);
