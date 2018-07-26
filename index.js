
// 发送ajax 获取数据
// 处理数据控制页面

var musicAudio = e('#music-audio')
var playBtn = e('.icon-bofang')
bindEvent(playBtn, 'click', function() {
    musicAudio.play()
})

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
function getMusic() {
    ajax('GET', 'http://api.jirengu.com/fm/getSong.php', function(r){
        // console.log(r.status, book)
        var response = JSON.parse(r.response)
        log('response', response)
        var responseContext = response.song[0]
        var picUrl = responseContext.picture
        var title = responseContext.title
        log('title', typeof(title))
        var musicUrl = responseContext.url
        // var imgUrl = book.image
        // var body = document.querySelector('body')
        // var img = `
        //     <img src=${imgUrl}>
        // `
        // body.insertAdjacentHTML('beforeend', img)
        var titleDom = e('#id-h1')
        titleDom.innerText = title
        // musicAudio.crossOrigin = 'anonymous'
        // musicAudio.setAttribute('crossorigin', 'anonymous')
        musicAudio.src = musicUrl
        log(musicAudio)
        musicAudio.setAttribute('data-sid', responseContext.sid)
        musicAudio.play()
    })
}
getMusic()

// function getMusic () {
//         ajax({
//             method: 'GET',
//             url: 'http://api.jirengu.com/fm/getSong.php',
//             // data: {
//             //     "channel": channel.getAttribute("data-channel-id")
//             // },
//             success: function (response) {
//                 var jsonObj = JSON.parse(response);
//                 var songObj = jsonObj['song'][0];
//                 log(songObj)
//                 // songTitle.innerHTML = songObj.title;
//                 // singer.innerHTML = songObj.artist;
//                 // recordImg.src = songObj.picture;
//                 // bigBg.src = songObj.picture;
//                 log(musicAudio)
//                 musicAudio.src = songObj.url;
//                 musicAudio.setAttribute('data-sid', songObj.sid);
//                 musicAudio.setAttribute('data-ssid', songObj.ssid);
//                 musicAudio.play();
//                 isLoading = false;
//                 // getlyric();
//                 // 解决首次进入页面时，自动播放的兼容问题，不自动播放
//                 // if (num === 1) {
//                 //     musicAudio.onplaying = function () {
//                 //         this.pause();
//                 //         musicAudio.onplaying = null;
//                 //     }
//                 //     num++;
//                 // }
//             }
//         })
//     }
// getMusic()