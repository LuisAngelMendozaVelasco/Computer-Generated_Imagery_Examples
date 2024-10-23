import * as THREE from 'three';

const star = new THREE.Shape();

star.moveTo(-20, 20);
star.lineTo(-70, 0);
star.lineTo(-20, -20);
star.lineTo(0, -70);
star.lineTo(20, -20);
star.lineTo(70, 0);
star.lineTo(20, 20);
star.lineTo(0, 70);
star.lineTo(-20, 20);

const geometry =  new THREE.ShapeGeometry(star);
const material = new THREE.MeshBasicMaterial({color: 0xFFFF00});
const mesh = new THREE.Mesh(geometry, material);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();
const renderer = new THREE.WebGLRenderer();

scene.add(mesh);
camera.position.z = 150;
renderer.setSize(window.innerWidth * 0.5, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);