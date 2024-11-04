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
  
    let sizeFactor; // Initialize size factor for adjusting size
  
    // Adjust size for circles of a specific color
    if (this.color === '#F34213' && this.type === 'circle') {
      sizeFactor = map(spectrum[0], 0, 255, 50, 400); // Map the first frequency value to size
      ellipse(this.x + sizeFactor / 2, this.y + sizeFactor / 2, sizeFactor); // Draw circle with adjusted size
    } else {
      // For other shapes, maintain original size or execute other logic
      if (this.type === 'circle') {
        ellipse(this.x + this.baseWidth / 2, this.y + this.baseHeight / 2, this.baseWidth); // Draw circle with base width
      } else if (this.type === 'rectangle') {
        rect(this.x, this.y, this.baseWidth, this.baseHeight); // Draw rectangle
      } else if (this.type === 'semicircle') {
        arc(this.x + this.baseWidth / 2, this.y + this.baseHeight / 2, this.baseWidth, this.baseHeight, 0, PI); // Draw semicircle
      } else if (this.type === 'triangle') {
        triangle(
          this.x + this.baseWidth / 2, this.y, // Top vertex
          this.x, this.y + this.baseHeight, // Bottom left vertex
          this.x + this.baseWidth, this.y + this.baseHeight // Bottom right vertex
        ); // Draw triangle
      } else if (this.type === 'line') {
        line(this.x, this.y, this.endX, this.endY); // Draw line from (x, y) to (endX, endY)
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





