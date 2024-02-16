const feedButton = document.querySelector("#feed-action");
const cleanButton = document.querySelector("#clean-action");
const playButton = document.querySelector("#play-action");

const hungerBar = document.querySelector("#hunger-bar");
const cleanBar = document.querySelector("#clean-bar");
const playBar = document.querySelector("#play-bar");

let maxHunger = 100;
let maxClean = 100;
let maxPlay = 100;

let day = 20;

class GoblinTerje {
    constructor() {
        this.hunger = maxHunger;
        this.clean = maxClean;
        this.play = maxPlay;
    }

    feedAction() {
        this.hunger = Math.min(this.hunger + 40 / (day * 2), maxHunger);
    }

    cleanAction() {
        this.clean = Math.min(this.clean + 20 / (day * 2), maxClean);
    }

    playAction() {
        this.play = Math.min(this.play + 35 / (day * 2), maxPlay);
    }

    tick() {
        this.hunger = Math.max(this.hunger - 3, 0);
        this.clean = Math.max(this.clean - 1, 0);
        this.play = Math.max(this.play - 1, 0);
    }
}

let goblin = new GoblinTerje();

feedButton.addEventListener("click", function () {
    goblin.feedAction();
    updateUI();
});

playButton.addEventListener("click", function () {
    goblin.playAction();
    updateUI();
});

cleanButton.addEventListener("click", function () {
    goblin.cleanAction();
    updateUI();
});

// Start game
core();
let coreUpdate = setInterval(core, 1000);

const goblinImage = document.getElementById('goblin-image');
function checkIfDead() {
    if (goblin.hunger <= 0 || goblin.clean <= 0 || goblin.play <= 0) {
        clearInterval(coreUpdate);
        goblinImage.src = 'img/TerjeTrollEyesClosed.png';
        goblinImage.classList.add('fallen');

        setTimeout(function() {
            document.getElementById("gameOverModal").style.display = "block";
        }, 3000);
    }
}

function core() {
    goblin.tick();
    updateUI();
    checkIfDead();
}

function updateUI() {
    let hungerPercentage = (goblin.hunger / maxHunger * 100).toFixed(0) + '%';
    let cleanPercentage = (goblin.clean / maxClean * 100).toFixed(0) + '%';
    let playPercentage = (goblin.play / maxPlay * 100).toFixed(0) + '%';

    hungerBar.style.width = hungerPercentage;
    cleanBar.style.width = cleanPercentage;
    playBar.style.width = playPercentage;

    document.getElementById('hunger-percentage').textContent = hungerPercentage;
    document.getElementById('clean-percentage').textContent = cleanPercentage;
    document.getElementById('play-percentage').textContent = playPercentage;
}