import * as THREE from 'three';

const points = [];

for (var i = 0; i < 50; i++) points.push(new THREE.Vector2(Math.sin(i * 0.2) * 15 + 50, (i - 5) * 2)); 

const geometry = new THREE.LatheGeometry(points); 
const material = new THREE.MeshNormalMaterial(); 
const mesh = new THREE.Mesh(geometry, material); 
const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera(); 
const renderer = new THREE.WebGLRenderer(); 

mesh.rotateX(Math.PI / 8);
scene.add(mesh); 
camera.position.z = 500; 
renderer.setSize(window.innerWidth * 0.5, window.innerHeight);
document.body.appendChild(renderer.domElement); 
renderer.render(scene, camera); 