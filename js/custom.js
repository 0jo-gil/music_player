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

        $(".frame").eq(position).append(play);

        $(".frame").eq(position).css({
            top: `calc(${70}% + ${-50 * (position +1)}px)`,
            transform: `translate(-50%, -50%) scale(${1 - (position+1) * 0.05})`,
            zIndex: position * -1
        });
    };
};

function wheelUp(){
    setTimeout(function(){
        isScroll = false;
    }, 700);
    
    $(".frame").last().prependTo($(".wrapper"));
    let vid = $(".frame").eq(0).children("iframe").attr("src");
    $(".frame").eq(0).children("iframe").attr("src", vid+"?autoplay=1&volume=0");

    for(el of frame){
        position--;

        if(position <= 0){
            position = frame.length;
        };


        $(".frame").eq(position -1).css({
            top: `calc(${70}% + ${-50 * position}px)`,
            transform: `translate(-50%, -50%) scale(${1 - position * 0.05})`,
            zIndex: position * -1 + 1
        });

    };
};

