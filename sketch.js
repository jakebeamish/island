// let noiseScale = 0.05;
// let layers = 1;

let layersSlider;
let layers;

let noiseScaleSlider;
let noiseScale;

let noiseShiftSlider;
let noiseShift;

let noiseOctavesSlider;
let noiseOctaves;

function setup() {
  // colorMode(HSB);
  // layersSlider = createSlider(1, 20, 20, 1);
  // noiseScaleSlider = createSlider(0.001, 0.09, 0.009, 0.001);
  // noiseShiftSlider = createSlider(0, 10, 0, 0.01);
  // noiseOctavesSlider = createSlider(0, 20, 10, 1);
  createCanvas(round(windowWidth), round(windowHeight));

}

function draw() {

  // layers = layersSlider.value();
  layers = 4;
  // noiseScale = noiseScaleSlider.value();
  noiseScale = 0.01;
  // noiseShift = noiseShiftSlider.value();
  // noiseOctaves = noiseOctavesSlider.value();
  noiseOctaves = 10;
  // noiseShift = frameCount * 0.01;
  noiseDetail(noiseOctaves, 0.7);
  createMap();
  drawMap();
}

function createMap() {
  m = [];
  for (let x = 0; x < width; x++) {
    m[x] = [];
    for (let y = 0; y < height; y++) {
      let dx = cos(PI + map(x, 0, width, 0, TWO_PI));
      let dy = cos(PI + map(y, 0, height, 0, TWO_PI));
      let centre = (dx + dy) * 0.5;
      let n = centre * noise(x * noiseScale, y * noiseScale, noiseShift);
      if (n < 0.4) n = 0;
      m[x][y] = n;
    }
  }
}

function drawMap() {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let h = Math.round(m[x][y] * layers) * (1/layers);
      let colour = color(h * 255);
      if (m[x][y] >= 0.4 && m[x][y] < 0.42) colour = color(255);
      if (m[x][y] == 0) colour = color(0);
      set(x, y, colour)
    }
  }
  updatePixels();
}
