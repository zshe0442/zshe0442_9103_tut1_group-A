let mondrian; // Variable to hold the artwork object
let sound; // Variable to hold the sound object
let fft; // FFT object for frequency analysis

function preload() {
  sound = loadSound("assets/The Entertainer.mp3"); // Load the sound file
}

function setup() {
  createCanvas(800, 800); // Create a canvas of size 800x800 pixels
  mondrian = new Artwork(); // Initialize a new Artwork object
  createArtwork(); // Create the artwork by adding shapes

  // Initialize FFT for frequency analysis
  fft = new p5.FFT(); // Create a new FFT object
  sound.amp(0.5); // Set the sound volume to 50%
  noLoop(); // Prevent the draw function from looping initially
  
  // Create a button to play or pause the sound
  let playButton = createButton('Play/Pause');
  playButton.position(10, 820); // Position the button at (10, 820)
  playButton.mousePressed(play_pause); // Attach the play/pause function to the button
}

function draw() {
  background(255); // Set the background color to white
  let spectrum = fft.analyze(); // Get the frequency spectrum data

  mondrian.show(spectrum); // Pass the spectrum data to the artwork for rendering
}

function play_pause() {
  // Toggle play and pause for the sound
  if (sound.isPlaying()) {
    sound.pause(); // Pause the sound if it's currently playing
    noLoop(); // Stop the draw function when paused
  } else {
    sound.loop(); // Start looping the sound
    loop(); // Start the draw function again
  }
}

class Artwork {
  constructor() {
    this.shapes = []; // Array to hold shapes in the artwork
  }

  addShape(x, y, width, height, color, borderColor, borderWidth, type, endX = null, endY = null) {
    // Add a new shape to the artwork
    this.shapes.push(new Shape(x, y, width, height, color, borderColor, borderWidth, type, endX, endY));
  }

  show(spectrum) {
    // Render all shapes with the given spectrum data
    for (let shape of this.shapes) {
      shape.show(spectrum); // Pass the spectrum data to each shape
    }
  }
}

class Shape {
  constructor(x, y, width, height, color, borderColor, borderWidth, type, endX, endY) {
    this.x = x; // X position of the shape
    this.y = y; // Y position of the shape
    this.baseWidth = width; // Base width for calculating size
    this.baseHeight = height; // Base height of the shape
    this.color = color; // Fill color of the shape
    this.borderColor = borderColor; // Border color of the shape
    this.borderWidth = borderWidth; // Width of the shape's border
    this.type = type; // Type of the shape (e.g., circle, rectangle)
    this.endX = endX; // Ending X position (for lines)
    this.endY = endY; // Ending Y position (for lines)
  }

  show(spectrum) {
    stroke(this.borderColor); // Set the border color
    strokeWeight(this.borderWidth); // Set the border width
    fill(this.color); // Set the fill color

    if (this.type === 'dotted' && this.color === '#FCE205') { 
      // If it’s a yellow dotted matrix
      let dotSize = 5; // Base size of each dot
      for (let x = this.x; x < this.x + this.baseWidth; x += dotSize * 3) {
        let columnIndex = int((x - this.x) / (dotSize * 3)); // Calculate column index
        let scale = map(spectrum[columnIndex], 0, 255, 0.8, 2); // Set scale based on frequency value
        for (let y = this.y; y < this.y + this.baseHeight; y += dotSize * 3) {
          ellipse(x + dotSize / 2, y + dotSize / 2, dotSize * scale, dotSize * scale); // Draw scaled dot
        }
      }
    } else if (this.type === 'rectangle') {
      rect(this.x, this.y, this.baseWidth, this.baseHeight);
    }

    
    if (this.type === 'rectangle' && this.x === 600 && this.y === 650) {
      let freq = spectrum[20]; // Get a frequency value from the spectrum
      let r = map(freq, 0, 255, 255, 250); // Map the frequency to the red channel
      let g = map(freq, 0, 255, 205, 0); // Map the frequency to the green channel
      let b = map(freq, 0, 255, 0, 0); // Map the frequency to the blue channel
      fill(r, g, b); // Set the fill color to the mapped RGB values
    }


    if (this.type === 'line' && this.x === 50 && this.y === 615 && this.endX === 380 && this.endY === 500) {
        let freq = spectrum[5];
        let angle = map(freq, 0, 255, -PI / 5, PI / 5);
        let length = dist(this.x, this.y, this.endX, this.endY);
        let newEndX = this.x + length * cos(angle);
        let newEndY = this.y + length * sin(angle);
        line(this.x, this.y, newEndX, newEndY);
    } else if (this.type === 'line' && this.x === 300 && this.y === 200) {
        let freq = spectrum[5];
        let swing = map(freq, 0, 255, -100, 100);
        line(this.x, this.y, this.endX, this.y + swing);
    } else if (this.color === '#FFD700' && this.type === 'line') {
        let freq = spectrum[5];
        let length = map(freq, 0, 255, 50, 150);
        line(this.x, this.y, this.x, this.y + length);
    } else if (this.color === '#F34213' && this.type === 'circle') {
        let sizeFactor = map(spectrum[0], 0, 255, 50, 400);
        ellipse(this.x + sizeFactor / 2, this.y + sizeFactor / 2, sizeFactor);
    } else if (this.color === '#555555' && this.type === 'circle') {
        // For specific gray circles to respond to frequency changes
        let freq = spectrum[5]; // Get a frequency value from the spectrum
        let offset = map(freq, 0, 255, -5, 5); // Map frequency to offset range
        ellipse(this.x + offset, this.y+15, this.baseWidth); // Move circles based on frequency
    } else {
        if (this.type === 'line') {
            line(this.x, this.y, this.endX, this.endY);
        } else if (this.type === 'circle') {
            ellipse(this.x + this.baseWidth / 2, this.y + this.baseHeight / 2, this.baseWidth);
        } else if (this.type === 'rectangle') {
            rect(this.x, this.y, this.baseWidth, this.baseHeight);
        } else if (this.type === 'semicircle') {
            arc(this.x + this.baseWidth / 2, this.y + this.baseHeight / 2, this.baseWidth, this.baseHeight, 0, PI);
        } else if (this.type === 'triangle') {
            triangle(
                this.x + this.baseWidth / 2, this.y,
                this.x, this.y + this.baseHeight,
                this.x + this.baseWidth, this.y + this.baseHeight
            );
        }
    }
}
}

function createArtwork() {
  // Add background rectangle
  mondrian.addShape(0, 0, 800, 800, '#F8F8FF', '#000000', 1, 'rectangle'); 
 
  // Background lines
  mondrian.addShape(300, 200, 0, 0, '#000000', '#000000', 2, 'line', 800, 50); 
  mondrian.addShape(400, 0, 0, 0, '#000000', '#000000', 3, 'line', 400, 800); 
  mondrian.addShape(0, 360, 0, 0, '#000000', '#000000', 3, 'line', 400, 360); 
   

  // Small yellow circle with lines in the upper left corner
  mondrian.addShape(15, 25, 80, 50, '	#FFD700', '#000000', 0, 'circle'); 
  mondrian.addShape(17, 45, 0, 0, '#FFD700', '#FFD700', 4, 'line', 17, 100); 
  mondrian.addShape(27, 40, 0, 0, '#FFD700', '#FFD700', 4, 'line', 27, 130); 
  mondrian.addShape(47, 40, 0, 0, '#FFD700', '#FFD700', 4, 'line', 47, 150); 
  mondrian.addShape(67, 40, 0, 0, '#FFD700', '#FFD700', 4, 'line', 67, 130); 
  mondrian.addShape(84, 40, 0, 0, '#FFD700', '#FFD700', 4, 'line', 84, 150); 
  mondrian.addShape(93, 45, 0, 0, '#FFD700', '#FFD700', 4, 'line', 93, 100); 
  
  // Light chrysanthemum circle
  mondrian.addShape(80, 320, 350, 100, '#FAFAD2', '#000000', 0, 'circle'); 
  
  // Red circle
  mondrian.addShape(300, 450, 400, 100, '#FFA500', '#000000', 0, 'circle'); 
 
  // Middle Lines
  mondrian.addShape(0, 420, 0, 0, '#000000', '#000000', 3, 'line', 400, 420); 
  mondrian.addShape(380, 420, 0, 0, '#000000', '#000000', 3, 'line', 380, 800); 

  // Middle red circle
  mondrian.addShape(350, 350, 200, 50, '#F34213', '#000000', 0, 'circle'); 
  mondrian.addShape(600, 80, 200, 50, '#F34213', '#000000', 0, 'circle'); 
 
  // Egg yellow long rectangle
  mondrian.addShape(450, 1, 250, 500, '#FAFAD2', '#000000', 0, 'rectangle'); 
  mondrian.addShape(600, 650, 70, 150, '#FFA500', '#000000', 1, 'rectangle'); 

  // Black rectangle
  mondrian.addShape(40, 300, 400, 60, '#000000', '#000000', 2, 'rectangle'); 
  mondrian.addShape(20, 450, 20, 20, '#000000', '#000000', 2, 'rectangle'); 
  mondrian.addShape(180, 400, 50, 40, '#000000', '#000000', 2, 'rectangle'); 
  mondrian.addShape(450, 360, 15, 200, '#000000', '#000000', 2, 'rectangle'); 

  // Blue rectangle
  mondrian.addShape(300, 260, 400, 100, '#0056B4', '#000000', 2, 'rectangle'); 
  mondrian.addShape(400, 630, 400, 50, '#0056B4', '#000000', 2, 'rectangle'); 

  // Lower left red and black circle
 mondrian.addShape(150, 520, 50, 50, '#F34213', '#000000', 0, 'circle'); 
 mondrian.addShape(40, 570, 50, 50, '#000000', '#000000', 0, 'circle'); 

  // Lower left line
 mondrian.addShape(50, 615, 0, 0, '#000000', '#000000', 2, 'line', 380, 500); 
   
  // semicircle
  mondrian.addShape(600, 309, 100, 100, '#F34213', '#000000', 2, 'semicircle'); 

  //Cat head
  mondrian.addShape(445, 150, 50, 50, '	#FFD700', '#000000', 0, 'triangle'); 
  mondrian.addShape(515, 150, 50, 50, '	#FFD700', '#000000', 0, 'triangle'); 
  mondrian.addShape(445, 200, 120, 60, '	#FFD700', '#000000', 0, 'rectangle'); 

  // Yellow cat's paw
  mondrian.addShape(400, 230, 40, 50, '#FFD700', '#000000', 0, 'circle'); 
  mondrian.addShape(570, 230, 40, 50, '#FFD700', '#000000', 0, 'circle'); 

  //Cat's eyes
  mondrian.addShape(470, 210, 15, 80, '#555555', '#000000', 0, 'circle');
  mondrian.addShape(525, 210, 15, 80, '#555555', '#000000', 0, 'circle');
  
  // Small dot rectangle
  mondrian.addShape(305, 262, 500, 100, '#FCE205', '#000000', 0, 'dotted'); 
 

}

