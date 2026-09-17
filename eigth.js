let boxes = document.querySelectorAll(".box");
let rstBtn = document.querySelector("#rst-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX = true;

let count = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const rstGame = () => {
    turnX = true;
    count = 0;
    enabledBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnX) {
            box.innerText = "X";
            box.style.color = "darkred";
            turnX = false;
        } else {
            box.innerText = "O";
            box.style.color = "darkgreen";
            turnX = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            tieBreaker();
        }
    });
});


const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations , You won Player ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

const tieBreaker = () => {
    msg.innerText = "The game is Tied";
    msgContainer.classList.remove("hide");
    disabledBoxes();
}

rstBtn.addEventListener("click", rstGame);
newBtn.addEventListener("click", rstGame);