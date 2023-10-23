function animate() {
  window.requestAnimationFrame(animate);
  c.drawImage(background, 0, 0, canvas.width, canvas.height);

  player.velocity.x = 0;
  player.velocity.y = 0;

  if (keys.a) {
    player.velocity.x = -10;
  }
  if (keys.d) {
    player.velocity.x = 10;
  }
  if (keys.w) {
    player.velocity.y = -10;
  }
  if (keys.s) {
    player.velocity.y = 10;
  }

  enemy.velocity.x = 0;
  enemy.velocity.y = 0;

  if (keys.ArrowLeft) {
    enemy.velocity.x = -10;
  }
  if (keys.ArrowRight) {
    enemy.velocity.x = 10;
  }
  if (keys.ArrowUp) {
    enemy.velocity.y = -10;
  }
  if (keys.ArrowDown) {
    enemy.velocity.y = 10;
  }

  player.update();
  enemy.update();

  document.querySelector('#bar-player').innerHTML = "Saúde player 1: " + playerHealth + "%";
  document.querySelector('#bar-enemy').innerHTML = "Saúde player 2: " + enemyHealth + "%";

  if (isCollision(player, enemy)) {
    if (!attack) {
      attack = true;

      const collisionX = (player.position.x + enemy.position.x) / 2;
  const collisionY = (player.position.y + enemy.position.y) / 2;

  


      const collisionImage = document.getElementById('collision-image');
      collisionImage.style.display = 'block';
      collisionImage.style.left = collisionX + 'px';
      collisionImage.style.top = collisionY + 'px';

      const playerDamage = Math.floor(Math.random() * 21);
      const enemyDamage = Math.floor(Math.random() * 21);
      playerHealth -= playerDamage;
      enemyHealth -= enemyDamage;

      collisionCount++;


      if (collisionCount >= 5) {
        collisionsLeft = 0;
        document.querySelector('#timer').innerHTML = collisionsLeft;
        document.querySelector('#play-again').style.display = 'flex';
        document.querySelector('#play-again').innerHTML = 'Pressione R para jogar novamente';

        if (playerHealth > enemyHealth) {
          document.querySelector(' #battle-result').innerHTML = 'Player 1 ganhou!!';
          document.querySelector('#battle-result').style.display = 'flex';
        } else if (enemyHealth > playerHealth) {
          document.querySelector(' #battle-result').innerHTML = 'Player 2 ganhou!!';
          document.querySelector('#battle-result').style.display = 'flex';
        } else {
          document.querySelector(' #battle-result').innerHTML = 'Empate!!';
          document.querySelector('#battle-result').style.display = 'flex';
        }
      } else {
        collisionsLeft = 5 - collisionCount;
        document.querySelector('#timer').innerHTML = collisionsLeft;
      }

    }
  } else {
    attack = false;
    const collisionImage = document.getElementById('collision-image');
    collisionImage.style.display = 'none';

  }
}


animate();


function resetGame() {
  const battleResult = document.querySelector('#battle-result');
  const playAgain = document.querySelector('#play-again');


  player.position.x = 10;
  player.position.y = 400;
  enemy.position.x = 920;
  enemy.position.y = 400;
  playerHealth = 100;
  enemyHealth = 100;
  collisionCount = 0;
  attack = false;
  collisionsLeft = 5;
  document.querySelector('#timer').innerHTML = collisionsLeft;


  playAgain.style.display = 'none';
  playAgain.innerHTML = 'Pressione R para jogar novamente';


  battleResult.style.display = 'none';
  battleResult.innerHTML = '';
}