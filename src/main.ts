import './style.css'
import * as THREE from 'three'
import gsap from 'gsap';

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);

//permette di definire il materiale basic
//const material = new THREE.MeshBasicMaterial({ color: '#00ff00'});

const material = new THREE.MeshNormalMaterial(); //definisce i colori in maniera casuale

const mesh = new THREE.Mesh(geometry, material);
const axes = new THREE.AxesHelper(3);
mesh.add(axes.clone());

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
mesh.scale.multiplyScalar(0);
mesh3.scale.y = 2;

const sizes = {
  width: window.innerWidth, //larghezza viewport
  height: window.innerHeight // altezza viewport
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10);
const renderer = new THREE.WebGLRenderer()
const pixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(pixelRatio)
renderer.setSize(sizes.width, sizes.height);

document.body.appendChild(renderer.domElement)

renderer.render(scene, camera);
camera.position.z = 3;
mesh.rotation.y += Math.PI * 0.25;

/*
  algoritmo per definire il tempo di rotazione 
  indipendentemente dalla frequenza del frame in modo costante
*/
//let time = Date.now();
const vel = 2;

const clock = new THREE.Clock();

function animate(){

  //const currentTime = Date.now();
  //const deltaTime = (currentTime - time)/ 1000;
  const deltaTime = clock.getDelta(); //fa la stessa cosa di currentime e time
  //console.log(deltaTime)
  //time = currentTime;
  const time = clock.getElapsedTime();
  //per far spostare un oggetto sull'asse delle Y basta usare le funzioni matematiche Math.sin;
  mesh.rotation.y += vel * deltaTime;
  //mesh.position.y = Math.cos(time) * vel;
  //mesh.position.x = Math.cos(time) * vel;
  mesh.position.y = Math.sin(time);
  mesh2.rotation.x += 0.03;
  mesh2.rotation.y += 0.01;
  mesh3.rotation.y += 0.02
  //mesh.rotation.y += 0.01;

  //camera.lookAt(mesh.position);
  renderer.render(scene, camera);
  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)

function pop(){
  gsap.to(mesh.scale, { duration: 2, x: 1, y: 1, z: 1})
}

pop();


window.addEventListener('resize', onResize)

//permette di rendere la viewport responsive
function onResize() {
  sizes.height = window.innerHeight;
  sizes.width = window.innerWidth;

  camera.aspect = sizes.width / sizes.height;

  //  aggiornamento della matrice di proiezione.
  // Deve essere chiamato dopo qualsiasi cambio di parametro
  //la matrice di proiezione viene utilizzata dalla GPU per indicare 
  //i punti in cui devono essere visualizzati gli oggetti
  camera.updateProjectionMatrix();  
  
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(pixelRatio)

  renderer.setSize(sizes.width, sizes.height)
}

console.log(window.devicePixelRatio);