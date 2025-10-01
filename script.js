const player = document.getElementById("player");
const container = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const obstacles = document.querySelectorAll(".obstacle");
const items = document.querySelectorAll(".item");
const enemy = document.getElementById("enemy1");

let posX = 100;
let posY = 100;
let score = 0;
let gameOver = false;
const speed = 10;

// Inicializa a posição do jogador
player.style.left = posX + "px";
player.style.top = posY + "px";

// Movimento do inimigo (esquerda e direita)
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

// Controle do jogador
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

  if (!checkCollisionWithObstacles(newX, newY)) {
    posX = newX;
    posY = newY;
    player.style.left = posX + "px";
    player.style.top = posY + "px";

    checkCollisionWithItems();
    checkCollisionWithEnemy();
  }
});

// Verifica colisão entre elementos
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

// Checa colisão com obstáculos
function checkCollisionWithObstacles(newX, newY) {
  player.style.left = newX + "px";
  player.style.top = newY + "px";

  let collided = false;
  obstacles.forEach(ob => {
    if (isColliding(player, ob)) collided = true;
  });

  // Volta posição original
  player.style.left = posX + "px";
  player.style.top = posY + "px";

  return collided;
}

// Checa e coleta itens
function checkCollisionWithItems() {
  items.forEach(item => {
    if (item.style.display !== "none" && isColliding(player, item)) {
      item.style.display = "none";
      score++;
      scoreDisplay.textContent = score;
    }
  });
}

// Checa colisão com inimigo
function checkCollisionWithEnemy() {
  if (isColliding(player, enemy)) {
    alert("☠️ Você foi pego! Fim de jogo.\nPontuação: " + score);
    gameOver = true;
  }
}
