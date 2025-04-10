class Character {
  constructor(name, x, y, imageSet) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.sizex = 150;
    this.sizey = 150;
    this.velocityY = 0;
    this.gravity = 0.8;
    this.isJumping = false;
    this.isAttacking = false;
    this.isBlocking = false;
    this.isCharging = false;
    this.state = "idle";
    this.sprites = imageSet;
  }

  move(rightKey, leftKey) {
    if (this.isAttacking || this.isBlocking || this.isCharging) return;

    if (keyIsDown(rightKey)) {
      this.x += 15;
      if (!this.isJumping) this.state = 'right'; 
    } 
    else if (keyIsDown(leftKey)) {
      this.x -= 12;
      if (!this.isJumping) this.state = 'left';
    } 
    else if (!this.isJumping && !this.isAttacking && !this.isBlocking && !this.isCharging) { 
      this.state = "idle";
    }
  }

  attack(attackKey) {
    if (keyIsDown(attackKey) && !this.isAttacking) {
      this.isAttacking = true;
      this.state = "attack";
      this.sizex = 190;
      this.sizey = 190;

      setTimeout(() => {
        this.isAttacking = false;
        this.sizex = 150;
        this.sizey = 150;
        if (!this.isJumping && !this.isBlocking && !this.isCharging) this.state = "idle";
      }, 500);
    }
  }
  
  display() { 
    if (this.sprites[this.state]) {
        image(this.sprites[this.state], this.x, this.y, this.sizex, this.sizey);
    }
  }
  
  jump(jumpKey) {
    if (!this.isJumping && keyIsDown(jumpKey)) {
      this.velocityY = -20;
      this.isJumping = true;
      this.state = "jump";  
    }
  }

  applyGravity(){
    this.y += this.velocityY;
    this.velocityY += this.gravity;

    // If Vegeta is moving up, keep "jump" state
    if (this.velocityY < 0 && !this.isAttacking && !this.isBlocking && !this.isCharging) {
      this.state = "jump";
    }
    // If Vegeta is moving down, switch to "fall"
    else if (this.velocityY > 0 && this.isJumping && !this.isAttacking && !this.isBlocking && !this.isCharging ) {
      this.state = "fall";
    }
    // Landing x
    if (this.y >= 250) {
      // this.y = 250;
      this.velocityY = 0;
      this.isJumping = false;
      if (!this.isAttacking && !this.isBlocking && !this.isCharging && !keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW)) {
        this.state = "idle";
      }
    }
  }
  
  
}

let vegetaSprites = {};
let gokuSprites = {};
let pikaSprites = {};
let sakuSprites = {};
let map1;
function preload() {
  vegetaSprites.idle = loadImage('VegIdle (2).png');
  vegetaSprites.right = loadImage('VegRight.png');
  vegetaSprites.left = loadImage('VegDodge.png');
  vegetaSprites.attack = loadImage('VegetaAttack.png');
  vegetaSprites.jump = loadImage('VegUp.png');
  vegetaSprites.fall = loadImage('VegDodge.png'); 
  vegetaSprites.super = loadImage('VegAttack3.png');
  vegetaSprites.block = loadImage('VegetaBlock.png');
  vegetaSprites.charge = loadImage('vegetaCharge.gif');
  map1 = loadImage('kaiMap.png');
  vegetaSprites.final = loadImage('Finalflash.png');
  
  gokuSprites.idle = loadImage('GokuIdle.png');
  gokuSprites.left = loadImage('GokuLeft.png');
  gokuSprites.right = loadImage('GokuDodge.png');
  gokuSprites.attack = loadImage('GokuAttack1.png');
  gokuSprites.jump = loadImage('GokuJump.png');
   gokuSprites.fall = loadImage('GokuFall.png');
  gokuSprites.super = loadImage('GokuSuper.gif');
   gokuSprites.block = loadImage('GokuBlock.png');
  gokuSprites.charge = loadImage('GokuCharge.gif');

  pikaSprites.idle = loadImage ('PikaIdle.png');
   pikaSprites.left = loadImage ('PikaLeft.png');
   pikaSprites.right = loadImage ('PikaRight.png');
   pikaSprites.jump = loadImage ('PikaJump.png');
   pikaSprites.charge = loadImage ('PikaCharge.png');
  pikaSprites.attack = loadImage ('PikaAttack.png')
  pikaSprites. fall = loadImage ('PikaFall.png')
  
  sakuSprites.idle = loadImage ('sakuIdle.png')
  sakuSprites.left = loadImage ('sakuLeft.png')
  sakuSprites.right = loadImage ('sakuRight.png')
  sakuSprites.fall = loadImage ('SakuFall.png')
  sakuSprites.charge = loadImage ('sakuCharge.png')
  sakuSprites.jump = loadImage ('sakujump2.png')
  sakuSprites. attack = loadImage ('sakuAttack.png')
}


// Creating Characters
let vegeta = new Character("Vegeta", 100, 250, vegetaSprites);
let goku = new Character("Goku", 400, 250, gokuSprites);
let pika = new Character("Pika", 500, 250, pikaSprites);
let saku = new Character("Saku",200, 250, sakuSprites);
function setup(){
  createCanvas(800,400)
}
function draw() {
 image(map1, 0, 0, 800, 400);
  vegeta.move(RIGHT_ARROW, LEFT_ARROW);
  vegeta.attack(32); // Spacebar for attack
  vegeta.display();
  vegeta.jump(UP_ARROW)
  vegeta.applyGravity()

  goku.move(65, 68); // D for right, A for left
  goku.attack(82); // F for attack
  goku.display();
  goku.jump(87)
  goku.applyGravity()
  
  pika.display(); // J for left, L for right 
  pika.attack(75); // K for attack
  pika.display();
  pika.jump(73)//I to jump
  pika.applyGravity()
  pika.move(76,74)
  
  saku.display(); 
  saku.attack(71); // G for attack
  saku.display();
  saku.jump(84)
  saku.applyGravity()
  saku.move(72,70)// F for left, H for right
  
  
}