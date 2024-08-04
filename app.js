let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let h2 = document.querySelector("h2");
let started = false;
let level = 0;

// Start the game on keypress
document.addEventListener("keypress", function () {
    if (!started) {
        h2.innerText = "Game is Started";
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 500);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 500);
}

function levelUp() {
    userSeq = []; // Reset user sequence
    level++;
    h2.innerText = `Level ${level}`;

    // Random button
    let randIdx = Math.floor(Math.random() * 4); // Random index between 0 and 3
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`#${randColor}`);
    gameSeq.push(randColor);

    gameFlash(randBtn);
}

function checkAns() {
    let idx = userSeq.length - 1;

    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to start.`;
        document.querySelector("body").style.color = "red";
        setTimeout(function () {
            document.querySelector("body").style.color = "black";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns();
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    level = 0;
    userSeq = [];
    gameSeq = [];
    h2.innerHTML = `Level 0`;
}
