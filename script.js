console.log("MidnightMix is live!ready to Vibe?");
//Initialize variable
let songIndex=0;
let audioElement=new Audio("Songs/song1.mp3");
let masterPlay=document.getElementById('masterPlay');
let ProgressBar=document.getElementById('ProgressBar');
let songItems=Array.from(document.getElementsByClassName('songItems'));
let songs=[
    {songname:"A Sky Full of Stars",filepath:"Songs/1.mp3",coverpath:"Covers/cover1.jpg"},
    {songname:"My Universe",filepath:"Songs/2.mp3",coverpath:"Covers/cover2.jpeg"},
    {songname:"Tumse Milke",filepath:"Songs/3.mp3",coverpath:"Covers/cover3.jpg"},
    {songname:"Night Changes",filepath:"Songs/4.mp3",coverpath:"Covers/cover4.jpeg"},
    {songname:"Saiyaara",filepath:"Songs/5.mp3",coverpath:"Covers/cover5.jpg"}
];

songItems.forEach((element,i)=>{
    element.getElementsbyTagName('img')[0].src=songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText=songs[i].songname;
})
//audioElement.play()

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if (audioElement.paused || audioElement.currentTime==0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
})
//Listen to events
audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);//percenrtage of how much song has been completed
    ProgressBar.value=progress;
})

ProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=ProgressBar.value*audioElement.duration/100;
})

const makeAllPlays= ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        // console.log(e.target);
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-play');
        audioElement.src=`Songs/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=4){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`Songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`Songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})