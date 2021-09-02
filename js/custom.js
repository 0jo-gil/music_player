const main = document.querySelector("#main");
const frame = document.querySelectorAll(".frame");

const play = document.createElement("div");
play.id = "player";

let active = 0;
let position = 0;
let isScroll = false;
let num = 0;


for(el of frame){
    active++;

    el.style.top = `calc(${70}% - ${50 * active}px)`;
    el.style.transform = `translate(-50%, -50%) scale(${1 - active * 0.05})`;
    el.style.zIndex = `${active * -1 + 1}`
};

window.addEventListener("mousewheel", (e)=>{
    let wheel = e.deltaY;

    if(isScroll) return;

    if(wheel < 0){
        wheelDown();
        isScroll = true;
    } else {
        wheelUp();
        isScroll = true;
    }
})

function wheelDown(){
    num++;
    setTimeout(function(){
        isScroll = false;
    }, 700);

    $(".frame").first().appendTo($(".wrapper"));
    $("#player").remove();

    for(el of frame){
        position++;
        
        if(position == frame.length){
            position = 0;
        };

        $(".frame").eq(0).append(play);

        $(".frame").eq(position).css({
            top: `calc(${70}% + ${-50 * (position +1)}px)`,
            transform: `translate(-50%, -50%) scale(${1 - (position+1) * 0.05})`,
            zIndex: position * -1
        });
    };

    
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;
 
    onYouTubeIframeAPIReady(player);
};

function wheelUp(){
    setTimeout(function(){
        isScroll = false;
    }, 700);
    
    $(".frame").last().prependTo($(".wrapper"));
    // let vid = $(".frame").eq(0).children("iframe").attr("src");
    // $(".frame").eq(0).children("iframe").attr("src", vid+"?autoplay=1&volume=0");
    $("#player").remove();

    for(el of frame){
        position--;

        if(position <= 0){
            position = frame.length;
        };

        $(".frame").eq(0).append(play);

        $(".frame").eq(position -1).css({
            top: `calc(${70}% + ${-50 * position}px)`,
            transform: `translate(-50%, -50%) scale(${1 - position * 0.05})`,
            zIndex: position * -1 + 1
        });

    };

    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;
 
    onYouTubeIframeAPIReady(player);
};

function onYouTubeIframeAPIReady(player) {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: '',
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        }
    });
};

function onPlayerReady(event) {
    event.target.playVideo();
};

var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    };
};
function stopVideo() {
    player.stopVideo();
};
