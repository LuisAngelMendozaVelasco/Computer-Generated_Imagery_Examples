import * as THREE from 'three';

const shape = new THREE.Shape();

shape.moveTo(10, 10);
shape.lineTo(10, 50);
shape.lineTo(50, 50);
shape.lineTo(10, 10);

const geometry = new THREE.ExtrudeGeometry(shape, {depth: 25});
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();
const renderer = new THREE.WebGLRenderer();

mesh.rotateY(Math.PI / 4);
scene.add(mesh);
camera.position.z = 100;
camera.position.x = 25;
camera.position.y = 25;
renderer.setSize(window.innerWidth * 0.5, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);