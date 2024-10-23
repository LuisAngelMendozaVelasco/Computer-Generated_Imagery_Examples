import * as THREE from 'three';

const light = new THREE.DirectionalLight();
const sphere = new THREE.Mesh(new THREE.SphereGeometry(1),
                              new THREE.MeshLambertMaterial({color: 0x00FF00}));
const base = new THREE.Mesh(new THREE.BoxGeometry(5, 1, 5),
                            new THREE.MeshLambertMaterial({color: 0xFFFFFF}));
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();
const renderer = new THREE.WebGLRenderer();

light.position.y = 5;
sphere.position.y = 2;
camera.position.z = 10;
camera.position.y = 2;

scene.add(sphere);
scene.add(base);
scene.add(light);

sphere.castShadow = true;
base.receiveShadow = true;
light.castShadow = true;

renderer.setSize(window.innerWidth * 0.5, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);