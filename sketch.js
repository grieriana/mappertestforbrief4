let myMap;
let canvas;
let camden;

const mappa = new Mappa('Leaflet');

const options = {
  lat: 51.54,
  lng: -0.14,
  zoom: 13,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
};

// Journey route
let journey = [
  [51.55035, -0.16475],
  [51.55296, -0.1679],
  [51.55362, -0.16716],
  [51.55382, -0.16615],
  [51.5541, -0.1657],
  [51.55663, -0.16622],
  [51.55822, -0.16644],
  [51.55943, -0.16629],
  [51.55875, -0.16417],
  [51.55753, -0.16442],
  [51.55526, -0.16589]
];

// Bird data
let birds = [
{lat:51.55035, lng:-0.16475, count:5},
{lat:51.55296, lng:-0.1679, count:7},
{lat:51.55362, lng:-0.16716, count:2},
{lat:51.55382, lng:-0.16615, count:0},
{lat:51.5541, lng:-0.1657, count:1},
{lat:51.55663, lng:-0.16622, count:2},
{lat:51.55822, lng:-0.16644, count:6},
{lat:51.55943, lng:-0.16629, count:2},
{lat:51.55875, lng:-0.16417, count:2},
{lat:51.55753, lng:-0.16442, count:0},
{lat:51.55526, lng:-0.16589, count:0}
];

async function setup(){

  canvas = createCanvas(windowWidth, windowHeight);

  camden = await loadTable('/assets/camdenlights.csv', ',', 'header');

  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  myMap.onChange(drawMap);
}

function draw(){}

function drawMap(){

  clear();

  // Draw Camden CSV light points
  noStroke();
  fill(200,100,100);

  for (let i = 0; i < camden.getRowCount(); i++) {

    const latitude = Number(camden.getString(i, 'Latitude'));
    const longitude = Number(camden.getString(i, 'Longitude'));

    const pos = myMap.latLngToPixel(latitude, longitude);

    ellipse(pos.x, pos.y, 5, 5);
  }


  // Draw journey route
  stroke(0,255,200);
  strokeWeight(3);
  noFill();

  beginShape();

  for (let i = 0; i < journey.length; i++) {

    let lat = journey[i][0];
    let lng = journey[i][1];

    let pos = myMap.latLngToPixel(lat, lng);

    vertex(pos.x, pos.y);
  }

  endShape();


  // Draw bird dots
  fill(255,220,0);
  noStroke();

  for (let i = 0; i < birds.length; i++) {

    let pos = myMap.latLngToPixel(birds[i].lat, birds[i].lng);

    for (let b = 0; b < birds[i].count; b++) {

      let offsetX = random(-12,12);
      let offsetY = random(-12,12);

      ellipse(pos.x + offsetX, pos.y + offsetY, 6, 6);

    }
  }

}
