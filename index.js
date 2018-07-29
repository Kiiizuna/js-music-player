
// 发送ajax 获取数据
// 处理数据控制页面

//播放暂停按钮事件
var playPause = function() {
    var musicAudio = e('#music-audio')
    var playBtn = e('.play')
    bindEvent(playBtn, 'click', function() {
        if (musicAudio.paused) {
            musicAudio.play()
            removeClassAll('icon-bofang')
            playBtn.classList.add('icon-zanting')
        } else {
            musicAudio.pause()
            removeClassAll('icon-zanting')
            playBtn.classList.add('icon-bofang')
        }
    })
}
playPause()

// 随机or 单曲循环
var randomLoop = function() {
    var musicAudio = e('#music-audio')
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
        var musicAudio = e('#music-audio')
        var response = JSON.parse(r.response)
        log('response', response)
        var responseContext = response.song[0]
        var picUrl = responseContext.picture
        var title = responseContext.title
        log('title', typeof(title))
        var musicUrl = responseContext.url
        var titleDom = e('#id-h1')
        titleDom.innerText = title
        // musicAudio.crossOrigin = 'anonymous'
        // musicAudio.setAttribute('crossorigin', 'anonymous')
        musicAudio.src = musicUrl
        log(musicAudio)
        musicAudio.setAttribute('data-sid', responseContext.sid)
        musicAudio.play()

        var progressMove = function() {
        var progress = e('#j-progress-main')
        var percentNum = Math.floor((musicAudio.currentTime / musicAudio.duration) * 10000 /100) + '%'
        log(111111, musicAudio.duration)
        log('percentNum', percentNum)
        progress.style.width = percentNum
    }
        var progressTimer = setInterval(progressMove(), 300)
    })
}
getSong()

// ajax 获得channel
var getChannel = function() {
    ajax('GET', 'http://api.jirengu.com/fm/getChannels.php', function(r){
        var musicChannel = e('.icon-channel')
        var response = JSON.parse(r.response)
        log('response', response)
        var responseChannelArr = response.channels
        log(responseChannelArr)
        getRandomChannel(responseChannelArr)
        log('channel name is', responseChannelArr[randomChannelNum].name)
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
    var channelBtn = e('.icon-channel')
    bindEvent(channelBtn, 'click', function() {
        getChannel()
        randomChannelNum()
    })
}
changeChannel()

// 进度条
var progressMove = function() {
    var musicAudio = e('musicAudio')
    var progress = e('#j-progress-main')
    var percentNum = Math.floor((musicAudio.currentTime / musicAudio.duration) * 10000 /100) + '%'
    log('percentNum', percentNum)
    progress.width.style = percentNum
}
var progressTimer = setInterval(progressMove(), 300)




