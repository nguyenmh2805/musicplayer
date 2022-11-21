const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')




const app = {
    currentIndex : 0,
    isPlaying: false,
    isRandom: false,
    songs: [
    {
        name: 'Waiting for you',
        singer: 'MONO',
        path: './music/song1.mp3',
        image: './img/img1.jpg'
    },
    {
        name: 'Em là',
        singer: 'MONO',
        path: './music/song2.mp3',
        image: './img/img2.jpg'
    },
    {
        name: 'Chuyện đôi ta',
        singer: 'Dalab',
        path: './music/song3.mp3',
        image: './img/img3.jpg'
    },
    {
        name: 'Có hẹn với thanh xuân',
        singer: 'MONSTAR',
        path: './music/song4.mp3',
        image: './img/img4.jpg'
    },
    {
        name: 'Chưa quên người yêu cũ',
        singer: 'Hà Nhi',
        path: './music/song5.mp3',
        image: './img/img5.jpg'
    },
    {
        name: 'Vì mẹ anh bắt chia tay',
        singer: 'Miu Lê x Karik x Châu Đăng Khoa',
        path: './music/song6.mp3',
        image: './img/img6.jpg'
    },
    {
        name: 'Người ta có yêu mình đâu',
        singer: 'Trúc Nhân',
        path: './music/song7.mp3',
        image: './img/img7.jpg'
    },
    {
        name: 'Sáng mắt chưa',
        singer: 'Trúc Nhân',
        path: './music/song8.mp3',
        image: './img/img8.jpg'
    }
],
    render: function(){
        const htmls = this.songs.map(song => {
            return `
            <div class="song">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('');
    },
    defineProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function(){
        const cdWidth = cd.offsetWidth

        //Xử lý CD quay/ dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ],{
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        //Xử lý phóng to thu nhỏ CD
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        //Xử lý khi click play
        playBtn.onclick = function(){
            if (app.isPlaying) {
                audio.pause()
            } else {  
                audio.play()  
            }
        }

        //Khi song được play
        audio.onplay = function(){
            app.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play();
        }

        //Khi song được pause 
        audio.onpause = function(){
            app.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause();
        }

        //Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        //Xử lý tua song
        progress.onchange = function(e){
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        //Xử lý khi next song
        nextBtn.onclick = function () {
            app.nextSong()
            audio.play()
        }

        //Xử lý khi prev song
        prevBtn.onclick = function () {
            app.prevSong()
            audio.play()
        }

        //Random bài hát
        randomBtn.onclick = function(e){
            app.isRandom = !app.isRandom
            randomBtn.classList.toggle('active', app.isRandom)
        }
    },
    loadCurrentSong: function(){
        
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path

    },
    nextSong: function() {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    start: function(){
        //Định nghĩa các thuộc tính cho object
        this.defineProperties()

        //Lắng nghe / xử lý các sự kiện (DOM events)
        this.handleEvents()

        //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()

        //Render playlist
        this.render()
    }
}

    app.start()