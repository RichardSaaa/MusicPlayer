// Vamos selecionar todas as tags ou elementos necessários.

const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = wrapper.querySelector(".progress-bar"),
musicList = wrapper.querySelector(".music-list"),
showMoreBtn = wrapper.querySelector("#more-music"),
hideMusicBtn = musicList.querySelector("#close");


let musicIndex = 2;

window.addEventListener("load", ()=> {
    loadMusic(musicIndex);
    playingSong();
});

//Função carregar música

function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `${allMusic[indexNumb - 1].img}`;
    mainAudio.src= `${allMusic[indexNumb - 1].src}`;
}

//Função de tocar música
function playMusic(){
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = ("play_arrow");
    mainAudio.pause();
}

function nextMusic() {
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

function prevMusic() {
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex; 
    loadMusic(musicIndex);
    playMusic();
}

//Evento de botão de reprodução ou música
playPauseBtn.addEventListener("click", ()=>{
    const isMusicPaused = wrapper.classList.contains("paused");
    //se isMusicPaused for verdadeiro(true) então chame pauseMusic se não call
    isMusicPaused ? pauseMusic() : playMusic();
});

nextBtn.addEventListener("click", ()=>{
    nextMusic(); //Calling next music function = chamando a próxima função

});

prevBtn.addEventListener("click", ()=>{
    prevMusic(); //Calling prev music function = chamando a função de música anterior
});

//update progress bar width acccording to music current time = atualizar a largura da barra de progresso de acordo com a hora atual da música
mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime; //getting current time of song = obtendo o tempo atual da música
    const duration = e.target.duration; // getting total duration of song = obtendo a duração total da música
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

        let musicCurrentTime = wrapper.querySelector(".current"),
        musicDuration = wrapper.querySelector(".duration");

        mainAudio.addEventListener("loadeddata", ()=>{
        //update song total duration = atualizar duração total da música
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10) { //adding a if sec less than 10 = adicionando um SE sec menor que 10
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });
    //update song total current time = atualizar o tempo atual total da música
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10) { //adding a if sec less than 10 = dicionando um SE sec menor que 10
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e)=> {
    let progressWidthval = progressArea.clientWidth;     
    let clickedOffSetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
    playMusic();
});

const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", ()=> {

    let getText = repeatBtn.innerText;

    switch(getText){ 
        case "repeat": //if this icon is repeat then simply we call the nextMusic function so th next song will paly 
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one": // if icon is repeat_one then we'll change the current playing song current time to 0 so song will play from beggining
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffle");
            break;
        case "shuffle": // if icon is shuffle then change
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            break;
        }
});

mainAudio.addEventListener("ended", ()=>{
    let getText = repeatBtn.innerText;

    switch(getText){
        case "repeat": //if this icon is repeat then simply we call the nextMusic function so th next song will paly 
            nextMusic();
            break;
        case "repeat_one": // if icon is repeat_one then we'll change the current playing song current time to 0 so song will play from beggining
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle": // if icon is shuffle then change
            let randIndex = Math.floor((math.random() * allMusic.length) + 1);
            do {
                randIndex = Math.floor((math.random() * allMusic.length) + 1);
            }while(musicIndex = randIndex);
            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
            break;
        }
});

showMoreBtn.addEventListener("click", ()=>{
    musicList.classList.toggle("show");
});

hideMusicBtn.addEventListener("click", ()=>{
    showMoreBtn.click();
});

const ulTag = wrapper.querySelector("ul");
//let's create LI according to the array length = vamos criar LI de acordo com o comprimento do array

for (let i = 0; i < allMusic.length; i++) {
    //let's pass the song name, artist from the array to li = vamos passar o nome da música, artista do array para li
    let liTag = `<li>
                    <div class="row">
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].artist}</p>
                    </div>
                    <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}"></audio>
                    <span id="" class="audio-duration">3:40</span>
                </li>`;

    ulTag.insertAdjacentHTML("beforeend", liTag);
}   
    /*
        let liAudioDurationTag = ulTag.querySelector(`#${allMusic[i].src}`);
        let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
        liAudioTag.addEventListener("loadeddata", ()=>{
            let duration = liAudioTag.duration;
            let totalMin = Math.floor(duration / 60);
            let totalSec = Math.floor(duration % 60);
            if(totalSec < 10){  
            totalSec = `0${totalSec}`;
            };
            liAudioDurationTag.innerText = `${totalMin}:${totalSec}`;  
            //liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);  
        });

    }
    */
    
    const allLiTags = ulTag.querySelector("li");
    for (let j = 0; j < allLiTags.length; j++) {
        allLiTags[j].setAttribute("onclick", "clicked(this)");
    }
    
    