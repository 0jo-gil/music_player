let index = -1;
let on = 0;
let len = $(".frame").length -1;

let list_num = 0;
let wheelNum;

let list_interval;



var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

callData();

$(".more_close_inner_btn").on("click", function(e){
    e.preventDefault();
    $(".more_player").removeClass("on");
    $(".bg_filter").fadeOut(500, function(){
        $(this).remove();
    });
    $(".mini_player").removeClass("on");
})

$(".more_inner_btn").on("click", function(e){
    e.preventDefault();

    $(".mini_player").addClass("on");
    toggle(".more_player");

    $("more_player").addClass("on");

    $("body").append(
        $("<div class='bg_filter'>")
            .css({opacity: 0.5})
            .fadeIn(500)
    );
});





function toggle(el){
    let isOn = $(el).hasClass("on");

    if(isOn){
        $(el).removeClass("on");
    } else {
        $(el).addClass("on");
    };

}

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
        createList(items);
    })
    .error(function(err){
        console.log(err);
    })
};


function createList(items){
    let imgSrc1 = items[0].snippet.thumbnails.high.url;
    let tit1 = items[0].snippet.title;

    $(".thumb").css({backgroundImage: `url(${imgSrc1})`});
    $(".song_tit").text(tit1);


    for(let el of items){
        index++;
        let tit = el.snippet.title;
        var imgSrc = el.snippet.thumbnails.high.url;

        $(".frame").eq(index).css({
            backgroundImage: `url(${imgSrc})`,
            zIndex: index * -1
        });

        $(".more_player_list").find("ul")
            .append(
                $("<li class='more_inner_list' data-index="+index+">")
                    .append(
                        $("<a href='#'>")
                            .append(
                                $("<div class='more_list_thumb'>")
                                    .css({
                                        backgroundImage: `url(${imgSrc})`
                                    }),
                                $("<div class='more_list_info'>")
                                    .append(
                                        $("<p class='more_tit'>").text(tit),
                                        $("<span>").text("Chet Baker")
                                    )
                            )
                    )
            )
        $(".more_player_list").find("ul").children("li").first().addClass("on");

        document.querySelector("#main").addEventListener("mousewheel", (e)=>{
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
    $(".next_btn").on("click", function(){
        wheelDown(items);
    });
    
    $(".prev_btn").on("click", function(){
        wheelUp(items);
    });

    $(".more_inner_list").on("click", function(){
        let list_index = $(this).index();
        let imgSrc = $(this).find(".more_list_thumb").css("background-image");
        let tit = $(this).find(".more_tit").text();
        let dataIndex = $(this).attr("data-index");

        indexVideo(list_index);

        $(".thumb").css({backgroundImage: imgSrc});
        $(".song_tit").text(tit);

        // $(".more_inner_list").removeClass("on");
        // $(this).addClass("on"); 

        wheelNum = 0;


        list_interval = setInterval(function(){
            wheelNum++;
            wheelDown(items);

            if(wheelNum == dataIndex){
                clearInterval(list_interval);
            };
        }, 200);
        
    });

};

const main = document.querySelector("#main");
const frame = document.querySelectorAll(".frame");


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

    $(".more_inner_list").removeClass("on");
    $(".more_inner_list").eq(num).addClass("on");

    let imgSrc = items[num].snippet.thumbnails.high.url;
    let tit = items[num].snippet.title;

    $(".thumb").css({backgroundImage: `url(${imgSrc})`});

    $(".vinyl").addClass("on");
    $(".vinyl").removeClass("stop");


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

        let data_index = $(".more_inner_list").eq(position -1).attr("data-index");

        data_index = parseInt(data_index);
        if(data_index <= 0){
            data_index = frame.length;
        };


        $(".more_inner_list").eq(position-1).attr("data-index", data_index -1);



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
    player.playVideoAt(num);
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

    $(".more_inner_list").removeClass("on");
    $(".more_inner_list").eq(num).addClass("on");
    
    $(".frame").last().prependTo($(".wrapper"));

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

    $(".vinyl").addClass("on");
    $(".vinyl").removeClass("stop");

    for(let el of frame){
        position--;

        if(position <= 0){
            position = frame.length;
        };


        let data_index = $(".more_inner_list").eq(position -1).attr("data-index");

        data_index = parseInt(data_index);
        if(data_index >= frame.length -1){
            data_index = -1;
        };

        $(".more_inner_list").eq(position-1).attr("data-index", data_index +1);

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
    player.playVideoAt(num);
};

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        playerVars: {
            listType: "playlist",
            list: "PLh1ZBMxUOR2EyhfqVDn2qWejw2st1Hm0V"
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
};

function onPlayerReady(event) {
    // event.target.playVideo();
    // console.log('onPlayerReady 실행');
    // console.log(event);


    $(".next").on("click", function(){
        if(event.target.playerInfo.playlistIndex == 7){
            player.playVideoAt(0);
        } else {
            nextVideo();
        };
    });

    $(".prev").on("click", function(){
        if(event.target.playerInfo.playlistIndex == 0){
            player.playVideoAt(7);
        } else {
            prevVideo();
        };
    });

};
var playerState;
var done = false;

const playBtn =  document.querySelectorAll(".play");
const pauseBtn = document.querySelectorAll(".pause");

function onPlayerStateChange(event) {
    // if (event.data == YT.PlayerState.PLAYING && !done) {
    //     // setTimeout(stopVideo, 6000);
    //     done = true;
    // };
    // playerState = event.data == YT.PlayerState.ENDED ? '종료' :
    //         event.data == YT.PlayerState.PLAYING ? '재생' :
    //         event.data == event.data == YT.PlayerState.PAUSED ? '일시중지 됨' :
    //         event.data == YT.PlayerState.BUFFERING ? '버퍼링 중' :
    //         event.data == YT.PlayerState.CUED ? '재생준비 완료됨' :
    //         event.data == -1 ? '시작되지 않음' : '예외';
    
 
    if(event.data == 1){
        toggleBtn(pauseBtn, playBtn, "on");
    };
    if(event.data == 2){
        toggleBtn(playBtn, pauseBtn, "on");
    };

    // console.log('onPlayerStateChange 실행: ' + playerState);

    // collectPlayCount(event.data);
};

function toggleBtn(element1, element2, className){
    for(let el of element1){
        el.classList.remove(className);
    };
    for(let el of element2){
        el.classList.add(className);
    };
}

function playYoutube() {
    // 플레이어 자동실행 (주의: 모바일에서는 자동실행되지 않음)
    player.playVideo();
};
function pauseYoutube() {
    player.pauseVideo();
};

function stopVideo() {
    player.stopVideo();
};

function indexVideo(num){
    player.playVideoAt(num);
};

function nextVideo(){
    player.nextVideo();
};

function prevVideo(){
    player.previousVideo();
}
