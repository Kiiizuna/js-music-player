
// 发送ajax 获取数据
// 处理数据控制页面

var ajax = function(method, path, headers, data, responseCallback) {
    var r = new XMLHttpRequest()
    // 设置请求方法和请求地址
    r.open(method, path, true)
    // 设置发送的数据的格式
    // r.setRequestHeader('Content-Type', 'application/json')
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
    r.send(data)
}

ajax('GET', 'http://api.jirengu.com/fm/getSong.php', null, '', function(r){
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
    var musicAudio = e('#music-audio')
    var titleDom = e('#id-h1')
    titleDom.innerText = title
    musicAudio.src = musicUrl
    
    musicAudio.crossOrigin = 'anonymous'
    musicAudio.play()
})