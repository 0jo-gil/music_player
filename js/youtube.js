let index = -1;
let on = 0;

callData();

function callData(){
    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/playlistItems", 
        dataType: "jsonp",
        async: false,
        data: {
            part: "snippet",
            key: "AIzaSyDQnEmKhqzQKaQwtZ6KHu9_szVRtmJjDgg",
            playlistId: "PLh1ZBMxUOR2Gl_y9fG-2Dur9T7EGz987K",
            maxResults: 20
        }
    })
    .success(function(data){
        let items= data.items;
        createList(items);
    })
    .error(function(err){
        console.log(err);
    })
};


function createList(items){

    for(el of items){
        index++;
        var imgSrc = el.snippet.thumbnails.high.url;
        var vidId = el.snippet.resourceId.videoId;

        $(".frame").eq(index).css({
            backgroundImage: `url(${imgSrc})`,
            zIndex: index * -1
        });
        // $(".frame").eq(index).find("iframe").attr({
        //     src: "https://www.youtube.com/embed/"+vidId,
        //     frameborder: "no"
        // });
    };
};



// var tag = document.createElement('script');
// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// let player;
// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('player', {
//         height: '360',
//         width: '640',
//         videoId: 'PUxd9doanA4',
//         events: {
//             'onReady': onPlayerReady,
//             'onStateChange': onPlayerStateChange
//         }
//     });
// };

// function onPlayerReady(event) {
//     event.target.playVideo();
// };

// var done = false;

// function onPlayerStateChange(event) {
//     if (event.data == YT.PlayerState.PLAYING && !done) {
//         // setTimeout(stopVideo, 6000);
//         done = true;
//     };
// };
// function stopVideo() {
//     player.stopVideo();
// };


  

/*
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'MDgcqOv0k9I',
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
        // setTimeout(stopVideo, 6000);
        done = true;
    };
};
function stopVideo() {
    player.stopVideo();
};


*/