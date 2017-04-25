import _ from "lodash";
import tinycolor from "tinycolor2";

var origin = points[0];

_(points).each(function(point) {
  point.x -= origin.x;
  point.y -= origin.y;
  point.z -= origin.z;
});
var points_center = center(points);
points.push(points_center);

var scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
scene.add(new THREE.AxisHelper(20));
var camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.SphereGeometry(5, 32, 32);
var cubes = [];
var color = tinycolor("blue");

camera.position.x = 13.8;
camera.position.y = 3.8;
camera.position.z = 7.5;

var color_increment = 360 / points.length;

for (var i = 0, len = points.length; i < len; i++) {
  var cube = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ color: color.toHexString() })
  );

  color = color.spin(color_increment);
  scene.add(cube);
  cube.position.x = points[i].x * 10;
  cube.position.y = points[i].y * 10;
  cube.position.z = points[i].z * 10;
  cube.scale.x = 0.015;
  cube.scale.y = 0.015;
  cube.scale.z = 0.015;
  cubes.push(cube);
}

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 1;
controls.maxDistance = 100;

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
function bounds(points) {
  var x = _.map(points, "x");
  var y = _.map(points, "y");
  var z = _.map(points, "z");

  return [
    new THREE.Vector3(_.min(x), _.min(y), _.min(z)),
    new THREE.Vector3(_.max(x), _.max(y), _.max(z))
  ];
}

function center(points) {
  var b = bounds(points);
  return new THREE.Vector3(
    (b[0].x + b[1].x) / 2,
    (b[0].y + b[1].y) / 2,
    (b[0].z + b[1].z) / 2
  );
}

render();
