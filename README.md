// 9th-grade-group-fighter-project see link  https://editor.p5js.org/Fatma.s/sketches/t8R0g3BfW //

class Character {
  constructor(name, x, y, imageSet) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.sizex = 150;
    this.sizey = 150;
    this.velocityY = 0;
    this.gravity = 2;
    this.isJumping = false;
    this.isAttacking = false;
    this.isHit = false; // New flag for getting hit
    this.hitCooldown = 0; // Prevents continuous triggering
    this.state = "idle";
    this.sprites = imageSet;
    this.isMoving = false;
    
    this.hitbox = {
      x: this.x + 30,
      y: this.y + 30,
      w: this.sizex - 60,
      h: this.sizey - 40
    };
  }

  updateHitbox() {
    this.hitbox.x = this.x + 30;
    this.hitbox.y = this.y + 30;
  } //added size to hitBoxes because they didnt look natural

  move(leftKey, rightKey, other) {
    if (this.isAttacking || this.isHit || this.state == "super1") return; // Don't move if attacking or hit

    if (keyIsDown(leftKey) && !this.leftBlocked) {
      this.x -= 24;
      this.isMoving = true;
      this.state = "left";
    } else if (keyIsDown(rightKey) && !this.rightBlocked) {
      this.x += 24;
      this.isMoving = true;
      this.state = "right";
    } else {
      this.isMoving = false;
      if (!this.isJumping && !this.isAttacking && !this.isHit) {
        this.state = "idle";
      }
    }

    this.updateHitbox();
  }

  jump(jumpKey) {
    if (!this.isJumping && keyIsDown(jumpKey) && !this.isAttacking && !this.isHit) {
      this.velocityY = -30;
      this.isJumping = true;
      this.state = "jump";
    }
    this.updateHitbox();
  }

  applyGravity() {
    if (this.isAttacking || this.isHit || this.state == "super1") return;
    this.y += this.velocityY;
    this.velocityY += this.gravity;

    if (this.velocityY < 0) {
      this.state = "jump";
    } else if (this.velocityY > 0 && this.isJumping) {
      this.state = "fall";
    }

    // Landing
    if (this.y >= 650) {
      this.velocityY = 0;
      this.isJumping = false;
      if (!this.isMoving && !this.isAttacking && !this.isHit) {
        this.state = "idle";
      }
    }

    this.updateHitbox();
  }

  attack(attackKey) {
    if (keyIsDown(attackKey)) {
      this.isAttacking = true;
      this.state = "attack";
    } else {
      this.isAttacking = false;
    }

    this.updateHitbox();
  }
  
  super1(superKey) {
    if (keyIsDown(superKey)) {
      this.isAttacking = true;
      this.state = "super1";
      this.w += 10
       setTimeout(() => {
        this.isAttacking = false;
        this.state = "idle"; // Reset state after hit animation
      }, 500); // Half a second of hit state
      
    } 
    
    else  {
      this.isAttacking = false;
    }

    this.updateHitbox();
  }

  getHit(opponent) {
    if (this.isHit || this.hitCooldown > 0) return; // Prevent spam hitting

    if (opponent.isAttacking && this.collidesWith(opponent)) {
      this.isHit = true;
      this.state = "hit"; // Set to a "hit" animation state (add this sprite)
      this.hitCooldown = 10; 

      // Apply knockback based on opponent’s position
      if (opponent.x < this.x) {
        this.x += 65; // Knockback to the right
      } else {
        this.x -= 65; // Knockback to the left
      }

      setTimeout(() => {
        this.isHit = false;
        this.state = "idle"; 
      }, 500); //
    }
  if (opponent.name === "Vegito" && opponent.state === "super1") {
  let beamHitbox = {
    x: opponent.x + 260,
    y: opponent.y,
    w: 255,
    h: opponent.sizey
  };

  if (
    this.hitbox.x < beamHitbox.x + beamHitbox.w &&
    this.hitbox.x + this.hitbox.w > beamHitbox.x &&
    this.hitbox.y < beamHitbox.y + beamHitbox.h &&
    this.hitbox.y + this.hitbox.h > beamHitbox.y
  ) {
    if (!this.isHit && this.hitCooldown === 0) {
      this.isHit = true;
      this.state = "hit";
      this.hitCooldown = 10;

      // Stronger beam knockback
      let beamKnockback = 400;
      if (opponent.x < this.x) {
        this.x += beamKnockback;
      } else {
        this.x -= beamKnockback;
      }

      setTimeout(() => {
        this.isHit = false;
        this.state = "idle";
      }, 200);
    }
  }
}


  }
  

  collidesWith(other) {
    return (
      this.hitbox.x < other.hitbox.x + other.hitbox.w &&
      this.hitbox.x + this.hitbox.w > other.hitbox.x &&
      this.hitbox.y < other.hitbox.y + other.hitbox.h &&
      this.hitbox.y + this.hitbox.h > other.hitbox.y
    );
  }
 
  bump(other) {
    if (this.collidesWith(other)) {
      if (this.x < other.x) {
        this.rightBlocked = true;
        other.leftBlocked = true;
      } else {
        this.leftBlocked = true;
        other.rightBlocked = true;
      }
    } else {
      this.rightBlocked = false;
      this.leftBlocked = false;
      other.rightBlocked = false;
      other.leftBlocked = false;
    }
  }

  display() {
    if(this.name == "Vegito" && this.state == "super1"){
      image(SpritesVeg.beam, this.x + 100, this.y -50, this.sizex + 350, this.sizey + 100)
    }
    image(this.sprites[this.state], this.x, this.y, this.sizex, this.sizey);
    noFill();
    stroke(255, 0, 0);
    rect(this.hitbox.x, this.hitbox.y, this.hitbox.w, this.hitbox.h);
  }

  update() {
    if (this.hitCooldown > 0) {
      this.hitCooldown--;
    }
  }
} //this function resets the coolDown every frame in Draw

// Preload images
//let StitchSprites = {};
let ichigoSprites = {};
let SpritesVeg = {};
let map1;
function preload() {
  SpritesVeg.idle = loadImage("VegIdle.png");
  SpritesVeg.left = loadImage("VegLeft.png");
  SpritesVeg.right = loadImage("VegRight.png");
  SpritesVeg.attack = loadImage("VegitoCombo.gif");
  SpritesVeg.super1 = loadImage("VegSuper.png");
  SpritesVeg.jump = loadImage("VegJump.png");
  SpritesVeg.fall = loadImage("VegFall.png");
  SpritesVeg.hit = loadImage ("VegHit.png")
  SpritesVeg.beam = loadImage('FinalKame.gif')
  
  //StitchSprites.idle = loadImage("StitchIdle.png");
 //StitchSprites.left = loadImage("StitchLeft.png");
// StitchSprites.right = loadImage("StitchRight.png");
 //StitchSprites.attack = loadImage("StitchAttack.png");
// StitchSprites.jump = loadImage("StitchJump.png");
// StitchSprites.fall = loadImage("StitchFall.png");
// StitchSprites.hit = loadImage ("StitchHit.png")
  


  
  ichigoSprites.idle = loadImage("IchigoIdleL.gif");
  ichigoSprites.left = loadImage("IchigoLeft.gif");
  ichigoSprites.right = loadImage("IchigoRight.gif");
  ichigoSprites.attack = loadImage("IchigoHeavyL.gif");
  //ichigoSprites.attack2 = loadImage("IchigoSlash.gif")
  ichigoSprites.jump = loadImage("IchigoJump.png");
  ichigoSprites.fall = loadImage("IchigoFall.gif");
  ichigoSprites.hit = loadImage("IchigoHit.png"); // Add hit sprite
  
  map1 = loadImage('naruto_mobile_tencent___corner_scene_xps_obj_blend_by_o_dv89_o_dgfz4uu-pre.jpg')
}

// Initialize characters
let Vegito;
let ichigo;
//let Stitch;
function setup() {
  createCanvas(windowWidth, windowHeight);
Vegito = new Character("Vegito",500, 500, SpritesVeg);
ichigo = new Character("Ichigo", 700, 650, ichigoSprites);
//Stitch = new Character("Stitch",550, 600, StitchSprites);
}

function keyPressed() {
  if (key === 'v') {
    let fs = fullscreen();
    fullscreen(!fs); // This works only when triggered by user input
  }
}
  


function keyPressed() {
  if (key === 'v') {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  image(map1,0, 0, width, height)

  // Update and check for attack collisions
  Vegito.update();
  ichigo.update();
  //Stitch.update();
  
  Vegito.attack(32);
  ichigo.attack(70);  
  //Stitch.attack();

   Vegito.getHit(ichigo);
   ichigo.getHit(Vegito);
  // Stitch.getHit(Vegito,ichigo);
// // Movement and gravity
  Vegito.move(LEFT_ARROW, RIGHT_ARROW, ichigo);
  Vegito.jump(UP_ARROW);
  Vegito.applyGravity();
   Vegito.bump(ichigo);
  Vegito.super1(77)

   ichigo.move(65, 68, Vegito);
   ichigo.jump(87);
   ichigo.applyGravity();
   ichigo.bump(Vegito);
   //ichigo.attack2()
  
 // Stitch.move(65, 68, Vegito,ichigo);
  // Stitch.jump(87);
  // Stitch.applyGravity();
   //Stitch.bump(Vegito,ichigo);

//   // Display characters
  Vegito.display();
   ichigo.display();
   //Stitch.display();
  
 Vegito.x = constrain(Vegito.x, 0, width - 150);
   ichigo.x = constrain(ichigo.x, 0, width - 150);
   // Stitch.x = constrain(Stitch.x, 0, width - 150);
  console.log(windowWidth, windowHeight)
  fill('black')
  text(mouseX + ", " + mouseY, 20, 20)
}
