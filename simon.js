let gameseq = [];
let userseq = [];

let btns = ["yellow", "red", "blue", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");


//  Start Game
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game started");
        started = true;
        levelup();
    }
});


// Flash for Game
function gameFlash(btn) {
    btn.classList.add("gameflash");
    setTimeout(function () {
        btn.classList.remove("gameflash");
    }, 250);
}


// Flash for User
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}


// 🔹 Level Up Function
function levelup() {
    userseq = [];   // Reset user sequence every level
    level++;
    h2.innerText = `Level ${level}`;

    let randidx = Math.floor(Math.random() * btns.length);  
    let randcolor = btns[randidx];
    let randbtn = document.querySelector(`.${randcolor}`);

    gameseq.push(randcolor);
    console.log("Game Sequence:", gameseq);

    gameFlash(randbtn);
}


// Check Answer
// function checkans(idx) {

//     if (userseq[idx] === gameseq[idx]) {

//         if (userseq.length === gameseq.length) {
//             setTimeout(levelup, 1000);  // ✅ fixed
//         }

//     } else {

//         h2.innerHTML = `GAME Over! Your score was <b>${level}</b><br>Press any key to start.`;

//         document.body.style.backgroundColor = "red";

//         setTimeout(function () {
//             document.body.style.backgroundColor = "white";
//         }, 500);

//         reset();
//     }
// }
let highscore = 0;
let h3 = document.querySelector("h3");

function checkans(idx){

    if(userseq[idx] === gameseq[idx]){

        if(userseq.length === gameseq.length){
            setTimeout(levelup,1000);
        }

    } else {

        if(level > highscore){
            highscore = level;
            h3.innerText = `High Score: ${highscore}`;
        }

        h2.innerHTML = `GAME Over! Your score was <b>${level}</b><br>Press any key to start.`;

        document.body.style.backgroundColor = "red";

        setTimeout(function(){
            document.body.style.backgroundColor = "white";
        },500);

        reset();
    }
}

//Button Press
function btnpress() {

    let btn = this;
    userFlash(btn);

    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);

    checkans(userseq.length - 1);
}


// Add Event Listeners
let allbtns = document.querySelectorAll(".btn");

for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}


// 🔹 Reset Game
function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}