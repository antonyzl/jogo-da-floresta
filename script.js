const player = document.getElementById("player");
const container = document.getElementById("game-container");

let posX = 380;
let posY = 230;
const speed = 10;

function movePlayer(dx, dy) {
  const maxX = container.clientWidth - player.clientWidth;
  const maxY = container.clientHeight - player.clientHeight;

  posX += dx;
  posY += dy;

  // Restringe dentro da área
  posX = Math.max(0, Math.min(posX, maxX));
  posY = Math.max(0, Math.min(posY, maxY));

  player.style.left = posX + "px";
  player.style.top = posY + "px";
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
    case "w":
    case "W":
      movePlayer(0, -speed);
      break;
    case "ArrowDown":
    case "s":
    case "S":
      movePlayer(0, speed);
      break;
    case "ArrowLeft":
    case "a":
    case "A":
      movePlayer(-speed, 0);
      break;
    case "ArrowRight":
    case "d":
    case "D":
      movePlayer(speed, 0);
      break;
  }
});
