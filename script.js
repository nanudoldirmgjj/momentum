const PS = document.getElementById('play');
const audio = document.querySelector('audio');
const prevSong = document.getElementById('playPrev');
const nextSong = document.getElementById('playNext');
const liList = document.querySelectorAll('li');
const songList = [
    'http://music.arizona-rp.com/rodina/1675292469.mp3',
    'http://music.arizona-rp.com/rodina/1675293281.mp3',
    'http://music.arizona-rp.com/rodina/1675293306.mp3',
    'http://music.arizona-rp.com/rodina/1675293310.mp3',
];

function liLight () {
    liList.forEach(Element => Element.classList.remove('active-li'));
    let songIndex = (songList.indexOf(audio.src));
    liList[songIndex].classList.add('active-li');
}
function playMusic() {
    if (!audio.classList.contains('playing')) {
        // audio.currentTime = 0;
        PS.children[0].src = "stls/music_imgs/pause.svg";
        audio.play();
        audio.classList.add('playing');

        for (let i = 0; i < songList.length; i++) {
            if (songList[i] == audio.src) {
            }
        }

    } else {
        audio.pause();
        audio.classList.remove('playing');
        PS.children[0].src = "stls/music_imgs/play.svg";
    }
    liLight();
}



function playPrev() {

    let songIndex = (songList.indexOf(audio.src));
    if(songIndex > 0)
    audio.src = songList[songIndex - 1];
    else audio.src = songList[3];

    let a = audio.play();
    if (a !== undefined) {
        a.then(_ => {
        })
            .catch(error => {
            });
    }
    liLight();

}


function playNext() {
    let songIndex = (songList.indexOf(audio.src));
    if(songIndex < 3)
    audio.src = songList[++songIndex];
    else audio.src = songList[0];

    let a = audio.play();
    if (a !== undefined) {
        a.then(_ => {
        })
            .catch(error => {
            });
    }
    liLight();

}



PS.addEventListener('click', playMusic);
prevSong.addEventListener('click', playPrev);
nextSong.addEventListener('click', playNext);