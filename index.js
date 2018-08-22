
var musicAudio = e('#music-audio')

// 进度条随着音乐播放进度移动
var progressMove = function() {
    // var musicAudio = e('musicAudio')
    var progress = e('#j-progress-main')
    var progressBtn = e('#j-progress-btn')
    var percentNum = Math.floor((musicAudio.currentTime / musicAudio.duration) * 10000 /100) + '%'
    log('percentNum', percentNum)
    progress.style.width = percentNum
    progressBtn.style.left = percentNum
    if (percentNum == '100%' && !musicAudio.loop) {
        getSong()
    }
}
var progressTimer = setInterval(progressMove, 300)

// 进度条控制音乐播放-- to debug
var progressControl = function() {
    var progress = e('.j-progress')
    var progressBtn = e('#j-progress-btn')
    var progressMain = e('#j-progress-main')
    bindEvent(progressBtn, 'touchstart', function() {
        clearInterval(progressTimer)
    })
    // touchmove 事件
    bindEvent(progressBtn, 'touchmove', function(e) {
        log('e is', e)
        var percentNum = (e.targetTouches[0].pageX - progress.offsetLeft) / progress.offsetWidth
        if (percentNum > 1) {
            percentNum = 1
       } else if (percentNum < 0) {
            percentNum = 0
       }
       this.style.left = percentNum * 100 + '%'
       progressMain.style.width = percentNum * 100 + '%'  
    })
    // touchend 事件
    bindEvent(progressBtn, 'touchend', function(e) {
        log(898989)
        var percentNum = (e.changedTouches[0].pageX - progress.offsetLeft) / progress.offsetWidth;
        musicAudio.currentTime = musicAudio.duration * percentNum
        progressTimer = setInterval(progressMove, 300)
    })
}
progressControl()


//播放暂停按钮事件
var playPause = function() {
    // var musicAudio = e('#music-audio')
    var playBtn = e('.play')
    var songCover = e('.img-cover')
    bindEvent(playBtn, 'click', function() {
        if (musicAudio.paused) {
            musicAudio.play()
            removeClassAll('icon-bofang')
            playBtn.classList.add('icon-zanting')
            songCover.classList.add('rotate')
            var progressTimer = setInterval(progressMove, 300)
        } else {
            musicAudio.pause()
            removeClassAll('icon-zanting')
            playBtn.classList.add('icon-bofang')
            songCover.classList.remove('rotate')
        }
    })
}
playPause()

// 随机or 单曲循环
var randomLoop = function() {
    // var musicAudio = e('#music-audio')
    var randomBtn = e('.random')
    bindEvent(randomBtn, 'click', function() {
        if (musicAudio.loop) {
            musicAudio.loop = false
            removeClassAll('icon-danquxunhuan')
            randomBtn.classList.add('icon-suiji')

        } else {
            musicAudio.loop = true
            removeClassAll('icon-suiji')
            randomBtn.classList.add('icon-danquxunhuan')
        }
    })
}
randomLoop()
// 下一首歌
var nextSong = function() {
    var nextBtn = e('.icon-xiayishou')
    bindEvent(nextBtn, 'click', function() {
        getSong()
        // var progressTimer = setInterval(progressMove, 300)
    })
}
nextSong()

var ajax = function(method, path, responseCallback) {
    var r = new XMLHttpRequest()
    // 设置请求方法和请求地址
    r.open(method, path, true)
    // 设置发送的数据的格式
    // r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
    // 注册响应函数
    r.onreadystatechange = function() {
        if(r.readyState === 4) {
            responseCallback(r)
        }
        // if (r.readyState === 4) {
        //     console.log('state change', r, r.status, r.response)
        //     var response = JSON.parse(r.response)
        //     console.log('response', response)
        // } else {
        //     console.log('change')
        // }
    }
    // 发送请求
    r.send()
}

var getSong = function() {
    var url = 'http://api.jirengu.com/fm/getSong.php'
    var path = url + '?' + 'channel=' + randomChannelNum
    ajax('GET', path, function(r){
        // var musicAudio = e('#music-audio')
        var musicImg = e('.img-cover')
        log('musicImg', musicImg)
        var response = JSON.parse(r.response)
        log('response', response)
        var responseContext = response.song[0]
        var picUrl = responseContext.picture
        var title = responseContext.title
        var singer = responseContext.artist
        log('title', typeof(title))
        var musicUrl = responseContext.url
        var titleDom = e('#id-h1')
        var singerDiv = e('.singer')
        var bg = e('.bg img')
        musicAudio.dataset.ssid = responseContext.ssid
        musicAudio.dataset.sid = responseContext.sid
        // log('data-sid is ', data-sid)
        titleDom.innerText = title
        singerDiv.innerText = singer
        bg.src = picUrl
        // musicAudio.crossOrigin = 'anonymous'
        // musicAudio.setAttribute('crossorigin', 'anonymous')
        musicAudio.src = musicUrl
        musicImg.src = picUrl
        log(musicAudio)
        musicAudio.setAttribute('data-sid', responseContext.sid)
        musicAudio.play()
    })
}
getSong()

// ajax 获得 channel
var getChannel = function() {
    ajax('GET', 'http://api.jirengu.com/fm/getChannels.php', function(r){
        var musicChannel = e('.icon-channel')
        var channel = e('.channel')
        var response = JSON.parse(r.response)
        log('response', response)
        var responseChannelArr = response.channels
        log(responseChannelArr)
        getRandomChannel(responseChannelArr)
        log('channel name is', responseChannelArr[randomChannelNum].name)
        channel.innerText = responseChannelArr[randomChannelNum].name
        channel.dataset.id = responseChannelArr[randomChannelNum].channel_id
        log('channel-id is', channel.dataset.id)
        getSong()
    })
}
getChannel()

// 获取随机频道的index
var randomChannelNum = new Number()
var getRandomChannel = function(responseChannelArr) {
    var randomNum = Math.floor(Math.random() * responseChannelArr.length)
    randomChannelNum = randomNum
    log('randomChannelNum is', randomChannelNum)
}

var changeChannel = function() {
    var channelBtn = e('.icon-changpian')
    bindEvent(channelBtn, 'click', function() {
        getChannel()
        // randomChannelNum()
    })
}
changeChannel()


// 获取歌词

var getLyric = function() {
    var sid = musicAudio.getAttribute('data-sid')
    ajax('get', 'http://api.jirengu.com/fm/getLyric.php', function(r){

    })
}
getLyric()










