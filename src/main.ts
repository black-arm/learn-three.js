import './style.css'
import * as THREE from 'three'

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);

//permette di definire il materiale basic
//const material = new THREE.MeshBasicMaterial({ color: '#00ff00'});

const material = new THREE.MeshNormalMaterial(); //definisce i colori in maniera casuale

const mesh = new THREE.Mesh(geometry, material);
const mesh2 = mesh.clone();
const mesh3 = mesh.clone();

scene.add(mesh);
scene.add(mesh2);
scene.add(mesh3);

const vector = new THREE.Vector3(2, 2, -5);
mesh.position.copy(vector);
mesh.position.add(new THREE.Vector3(1, 0.5, 0));
mesh3.position.set(-2, 1.5, -3);
//mesh3.scale.set(0.5, 0.5, 0.5);
mesh3.scale.multiplyScalar(0.5);
mesh3.scale.y = 2;

const temp = {
  width: 1024,
  height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, temp.width / temp.height, 0.1, 10);
const renderer = new THREE.WebGLRenderer()
renderer.setSize(temp.width, temp.height);

document.body.appendChild(renderer.domElement)

renderer.render(scene, camera);
camera.position.z = 3;

function animate(){
  mesh.rotation.y += 0.01;
  mesh2.rotation.x += 0.03;
  mesh2.rotation.y += 0.01;
  mesh3.rotation.y += 0.02
  //mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)
