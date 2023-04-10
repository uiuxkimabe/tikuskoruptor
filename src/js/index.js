/*? no js js needed from me */

const board = document.querySelector(".board");
let getCoin = document.getElementById("getCoin");
let getLevel = document.getElementById("getLevel");
let coin = 0;
let level = 0;
const notif = document.querySelectorAll(".notif-level figcaption");

function randomPosition() {
  const positionXy = ~~[Math.random() * 30 + 1];
  return positionXy;
}

// inisialisasi game (untuk settingan gamenya)
let config = {
  speed: 100, // kecepatan gerakan
  player: {
    x: 15,
    y: 15,
  }, //   position player
  food: {
    x: randomPosition(),
    y: randomPosition(),
  }, //   position food
  velocity: {
    x: 0,
    y: 0,
  }, // untuk movement
};

// object khusus method games (agar bisa jalan)
const games = {
  createFood() {
    board.innerHTML = `<div class="food" style="grid-area: ${config.food.x} / ${config.food.y}"></div>`;
  }, //membuat food dengan random position
  createPlayer() {
    board.innerHTML += `<div class="player" style="grid-area: ${config.player.x} / ${config.player.y}"></div>`;
  }, //membuat player dengan random position
  movePlayer() {
    config.player.x += config.velocity.x;
    config.player.y += config.velocity.y;
  }, //membuat movement dengan press tombol (key) pd keyboard
  getFeed() {
    if (
      config.player.x === config.food.x &&
      config.player.y === config.food.y
    ) {
      getCoin.innerHTML = coin + 10 + "$";
      coin += 10;
      config.food.x = randomPosition();
      config.food.y = randomPosition();
      switch (coin) {
        case 50:
          getLevel.innerHTML = level + 1;
          notif[0].classList.add("show");
          setTimeout(() => {
            notif[0].classList.remove("show");
          }, 3000);
          break;
        case 100:
          level++;
          getLevel.innerHTML = level + 1;
          notif[1].classList.add("show");
          setTimeout(() => {
            notif[1].classList.remove("show");
          }, 3000);
          break;
        case 150:
          level++;
          getLevel.innerHTML = level + 1;
          notif[2].classList.add("show");
          setTimeout(() => {
            notif[2].classList.remove("show");
          }, 3000);
          break;
        case 200:
          level++;
          getLevel.innerHTML = level + 1;
          notif[3].classList.add("show");
          break;
        default:
          break;
      }
      // console.info(coin, level);
    }
  },
  wall() {
    if (
      config.player.x <= 0 ||
      config.player.x > 31 ||
      config.player.y <= 0 ||
      config.player.y > 31
    ) {
      console.log("aw kalah....");
      config.player.x = randomPosition();
      config.player.y = randomPosition();
    }
  },
};

function movement(listen) {
  // console.info(listen.key);
  switch (listen.key) {
    case "w":
      config.velocity.x = -1; // x vertical
      config.velocity.y = 0; //y horizontal
      break;
    case "d":
      config.velocity.x = 0; // x vertical
      config.velocity.y = 1; //y horizontal
      break;
    case "s":
      config.velocity.x = 1; // x vertical
      config.velocity.y = 0; //y horizontal
      break;
    case "a":
      config.velocity.x = 0; // x vertical
      config.velocity.y = -1; //y horizontal
      break;
    default:
      break;
  }
}

function headMove() {
  const rat = document.querySelector(".player");
  if (config.velocity.y == 1) return (rat.style.transform = "scaleX(-1)");
  if (config.velocity.x == -1) return (rat.style.transform = "rotate(90deg)");
  if (config.velocity.x == 1) return (rat.style.transform = "rotate(-90deg)");
}

// set interval memiliki 2 parameter function apa, dan kecepatan berapa akan bergerak
function startGames() {
  games.createFood();
  games.createPlayer();
  games.movePlayer();
  games.getFeed();
  games.wall();
  headMove();
  // console.table(config.player);
}

setInterval(startGames, config.speed);

document.addEventListener("keydown", movement);

// UI Button Toggle
const btnNavigasi = document.querySelectorAll(".btnArrow button");

const [btnUp, btnLeft, btnRight, btnBottom] = btnNavigasi;

btnUp.addEventListener("click", () => {
  games.createFood();
  games.createPlayer();
  config.velocity.x = -1;
  config.velocity.y = 0;
  console.table(config.velocity);
});

btnLeft.addEventListener("click", () => {
  games.createFood();
  games.createPlayer();
  config.velocity.y = -1;
  config.velocity.x = 0;
  console.info(config.velocity);
});

btnRight.addEventListener("click", () => {
  games.createFood();
  games.createPlayer();
  config.velocity.y = 1;
  config.velocity.x = 0;
  console.info(config.velocity);
});

btnBottom.addEventListener("click", () => {
  games.createFood();
  games.createPlayer();
  config.velocity.x = 1;
  config.velocity.y = 0;
  console.info(config.velocity);
});
