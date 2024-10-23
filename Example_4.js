import * as THREE from 'three';

const geometry = new THREE.BufferGeometry();
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();
const renderer = new THREE.WebGLRenderer();
const points = [new THREE.Vector3(-1, 1, -1),
                new THREE.Vector3(-1, -1, 1),
                new THREE.Vector3(1, 1, 1),   

                new THREE.Vector3(1, 1, 1),    
                new THREE.Vector3(1, -1, -1),  
                new THREE.Vector3(-1, 1, -1),

                new THREE.Vector3(-1, -1, 1),
                new THREE.Vector3(1, -1, -1),  
                new THREE.Vector3(1, 1, 1),

                new THREE.Vector3(-1, 1, -1),
                new THREE.Vector3(1, -1, -1),    
                new THREE.Vector3(-1, -1, 1)];

geometry.setFromPoints(points);
geometry.computeVertexNormals();
mesh.rotateX(-Math.PI / 4);
mesh.rotateY(Math.PI / 4);
scene.add(mesh);
camera.position.z = 5;
renderer.setSize(window.innerWidth * 0.5, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);