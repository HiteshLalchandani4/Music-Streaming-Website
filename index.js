let songsList = document.getElementById("songs-list");
let str = "";


const songId =
{
    1: "Chahun Main Ya Naa",
    2: "Chale Aana",
    3: "Dil Ibaadat",
    4: "Dil Kyun Yeh Mera",
    5: "Duniyaa",
    6: "Haan Tu Hain",
    7: "Hale Dil",
    8: "Hawayein",
    9: "Jashn E Bahaara",
    10: "Jogi",
    11: "Kabhi Kabhi Aditi Zindagi",
    12: "Naino Ne Baandhi",
    13: "Nayan",
    14: "Nazm Nazm",
    15: "Pee Loon",
    16: "Raataan Lambiyan",
    17: "Ranjha",
    18: "Roke Na Ruke Naina",
    19: "Sajde",
    20: "Soch Na Sake",
    21: "Tarasti Hai Nigahen",
    22: "Tere Bina",
    23: "Tu Banja Gali Banaras Ki",
    24: "Tu Hi Haqeeqat",
    25: "Tu Hi Meri Shab Hai",
    26: "Tujhe Sochta Hoon",
    27: "Tum Hi Ho",
    28: "Tum Mile",
    29: "Tum Se Hi",
    30: "Zara Sa",
    31: "Zehnaseeb",
    32: "Ajj Din Chadheya",
    33: "Aye Khuda",
    34: "Baari",
    35: "Baatein Ye Kabhi Na"
}
let arr = [];
function randomSong() {
    let ran = Math.floor((Math.random() * 35) + 1);
    let flag = 0;
    // console.log(i+" "+ran);
    let len = arr.length;
    for (let j = 1; j < len; j++) {
        // console.log(i+" "+ran+" "+j);
        if (arr[j] == ran) {
            flag = 1;
            // console.log(i+" "+ran+" "+j+" same ");
            break;
        }
    }
    if (flag == 1) {
        // console.log(i+" "+ran);
        ran = randomSong();
    }
    return ran;
}
for (let i = 1; i <= 6; i++) {
    arr[i] = randomSong();
}
console.log(arr);

function changeSongList() {
    str = "";
    for (let i = 2; i <= 6; i++) {
        // let imgStr = `${songId[ran]}.jpg`;
        // console.log(imgStr);
        str += `<li class="right-li" onclick="newSong(${i})"><img src="images/${songId[arr[i]]}.jpg" alt="img" >${songId[arr[i]]}</li>`;
    }
    songsList.innerHTML = str;
}

changeSongList();

let bottomLeft = document.getElementById("bottom-left");
bottomLeft.innerHTML = `${songId[arr[1]]}`;
// let imgNrc = "kesariya.jpg";
// console.log("images/"+songId[arr[1]]+".jpg");
// console.log(imgSrc);
// console.log(encodeURI(imgSrc));
// screen.style.backgroundImage = 'url(' + imgFrc + ')';
// const screen = document.querySelector('.screen');
let imgSrc = "images/" + songId[arr[1]] + ".jpg";
let imgFrc = encodeURI(imgSrc);
// screen.style.cssText += 'background-image: linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.9)),url(' + imgFrc + ')';
document.body.style.cssText += 'background-image: linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(' + imgFrc + ')';


// let frontClass = document.getElementsByClassName("frclass");
// frontClass[0].innerHTML = `<img src="images/${songId[arr[1]]}.jpg" alt="img">`;

let audioElement = new Audio(`songs/${songId[arr[1]]}.mp3`);

let bottomRight = document.getElementById("bottom-right");
let curTime = audioElement.currentTime;
// let totalTime = audioElement.duration;
let totalTime;
let minTotal;
let secTotal;
let progress;
let progressBar = document.getElementById("progressBar");

function updateAll() {
    audioElement.addEventListener('timeupdate', () => {
        curTime = audioElement.currentTime;
        let min = Math.floor(curTime / 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
        let sec = Math.floor(curTime % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
        bottomRight.innerHTML = `${min}:${sec} / ${minTotal}:${secTotal}`;

        progress = (curTime / totalTime) * 100;

        // console.log(progress+" "+arr[1]);
        progressBar.value = progress;
        if (curTime >= totalTime) {
            // console.log('next song please');
            for (let i = 2; i <= 6; i++) {
                arr[i - 1] = arr[i];
            }
            arr[6] = randomSong();
            audioElement = new Audio(`songs/${songId[arr[1]]}.mp3`);
            audioElement.addEventListener('loadedmetadata', () => {
                audioElement.play();
                // console.log("second metadata");
            });
            bottomLeft.innerHTML = `${songId[arr[1]]}`;
            if (playBtn.className.includes('fa-play')) {
                // console.log('just checking');
                playBtn.classList.remove('fa-play');
                playBtn.classList.add('fa-pause');
            }
            changeSongList();
            updateAll();
            let imgSrc = "images/" + songId[arr[1]] + ".jpg";
            let imgFrc = encodeURI(imgSrc);
            // screen.style.cssText += 'background-image: linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.9)),url(' + imgFrc + ')';
            document.body.style.cssText += 'background-image: linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(' + imgFrc + ')';

        }

    });

    audioElement.addEventListener('loadedmetadata', () => {
        totalTime = audioElement.duration;
        minTotal = Math.floor(totalTime / 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
        secTotal = Math.floor(totalTime % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
        // console.log(minTotal+" "+secTotal+" first loadedmetadata");
        // console.log(min+" : "+sec);
        bottomRight.innerHTML = `00:00 / ${minTotal}:${secTotal}`;
    });

    progressBar.addEventListener('change', () => {
        let changedValue = (progressBar.value * totalTime) / 100;
        // console.log(changedValue + " value");
        audioElement.currentTime = changedValue;
        curTime = changedValue;

    });
}
updateAll();
// $(audioElement).on('loadedmetadata',()=>
// {

// });
// console.log(totalTime);
// bottomRight.innerHTML = `${songId[arr[1]]}`;

let playBtn = document.getElementById("play-btn");
playBtn.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime == 0) {
        audioElement.play();
        playBtn.classList.remove('fa-play');
        playBtn.classList.add('fa-pause');
    }
    else {
        audioElement.pause();
        playBtn.classList.remove('fa-pause');
        playBtn.classList.add('fa-play');
    }
});

let nextBtn = document.getElementById("next-btn");
nextBtn.addEventListener('click', () => {
    for (let i = 2; i <= 6; i++) {
        arr[i - 1] = arr[i];
    }
    arr[6] = randomSong();
    if (playBtn.className.includes('fa-pause')) {
        audioElement.pause();
    }
    audioElement = new Audio(`songs/${songId[arr[1]]}.mp3`);
    if (playBtn.className.includes('fa-play')) {
        // console.log('just checking');
        playBtn.classList.remove('fa-play');
        playBtn.classList.add('fa-pause');
    }
    audioElement.addEventListener('loadedmetadata', () => {
        audioElement.play();
        // console.log("second metadata");
    });

    bottomLeft.innerHTML = `${songId[arr[1]]}`;
    changeSongList();
    updateAll();
    // const screen = document.querySelector('.screen');
    let imgSrc = "images/" + songId[arr[1]] + ".jpg";
    let imgFrc = encodeURI(imgSrc);
    // screen.style.cssText += 'background-image: linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.9)),url(' + imgFrc + ')';
    document.body.style.cssText += 'background-image: linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(' + imgFrc + ')';

});

function newSong(newId) {
    arr[1] = arr[newId];
    for (let i = newId + 1; i <= 6; i++) {
        arr[i - 1] = arr[i];
    }
    arr[6] = randomSong();
    if (playBtn.className.includes('fa-pause')) {
        audioElement.pause();
    }
    audioElement = new Audio(`songs/${songId[arr[1]]}.mp3`);
    if (playBtn.className.includes('fa-play')) {
        // console.log('just checking');
        playBtn.classList.remove('fa-play');
        playBtn.classList.add('fa-pause');
    }
    audioElement.addEventListener('loadedmetadata', () => {
        audioElement.play();
        // console.log("second metadata");
    });

    bottomLeft.innerHTML = `${songId[arr[1]]}`;
    changeSongList();
    updateAll();
    let imgSrc = "images/" + songId[arr[1]] + ".jpg";
    let imgFrc = encodeURI(imgSrc);
    // screen.style.cssText += 'background-image: linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.9)),url(' + imgFrc + ')';
    document.body.style.cssText += 'background-image: linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(' + imgFrc + ')';

}

let rightClass = document.getElementsByClassName("right-class")[0];
let check=0;

document.getElementsByClassName("ok-logo")[0].addEventListener('click',()=>
{
    if(check===0){
        rightClass.style.display = 'none';
        check=1;
    }
    else{
        rightClass.style.display = 'inline-block';
        check=0;
    }
});

console.log(arr, str);




