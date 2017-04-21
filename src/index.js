import _ from "lodash";
import tinycolor from "tinycolor2";

// center that shit
var center = _(points).reduce(function(average, value, index, collection) {
  return { x: average.x + value.x / collection.length, y: average.y + value.y / collection.length, z: average.z + value.z / collection.length };
}, { x: 0.0, y: 0.0, z: 0.0 });

_(points).each(function(point) {
  point.x -= center.x;
  point.y -= center.y;
  point.z -= center.z;
});

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
var camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.SphereGeometry( 5, 32, 32 );
var cubes = [];
var color = tinycolor("blue");

for (var i = 0, len = points.length; i < len; i++) {
  var cube = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial( { color: color.toHexString() } )
  );

  color = color.spin(1);
  scene.add( cube );
  cube.position.x = points[i].x * 10;
  cube.position.y = points[i].y * 10;
  cube.position.z = points[i].z * 10;
  cube.scale.x = 0.015;
  cube.scale.y = 0.015;
  cube.scale.z = 0.015;
  cubes.push(cube);
}

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 10;
controls.maxDistance = 50;

camera.position.x = 6;
camera.position.y = 6;
camera.position.z = 6;
camera.lookAt(new THREE.Vector3(0, 0, 0));

function render() {
  requestAnimationFrame( render );
  renderer.render( scene, camera );
}

render();
