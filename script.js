const egg = document.getElementById("egg");
const message = document.getElementById("message");
const counterDisplay = document.getElementById("counter");
const resetButton = document.getElementById("reset");
const crackSound = document.getElementById("crack-sound");
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");

let cracked = false;
let smashCount = 0;

function resizeCanvas() {
  confettiCanvas.width = egg.width;
  confettiCanvas.height = egg.height;
}

window.addEventListener("resize", resizeCanvas);

// 🔧 Helper: Vibrate device if supported
function vibrate(duration = 200) {
  if ("vibrate" in navigator) {
    navigator.vibrate(duration);
  }
}

egg.addEventListener("click", () => {
  if (cracked) return;
  cracked = true;
  egg.src = "assets/cracked_egg.png";
  crackSound.play();
  vibrate([100, 50, 100]); // 💥 vibration pulse!
  showMessage();
  launchConfetti();
  smashCount++;
  counterDisplay.textContent = "Eggs Smashed: " + smashCount;
});

resetButton.addEventListener("click", () => {
  cracked = false;
  egg.src = "assets/egg.png";
  message.textContent = "";
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
});

function showMessage() {
  const phrases = [
    "Oops. That was a hard boil.",
    "Egg-ceptional smash!",
    "Hard one got cracked",
    "Yolk's on you!",
    "Sunny side up!"
  ];
  message.textContent = phrases[Math.floor(Math.random() * phrases.length)];
}

function launchConfetti() {
  resizeCanvas();
  const pieces = [];
  const colors = ["#fce96a", "#ffdb58", "#ffe066", "#f4d35e"];
  for (let i = 0; i < 30; i++) {
    pieces.push({
      x: egg.width / 2,
      y: egg.height / 2,
      radius: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      velocityX: (Math.random() - 0.5) * 10,
      velocityY: -Math.random() * 10,
      gravity: 0.3
    });
  }
  function draw() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    pieces.forEach(p => {
      p.x += p.velocityX;
      p.y += p.velocityY;
      p.velocityY += p.gravity;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    if (pieces.some(p => p.y < confettiCanvas.height)) {
      requestAnimationFrame(draw);
    }
  }
  draw();
}

// ⏳ Intro screen logic
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('main').style.display = 'block';
  }, 3000); // match with your fade-out animation timing
});
