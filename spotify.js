let data = {
    "playlists": [
      {
        "id": "playlist1",
        "name": "Playlist 1",
        "coverImage": "",
        "liked": false
      },
      {
        "id": "playlist2",
        "name": "Playlist 2",
        "coverImage": "",
        "liked": false
      }
    ],
    "songs": [
      {
        "name": "Trending Nakhra",
        "coverImage": "",
        "url": "Trending Nakhra - Amrit Maan (DJJOhAL.Com).mp3",
        "playlistId": "playlist1",
        "liked": false
      },
      {
        "name": "Youth",
        "coverImage": "",
        "url": "Youth - Mankirt Aulakh (DJJOhAL.Com).mp3",
        "playlistId": "playlist2",
        "liked": false
      },
      {
        "name": "Gangster Jatt",
        "coverImage": "",
        "url": "Gangster Jatt - Sidhu Moose Wala (DJJOhAL.Com).mp3",
        "playlistId": "playlist1",
        "liked": false
      },
      {
        "name": "Cute Munda",
        "coverImage": "",
        "url": "Cute Munda - Sharry Mann (DJJOhAL.Com).mp3",
        "playlistId": "playlist2",
        "liked": false
      },
      {
        "name": "Countrysiders Turbanator",
        "coverImage": "",
        "url": "Countrysiders Turbanator - Tarsem Jassar (DJJOhAL.Com).mp3",
        "playlistId": "playlist1",
        "liked": false
      },
      {
        "name": "Ban Ja Rani Remix",
        "coverImage": "",
        "url": "Ban Ja Rani Remix - Guru Randhawa (DJJOhAL.Com).mp3",
        "playlistId": "playlist2",
        "liked": false
      },
      {
        "name": "Daaru Band",
        "coverImage": "",
        "url": "Daaru Band - Mankirt Aulakh (DJJOhAL.Com).mp3",
        "playlistId": "playlist1",
        "liked": false
      },
      {
        "name": "Diamond",
        "coverImage": "",
        "url": "Diamond - Gurnam Bhullar (DjPunjab.Com).mp3",
        "playlistId": "playlist2",
        "liked": false
      },
      {
        "name": "Gora Rang",
        "coverImage": "",
        "url": "Gora Rang - Gurnam Bhullar (DJJOhAL.Com).mp3",
        "playlistId": "playlist1",
        "liked": false
      },
      {
        "name": "Kaun Nachdi",
        "coverImage": "",
        "url": "Kaun Nachdi - Guru Randhawa Neeti Mohan (DJJOhAL.Com).mp3",
        "playlistId": "playlist2",
        "liked": false
      },
      {
        "name": "Stud",
        "coverImage": "",
        "url": "Stud - Babbu Maan (DJJOhAL.Com).mp3",
        "playlistId": "playlist1",
        "liked": false
      }
    ]
  }
  
let audioPlayer = document.querySelector('#audio')
console.log(audioPlayer.src)
let currentSongIndex = null;

function playSongAtIndex(index) {

        const url = "songs/" + data.songs[currentSongIndex].url
        console.log(url)
        audioPlayer.src = url
        audioPlayer.load()
        audioPlayer.play()
        document.querySelector(".songinfo").innerHTML= data.songs[currentSongIndex].name
        document.querySelector(".songtime").innerHTML="00:00   /   00:00"


}



function playNextSong() {
        
        currentSongIndex = (currentSongIndex + 1) % data.songs.length;
        playSongAtIndex(currentSongIndex);
}


function playPreviousSong() {
       
        currentSongIndex = (currentSongIndex - 1 + data.songs.length) % data.songs.length;
        playSongAtIndex(currentSongIndex);
}


const playButtons = document.querySelectorAll('.playbutton');
const previousButton = document.querySelector('.previous');
const nextButton = document.querySelector('.next');



function toggleplayback() {

        if (currentSongIndex == null) {
                currentSongIndex = 0;
                playSongAtIndex(currentSongIndex);
        }
        else {
                if (!audioPlayer.paused) {
                        audioPlayer.pause();
                        document.querySelector('.playbutton').src = "play.svg";
                        
                }
                else {
                        audioPlayer.play();
                        document.querySelector('.playbutton').src = "pause.svg";
                       
                }
        }

}

previousButton.addEventListener('click', () => {
        playPreviousSong();
        document.querySelector('.playbutton').src = "pause.svg";
});


nextButton.addEventListener('click', () => {
        playNextSong();
        document.querySelector('.playbutton').src = "pause.svg"
});


const listDiv = document.getElementById('songs');

if (listDiv instanceof HTMLElement) {
    const ul = document.createElement('ul');

    
        data.songs.forEach(song=>{

            // const originalName = song; 
    
            
            // const itemName = song.replace(/\(DJJOhAL\.Com\)\.mp3|\(Mr-Jatt\.com\)\.mp3|\(DjPunjab\.Com\)\.mp3$/, '').replaceAll("%20", " ");
    
            const li = document.createElement('li');
    
         
            // li.setAttribute('data-original-name', originalName);
    
            li.innerHTML = `<img class="invert" width="34" src="music.svg" alt="">
                <div class="info">
                    <div>${song.name}</div>
                    <div></div>
                </div>
                <div class="playnow">
                    <span>Play Now</span>
                    <img class="invert" src="play.svg" alt="">
                </div>`;
    
          
    
            ul.appendChild(li);
        })
    

    listDiv.appendChild(ul);
} else {
    console.error("The 'listDiv' variable is not a valid DOM element.");
}




Array.from(document.querySelector("#songs").getElementsByTagName("li")).forEach((e, index) => {
        e.addEventListener("click", () => {
            // var originalName = e.getAttribute('data-original-name');
            // playmusic(originalName.trim(), index); 
            let currentSong = data.songs[index];
            playmusic(currentSong,index);
        });
    });
    
    const playmusic = (track, index) => {
        audioPlayer.src = "songs/" + track.url;
        currentSongIndex = index; 
        playSongAtIndex(index);
        audioPlayer.play();
        document.querySelector('.playbutton').src = "pause.svg";
        document.querySelector(".songinfo").innerHTML= track.name
document.querySelector(".songtime").innerHTML="00:00   /   00:00"
    }
    
    audioPlayer.addEventListener("timeupdate",()=>{
       document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(audioPlayer.currentTime)} / ${secondsToMinutesSeconds(audioPlayer.duration)}`
       document.querySelector(".circle").style.left = (audioPlayer.currentTime / audioPlayer.duration) * 100 + "%";
    })

    document.querySelector(".seekbar").addEventListener("click",e=>{
        let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left=percent +"%";
        audioPlayer.currentTime=((audioPlayer.duration)*percent)/100;
    })



    function secondsToMinutesSeconds(seconds) {
        if (isNaN(seconds) || seconds < 0) {
            return "00:00";
        }
    
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
    
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left="0"
    })
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left="-130%"
    })

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
        audioPlayer.volume=parseInt(e.target.value)/100
    })



    







