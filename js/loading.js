const loading_page = document.createElement("div");
const loading_num = document.createElement("h2");
const loading_txt = document.createElement("p");

loading_page.classList.add("loading_page");
loading_num.innerHTML = "2020s";
loading_txt.innerHTML = "CHET BAKER";

let letter_num = 0;
let letter_min;

document.querySelector("body").append(loading_page);
document.querySelector(".loading_page").append(loading_num);
document.querySelector(".loading_page").append(loading_txt);

numMin();

function numMin(){
    let num_txt = loading_num.innerHTML.split("s")[0];
    
    letter_min = setInterval(function(){
        letter_num += 10

        if(letter_num <= 70){
            loading_num.innerHTML = `${num_txt - letter_num}s`;
        } else {
            clearInterval(letter_min);
        };
    }, 500);

    setTimeout(function(){
        document.querySelector(".loading_page").classList.add("on");

        setTimeout(function(){
            document.querySelector(".loading_page").remove();
        }, 2000);
    }, 4000);
 
};