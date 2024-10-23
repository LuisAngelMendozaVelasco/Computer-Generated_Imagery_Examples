import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();
const renderer = new THREE.WebGLRenderer();
const geometry1 = new THREE.CylinderGeometry(0.5, 0.5, 2);
const geometry2 = new THREE.SphereGeometry(1.5, 8, 6);
const material1 = new THREE.MeshBasicMaterial({color: 0x2A1B0A});
const material2 = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cylinder = new THREE.Mesh(geometry1, material1);
const sphere = new THREE.Mesh(geometry2, material2);

camera.position.z = 7;
renderer.setSize(window.innerWidth * 0.5, window.innerHeight);
document.body.appendChild(renderer.domElement);
sphere.position.set(0, 0.9, 0);
cylinder.position.set(0, -1, 0);
scene.add(cylinder, sphere);
renderer.render(scene, camera);