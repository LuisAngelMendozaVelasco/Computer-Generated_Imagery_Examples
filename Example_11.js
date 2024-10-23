import * as THREE from 'three';

const light = new THREE.DirectionalLight();
const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshLambertMaterial({color: 0x00FF00});
const mesh = new THREE.Mesh(geometry, material);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();
const renderer = new THREE.WebGLRenderer();

light.position.set(10, 10, 10);
scene.add(mesh);
scene.add(light);
camera.position.z = 5;
renderer.setSize(window.innerWidth * 0.5, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);