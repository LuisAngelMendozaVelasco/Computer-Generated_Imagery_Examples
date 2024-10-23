import * as THREE from 'three';

const camera = new THREE.OrthographicCamera();
const cube = new THREE.Mesh(new THREE.BoxGeometry(30, 30, 30), new THREE.MeshNormalMaterial());
const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(15), new THREE.MeshNormalMaterial());
const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(15), new THREE.MeshNormalMaterial());
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

camera.left = window.innerWidth / -16;
camera.right = window.innerWidth / 16;
camera.top = window.innerHeight / 16;
camera.bottom = window.innerHeight / -16;
camera.near = 0.1;
camera.far = 1000;
camera.updateProjectionMatrix();
camera.position.z = 100;
cube.rotateY(Math.PI / 4);
sphere1.position.x = 50;
sphere2.position.x = -50;
sphere2.position.z = -100;
scene.add(sphere1);
scene.add(sphere2);
scene.add(cube);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera)