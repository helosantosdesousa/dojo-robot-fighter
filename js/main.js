alert('Ligue o som do jogo para tornar sua experiência mais divertida! =)');


const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);
const background = new Image();
background.src = './img/background.jpg';


const gravity = 0.2;
let collisionCount = 0;
let playerWins = 0;
let enemyWins = 0;

class Sprite {
    constructor({ position, velocity, characterImage }) {
      this.position = position;
      this.velocity = velocity;
      this.width = 80;
      this.height = 100;
      this.characterImage = new Image();
  
      this.characterImage.onload = () => { 
        this.characterImageLoaded = true; 
        this.draw(); 
      };
  
      this.characterImageLoaded = false; 
      this.characterImage.src = characterImage; 
  
      this.health = 100;
    }
  
    draw() {
      if (this.characterImageLoaded) { 
        c.drawImage(this.characterImage, this.position.x, this.position.y, this.width, this.height);
      }
    }
  
    update() {
      this.draw();

    if (this.position.x < 0) {
      this.position.x = 0;
    }
    if (this.position.x + this.width > canvas.width) {
      this.position.x = canvas.width - this.width;
    }
    if (this.position.y < 0) {
      this.position.y = 0;
    }
    if (this.position.y + this.height > canvas.height) {
      this.position.y = canvas.height - this.height;
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}


const player = new Sprite({
  position: { x: 10, y: 400 },
  velocity: { x: 0, y: 10 },
  characterImage: './img/player 01.png' 
});

const enemy = new Sprite({
  position: { x: 920, y: 400 },
  velocity: { x: 0, y: 10 },
  characterImage: './img/player 02.png', 
});


let playerHealth = 100;
let enemyHealth = 100;

const keys = {
  a: false,
  d: false,
  w: false,
  s: false,
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false,
};

window.addEventListener('keydown', (event) => {
  keys[event.key] = true;
});

window.addEventListener('keyup', (event) => {
  keys[event.key] = false;
});


let attack = false;
let collisionsLeft = 5; 

function isCollision(player, enemy) {
    return (
      player.position.x + player.width >= enemy.position.x &&
      player.position.x <= enemy.position.x + enemy.width &&
      player.position.y + player.height >= enemy.position.y &&
      player.position.y <= enemy.position.y + enemy.height
    );
  }
  

  window.addEventListener('keydown', (event) => {
    keys[event.key] = true;
    if (event.key === 'r' || event.key === 'R') {
      resetGame();
    }
  });
  
 

