const player = document.getElementById("player");
const container = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");

const obstacles = document.querySelectorAll(".obstacle");
const items = document.querySelectorAll(".item");
const enemy = document.getElementById("enemy1");

let posX = 380;
let posY = 230;
const speed = 10;
let score = 0;
let gameOver = false;

// Movimento do inimigo (simples: esquerda <-> direita)
let enemyDirection = 1;
setInterval(() => {
  if (gameOver) return;

  const enemyPos = enemy.offsetLeft;
  const maxX = container.clientWidth - enemy.clientWidth;

  if (enemyPos <= 0 || enemyPos >= maxX) {
    enemyDirection *= -1;
  }
  enemy.style.left = (enemyPos + enemyDirection * 5) + "px";

  checkCollisionWithEnemy();
}, 100);

// Movimento do jogador
document.addEventListener("keydown", (e) => {
  if (gameOver) return;

  let newX = posX;
  let newY = posY;

  switch (e.key) {
    case "ArrowUp":
    case "w":
    case "W":
      newY -= speed;
      break;
    case "ArrowDown":
    case "s":
    case "S":
      newY += speed;
      break;
    case "ArrowLeft":
    case "a":
    case "A":
      newX -= speed;
      break;
    case "ArrowRight":
    case "d":
    case "D":
      newX += speed;
      break;
  }

  if (!checkCollisionWithObstacles(newX, newY)) {
    posX = newX;
    posY = newY;
    player.style.left = posX + "px";
    player.style.top = posY + "px";

    checkCollisionWithItems();
    checkCollisionWithEnemy();
  }
});

function isColliding(a, b) {
  const rect1 = a.getBoundingClientRect();
  const rect2 = b.getBoundingClientRect();
  return !(
    rect1.top > rect2.bottom ||
    rect1.bottom < rect2.top ||
    rect1.right < rect2.left ||
    rect1.left > rect2.right
  );
}

function checkCollisionWithObstacles(newX, newY) {
  player.style.left = newX + "px";
  player.style.top = newY + "px";
  let collision = false;

  obstacles.forEach(ob => {
    if (isColliding(player, ob)) {
      collision = true;
    }
  });

  player.style.left = posX + "px";
  player.style.top = posY + "px";
  return collision;
}

function checkCollisionWithItems() {
  items.forEach(item => {
    if (item.style.display !== "none" && isColliding(player, item)) {
      item.style.display = "none";
      score++;
      scoreDisplay.textContent = score;
    }
  });
}

function checkCollisionWithEnemy() {
  if (isColliding(player, enemy)) {
    alert("💀 Você foi pego por um inimigo! Fim de jogo.\nPontuação: " + score);
    gameOver = true;
  }
}
