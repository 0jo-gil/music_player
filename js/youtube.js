let index = -1;
let on = 0;
let len = $(".frame").length -1;


var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

callData();

function callData(){
    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/playlistItems", 
        dataType: "jsonp",
        async: false,
        data: {
            part: "snippet",
            key: "AIzaSyDQnEmKhqzQKaQwtZ6KHu9_szVRtmJjDgg",
            playlistId: "PLh1ZBMxUOR2EyhfqVDn2qWejw2st1Hm0V",
            maxResults: $(".frame").length
        }
    })
    .success(function(data){
        let items= data.items;

        setTimeout(()=>{
            createList(items);
        }, 500);
    })
    .error(function(err){
        console.log(err);
    })
};


function createList(items){
    let vidId1 = items[0].snippet.resourceId.videoId;
    console.log(vidId1);
    onYouTubeIframeAPIReady("9YG3Dr3sQGA");

    for(let el of items){
        index++;
        var imgSrc = el.snippet.thumbnails.high.url;

        $(".frame").eq(index).css({
            backgroundImage: `url(${imgSrc})`,
            zIndex: index * -1
        });
        $(".frame").eq(0).find("iframe").attr({
            src: "https://www.youtube.com/embed/"+vidId1
        });

        window.addEventListener("mousewheel", (e)=>{
            let wheel = e.deltaY;
        
            if(isScroll) return;
        
            if(wheel < 0){
                wheelDown(items);
                isScroll = true;
            } else {
                wheelUp(items);
                isScroll = true;
            }
        })
    };



    $(".play").on("click", function(){
        player.playVideo();
        $(".pause").removeClass("on");
        $(".play").addClass("on");
    });
    
    $(".pause").on("click", function(){
        player.pauseVideo();
        $(".play").removeClass("on");
        $(".pause").addClass("on");
    });

    $(".next").on("click", function(){
        wheelDown(items);
        $(".pause").removeClass("on");
        $(".play").addClass("on");
        player.playVideo();
    });

    $(".prev").on("click", function(){
        wheelUp(items);
        $(".pause").removeClass("on");
        $(".play").addClass("on");
        player.playVideo();
    });
    
};


const main = document.querySelector("#main");
const frame = document.querySelectorAll(".frame");

const play = document.createElement("div");
play.id = "player";

let active = 0;
let position = 0;
let isScroll = false;
let num = 0;
let letter = 0;
let rot = 0;


for(let el of frame){
    active++;

    el.style.top = `calc(${70}% - ${35 * active}px)`;
    el.style.transform = `translate(-50%, -50%) scale(${1 - active * 0.05})`;
    el.style.zIndex = `${active * -1 + 3}`
};



function wheelDown(items){
    if(num == len){
        num = 0;
    } else {
        num++;
    }
    setTimeout(function(){
        isScroll = false;
    }, 700);

    $(".frame").first().appendTo($(".wrapper"));
    $("#player").remove();

    let vidId = items[num].snippet.resourceId.videoId;
    let imgSrc = items[num].snippet.thumbnails.high.url;
    let tit = items[num].snippet.title;

    $(".thumb").css({backgroundImage: `url(${imgSrc})`});


    $(".song_tit").text(tit);

    $(".vinyl_tit").text("");
    for(let el of tit){
        letter++;
        $(".vinyl_tit")
            .append(
                $("<span class='vinyl_inner_tit'>").text(el)
        )
    };
    

    for(let el of frame){
        position++;
        
        if(position == frame.length){
            position = 0;
        };

        $(".frame").eq(0).append(play);

        $(".frame").eq(position).css({
            top: `calc(${70}% + ${-35 * (position +1)}px)`,
            transform: `translate(-50%, -50%) scale(${1 - (position+1) * 0.05})`,
            zIndex: position * -1 +3
        });
    };

    for(let el of $(".vinyl_inner_tit")){
        $(".vinyl_inner_tit").eq(rot).css({transform: `rotate(${-200 * rot / $(".vinyl_inner_tit").length}deg) translate(-50%, ${90}px)`});

        rot++;
        if(rot >= $(".vinyl_inner_tit").length){
            rot = 0;
        };
    };


    onYouTubeIframeAPIReady(vidId);
 
};

function wheelUp(items){
    if(num == 0){
        num = len;
    } else {
        num--;
    };
    setTimeout(function(){
        isScroll = false;
    }, 700);
    
    $(".frame").last().prependTo($(".wrapper"));
    $("#player").remove();

    let vidId = items[num].snippet.resourceId.videoId;
    let imgSrc = items[num].snippet.thumbnails.high.url;
    let tit = items[num].snippet.title;

    $(".thumb").css({backgroundImage: `url(${imgSrc})`});

    $(".song_tit").text(tit);

    $(".vinyl_tit").text("");
    for(let el of tit){
        letter++;
        $(".vinyl_tit")
            .append(
                $("<span class='vinyl_inner_tit'>").text(el)
        )
    };

    for(let el of frame){
        position--;

        if(position <= 0){
            position = frame.length;
        };

        $(".frame").eq(0).append(play);

        $(".frame").eq(position -1).css({
            top: `calc(${70}% + ${-35 * position}px)`,
            transform: `translate(-50%, -50%) scale(${1 - position * 0.05})`,
            zIndex: position * -1 + 3
        });

    };    
    
    for(let el of $(".vinyl_inner_tit")){
        $(".vinyl_inner_tit").eq(rot).css({transform: `rotate(${-200 * rot / $(".vinyl_inner_tit").length}deg) translate(-50%, ${90}px)`});

        rot++;
        if(rot >= $(".vinyl_inner_tit").length){
            rot = 0;
        };
    };
 
    onYouTubeIframeAPIReady(vidId);
};

function onYouTubeIframeAPIReady(vidId) {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        playerVars: { 'autoplay': 1, 'controls': 0 },
        videoId: vidId,
        events: {
            'onReady': onPlayerReady,
            // 'onStateChange': onPlayerStateChange
        }
    });
};

function onPlayerReady(event) {
    event.target.playVideo();
};

var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        // setTimeout(stopVideo, 6000);
        done = true;
    };
};
function stopVideo() {
    player.stopVideo();
};



