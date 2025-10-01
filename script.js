const player = document.getElementById("player");
const container = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const obstacles = document.querySelectorAll(".obstacle");
const items = document.querySelectorAll(".item");
const enemies = document.querySelectorAll(".enemy");

let posX = 50;
let posY = 50;
let score = 0;
let gameOver = false;
const speed = 10;

const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;

// Posiciona elementos aleatoriamente dentro da área do jogo
function positionElements() {
  enemies.forEach(enemy => {
    enemy.style.left = Math.random() * (containerWidth - 70) + "px";
    enemy.style.top = Math.random() * (containerHeight - 70) + "px";
  });
  items.forEach(item => {
    item.style.left = Math.random() * (containerWidth - 70) + "px";
    item.style.top = Math.random() * (containerHeight - 70) + "px";
  });
  obstacles.forEach(obstacle => {
    obstacle.style.left = Math.random() * (containerWidth - 70) + "px";
    obstacle.style.top = Math.random() * (containerHeight - 70) + "px";
  });
}

positionElements();

player.style.left = posX + "px";
player.style.top = posY + "px";

const enemySpeeds = [4, 3, 5];
const enemyDirections = [1, 1, 1];

function moveEnemies() {
  if (gameOver) return;

  enemies.forEach((enemy, idx) => {
    let enemyPosX = enemy.offsetLeft;
    let newX = enemyPosX + enemyDirections[idx] * enemySpeeds[idx];

    if (newX <= 0 || newX >= container.clientWidth - enemy.clientWidth) {
      enemyDirections[idx] *= -1;
      newX = enemyPosX + enemyDirections[idx] * enemySpeeds[idx];
    }

    enemy.style.left = newX + "px";

    if (isColliding(player, enemy)) {
      alert(`☠️ Você foi pego pelo Rumpelstiltskin! Fim de jogo.\nPontuação: ${score}`);
      gameOver = true;
    }
  });
}

setInterval(moveEnemies, 100);

document.addEventListener("keydown", (e) => {
  if (gameOver) return;

  let newX = posX;
  let newY = posY;

  switch (e.key) {
    case "ArrowUp":
    case "w":
      newY -= speed;
      break;
    case "ArrowDown":
    case "s":
      newY += speed;
      break;
    case "ArrowLeft":
    case "a":
      newX -= speed;
      break;
    case "ArrowRight":
    case "d":
      newX += speed;
      break;
  }

  // Mantém o jogador dentro da área
  if (newX < 0) newX = 0;
  if (newX > container.clientWidth - player.clientWidth) newX = container.clientWidth - player.clientWidth;
  if (newY < 0) newY = 0;
  if (newY > container.clientHeight - player.clientHeight) newY = container.clientHeight - player.clientHeight;

  if (!checkCollisionWithObstacles(newX, newY)) {
    posX = newX;
    posY = newY;
    player.style.left = posX + "px";
    player.style.top = posY + "px";

    checkCollisionWithItems();
  }
});

function isColliding(a, b) {
  const r1 = a.getBoundingClientRect();
  const r2 = b.getBoundingClientRect();
  return !(
    r1.top > r2.bottom ||
    r1.bottom < r2.top ||
    r1.right < r2.left ||
    r1.left > r2.right
  );
}

function checkCollisionWithObstacles(newX, newY) {
  player.style.left = newX + "px";
  player.style.top = newY + "px";

  let collided = false;
  obstacles.forEach(ob => {
    if (isColliding(player, ob)) collided = true;
  });

  player.style.left = posX + "px";
  player.style.top = posY + "px";

  return collided;
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
