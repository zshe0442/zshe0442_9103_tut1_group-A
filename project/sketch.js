let mondrian;
let sound; 

function preload() {
  
  sound = loadSound("assets/The Entertainer.mp3"); 
}

function setup() {
  createCanvas(800, 800);
  mondrian = new Artwork();
  createArtwork();
  noLoop();
  
  
  let playButton = createButton('play_pause');
  playButton.position(10, 820);
  playButton.mousePressed(play_pause);
}

function draw() {
  background(255);
  mondrian.show();
}

function play_pause() {
  if (sound.isPlaying()) {
    sound.pause(); 
  } else {
    sound.loop();
  }
}






class Artwork {
  constructor() {
    this.shapes = []; 
  }

  addShape(x, y, width, height, color, borderColor, borderWidth, type, endX = null, endY = null) {
    this.shapes.push(new Shape(x, y, width, height, color, borderColor, borderWidth, type, endX, endY));
  }

  show() {
    for (let shape of this.shapes) {
      shape.show(); 
    }
  }
}

class Shape {
  constructor(x, y, width, height, color, borderColor, borderWidth, type, endX, endY) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;       
    this.borderColor = borderColor;
    this.borderWidth = borderWidth; 
    this.type = type;       
    this.endX = endX;        
    this.endY = endY;        
  }

  show() {
    stroke(this.borderColor); 
    strokeWeight(this.borderWidth); 
    fill(this.color); 

    if (this.type === 'rectangle') {
      rect(this.x, this.y, this.width, this.height);
    } else if (this.type === 'semicircle') {
      arc(this.x + this.width / 2, this.y + this.height / 2, this.width, this.height, 0, PI);
    } else if (this.type === 'triangle') {
     
      triangle(
        this.x + this.width / 2, this.y,               
        this.x, this.y + this.height,                  
        this.x + this.width, this.y + this.height       
      );
    } else if (this.type === 'dotted') {
      this.drawDottedRect();
    } else if (this.type === 'circle') {
      ellipse(this.x + this.width / 2, this.y + this.height / 2, this.width);
    } else if (this.type === 'line') {
      line(this.x, this.y, this.endX, this.endY); 
    }
  }

  drawDottedRect() {
    let dotSize = 5; 
    let spacing = 15; 

    for (let y = this.y; y < this.y + this.height; y += spacing) {
      for (let x = this.x; x < this.x + this.width; x += spacing) {
        fill(this.color); 
        ellipse(x + dotSize / 2, y + dotSize / 2, dotSize, dotSize);
      }
    }
  }
}

function createArtwork() {
  mondrian.addShape(0, 0, 800, 800, '#F8F8FF', '#000000', 1, 'rectangle'); 

  mondrian.addShape(300, 200, 0, 0, '#000000', '#000000', 2, 'line', 800, 50); 
  mondrian.addShape(400, 0, 0, 0, '#000000', '#000000', 3, 'line', 400, 800); 
  mondrian.addShape(0, 360, 0, 0, '#000000', '#000000', 3, 'line', 400, 360); 
 
  mondrian.addShape(15, 25, 80, 50, '	#FFD700', '#000000', 0, 'circle'); 

  mondrian.addShape(17, 45, 0, 0, '#FFD700', '#FFD700', 4, 'line', 17, 100); 
  mondrian.addShape(27, 40, 0, 0, '#FFD700', '#FFD700', 4, 'line', 27, 130); 
  mondrian.addShape(47, 40, 0, 0, '#FFD700', '#FFD700', 4, 'line', 47, 150); 
  mondrian.addShape(67, 40, 0, 0, '#FFD700', '#FFD700', 4, 'line', 67, 130); 
  mondrian.addShape(84, 40, 0, 0, '#FFD700', '#FFD700', 4, 'line', 84, 150); 
  mondrian.addShape(93, 45, 0, 0, '#FFD700', '#FFD700', 4, 'line', 93, 100); 
  
  mondrian.addShape(80, 320, 350, 100, '#FAFAD2', '#000000', 0, 'circle'); 
  mondrian.addShape(300, 450, 400, 100, '#FFA500', '#000000', 0, 'circle'); 

  mondrian.addShape(0, 420, 0, 0, '#000000', '#000000', 3, 'line', 400, 420); 
  mondrian.addShape(380, 420, 0, 0, '#000000', '#000000', 3, 'line', 380, 800); 

  mondrian.addShape(350, 350, 200, 50, '#F34213', '#000000', 0, 'circle'); 
  mondrian.addShape(600, 80, 200, 50, '#F34213', '#000000', 0, 'circle'); 

  mondrian.addShape(450, 1, 250, 500, '#FAFAD2', '#000000', 0, 'rectangle'); 
  mondrian.addShape(40, 300, 400, 60, '#000000', '#000000', 2, 'rectangle'); 
  mondrian.addShape(20, 450, 20, 20, '#000000', '#000000', 2, 'rectangle'); 
  mondrian.addShape(300, 260, 400, 100, '#0056B4', '#000000', 2, 'rectangle'); 
  mondrian.addShape(400, 630, 400, 50, '#0056B4', '#000000', 2, 'rectangle'); 

  mondrian.addShape(400, 230, 40, 50, '#FFD700', '#000000', 0, 'circle'); 
  mondrian.addShape(570, 230, 40, 50, '#FFD700', '#000000', 0, 'circle'); 

 mondrian.addShape(150, 520, 50, 50, '#F34213', '#000000', 0, 'circle'); 
 mondrian.addShape(40, 570, 50, 50, '#000000', '#000000', 0, 'circle'); 
 mondrian.addShape(50, 615, 0, 0, '#000000', '#000000', 3, 'line', 380, 500); 

  mondrian.addShape(180, 400, 50, 40, '#000000', '#000000', 2, 'rectangle'); 
  mondrian.addShape(600, 650, 70, 150, '#FFA500', '#000000', 1, 'rectangle'); 

  mondrian.addShape(450, 360, 15, 200, '#000000', '#000000', 2, 'rectangle'); 
  mondrian.addShape(305, 262, 500, 100, '#FCE205', '#000000', 0, 'dotted'); 
 
  mondrian.addShape(600, 309, 100, 100, '#F34213', '#000000', 2, 'semicircle'); 
 
  mondrian.addShape(445, 150, 50, 50, '	#FFD700', '#000000', 0, 'triangle'); 
  mondrian.addShape(515, 150, 50, 50, '	#FFD700', '#000000', 0, 'triangle'); 
  mondrian.addShape(445, 200, 120, 60, '	#FFD700', '#000000', 0, 'rectangle'); 
}





