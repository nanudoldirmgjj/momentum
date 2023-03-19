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

function liLight() {
    liList.forEach(Element => Element.classList.remove('active-li'));
    let songIndex = (songList.indexOf(audio.src));
    liList[songIndex].classList.add('active-li');
}

function playMusic() {
    if (!audio.classList.contains('playing')) {
        PS.children[0].src = "stls/music_imgs/pause.svg";
        audio.play();
        audio.classList.add('playing');


    } else {
        audio.pause();
        audio.classList.remove('playing');
        PS.children[0].src = "stls/music_imgs/play.svg";
    }
    liLight();
}




function playPrev() {

    let songIndex = (songList.indexOf(audio.src));
    if (songIndex > 0)
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
    let songIndex = songList.indexOf(audio.src);
    if (songIndex < 3)
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

audio.addEventListener('ended', playNext);


PS.addEventListener('click', playMusic);
prevSong.addEventListener('click', playPrev);
nextSong.addEventListener('click', playNext);



const weatherImg = document.getElementById('weatherImg');
const weather = document.getElementById('weather');
const windSpeed = document.getElementById('speed');
const humidity = document.getElementById('humidity');

let o;
function getHour() {
    const ate = new Date();
    if (ate.getHours() >= 23) {
        o = 'night';
    }
    if (ate.getHours() >= 6) {
        o = 'morning';
    }
    if (ate.getHours() >= 12) {
        o = 'afternoon';
    }
    if (ate.getHours() >= 18) {
        o = 'evening';
    }
}

function getWeatherByCity(cityn) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityn}&lang=en&appid=19bc74efbd0e229bf500a5e1349e242b&units=metric`)
        .then((response) => response.json())
        .then((data) => {
            weatherImg.classList = (`owf owf-${data.weather[0].id}-d`);
            weatherImg.style.fontSize = '44px';

            weather.innerHTML = data.main.temp + '°C, ' + data.weather[0].description;

            windSpeed.innerHTML = 'wind speed: ' + data.wind.speed + 'm/s';

            humidity.innerHTML = 'humidity: ' + data.main.humidity + '%';
        })
}

const city = document.getElementById('city').addEventListener('change', (e) => {
    getWeatherByCity(e.currentTarget.value);
});

getWeatherByCity('Minsk');


const good = document.getElementById('good');

let t = document.getElementById('time');

const back = document.querySelector('.back');
function showTime() {
    getHour();
    const ate = new Date();
    const currentTime = ate.toLocaleTimeString();
    t.textContent = currentTime;
    if (ate.getHours() >= 23) {
        showDate();
    }
    good.textContent = 'Good ' + o;
    setTimeout(showTime, 1000);
}
showTime();


window.addEventListener('load', () => {
    getHour();
        back.style.backgroundImage = "url('stls/bgs/" + o + ".jpg')";

})



function showDate() {
    const date = new Date();
    const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC' };
    const currentDate = date.toLocaleDateString('en-US', options);
    let cDate = document.getElementById('date');
    cDate.textContent = options.weekDay + ', ' + currentDate.replace('.', '').slice(0, 7);

}


const name = document.getElementById('name');
function setLocalStorage() {
    localStorage.usName = name.value;
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.usName) {
        name.value = localStorage.usName;
    }
}
window.addEventListener('load', getLocalStorage)


const reload = document.getElementById('reload');

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
function reloadQuote() {
    fetch('https://type.fit/api/quotes')
        .then((Response) => Response.json())
        .then((data) => {
            let rand = Math.random() * data.length + 0;
            quote.textContent = data[Math.round(rand)].text;
            author.textContent = data[Math.round(rand)].author;
        })
}

reloadQuote();
reload.addEventListener('click', reloadQuote);


const bgsList = [
    'url("stls/bgs/night.jpg")',
    'url("stls/bgs/morning.jpg")',
    'url("stls/bgs/afternoon.jpg")',
    'url("stls/bgs/evening.jpg")',
]

const next = document.getElementById('next');
const prev = document.getElementById('prev');

next.addEventListener('click', () => {
    let c;
    for (let i = 0; i < bgsList.length; i++) {
        if (back.style.backgroundImage == bgsList[i]) {
            c = i;
        }
    }
    if (c < 3) {
        back.style.backgroundImage = bgsList[c + 1];
    }
    if (c == 3) back.style.backgroundImage = bgsList[0];
})

prev.addEventListener('click', () => {
    let c;
    for (let i = 0; i < bgsList.length; i++) {
        if (back.style.backgroundImage == bgsList[i]) {
            c = i;
        }
    }
    if (c <= 3) {
        back.style.backgroundImage = bgsList[c - 1];
    }
    if (c == 0) back.style.backgroundImage = bgsList[3];
})
