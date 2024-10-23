import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const shape1 = [];
const shape2_1 = new THREE.Shape();
const shape2_2 = new THREE.Shape();
const shape2_3 = new THREE.Shape();
const shape2_4 = new THREE.Shape();

shape1.push(new THREE.Vector2(120, -50));
shape1.push(new THREE.Vector2(120, -30));
shape1.push(new THREE.Vector2(100, -30));
shape1.push(new THREE.Vector2(100, -10));
shape1.push(new THREE.Vector2(70, 10));
shape1.push(new THREE.Vector2(70, 100));
shape1.push(new THREE.Vector2(90, 120));

shape2_1.moveTo(-30, 84.85);
shape2_1.lineTo(-30, 57.43);
shape2_1.lineTo(-57.43, 30);
shape2_1.lineTo(-84.85, 30);
shape2_1.lineTo(-63.64, 63.64);
shape2_1.lineTo(-30, 84.85);

shape2_2.moveTo(-30, -84.85);
shape2_2.lineTo(-30, -57.43);
shape2_2.lineTo(-57.43, -30);
shape2_2.lineTo(-84.85, -30);
shape2_2.lineTo(-63.64, -63.64);
shape2_2.lineTo(-30, -84.85);

shape2_3.moveTo(30, -84.85);
shape2_3.lineTo(30, -57.43);
shape2_3.lineTo(57.43, -30);
shape2_3.lineTo(84.85, -30);
shape2_3.lineTo(63.64, -63.64);
shape2_3.lineTo(30, -84.85);

shape2_4.moveTo(30, 84.85);
shape2_4.lineTo(30, 57.43);
shape2_4.lineTo(57.43, 30);
shape2_4.lineTo(84.85, 30);
shape2_4.lineTo(63.64, 63.64);
shape2_4.lineTo(30, 84.85);

const geometry1 = new THREE.LatheGeometry(shape1).toNonIndexed();
const geometry2_1 = new THREE.ExtrudeGeometry(shape2_1, {depth: 40, bevelEnabled: true, bevelSize: 5, bevelSegments: 5, bevelThickness: 5});
const geometry2_2 = new THREE.ExtrudeGeometry(shape2_2, {depth: 40, bevelEnabled: true, bevelSize: 5, bevelSegments: 5, bevelThickness: 5});
const geometry2_3 = new THREE.ExtrudeGeometry(shape2_3, {depth: 40, bevelEnabled: true, bevelSize: 5, bevelSegments: 5, bevelThickness: 5});
const geometry2_4 = new THREE.ExtrudeGeometry(shape2_4, {depth: 40, bevelEnabled: true, bevelSize: 5, bevelSegments: 5, bevelThickness: 5});
const geometry3 = new THREE.CylinderGeometry(90, 90, 5).toNonIndexed();

geometry2_1.rotateX(90 * Math.PI / 180);
geometry2_1.translate(0, 163, 0);
geometry2_2.rotateX(90 * Math.PI / 180);
geometry2_2.translate(0, 163, 0);
geometry2_3.rotateX(90 * Math.PI / 180);
geometry2_3.translate(0, 163, 0);
geometry2_4.rotateX(90 * Math.PI / 180);
geometry2_4.translate(0, 163, 0);
geometry3.translate(0, 118, 0);

const geometries = [];

geometries[0] = geometry2_1;
geometries[1] = geometry2_2;
geometries[2] = geometry2_3;
geometries[3] = geometry2_4;
geometries[4] = geometry3;
geometries[5] = geometry1;

const tower = BufferGeometryUtils.mergeGeometries(geometries);
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(tower, material);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();
const renderer = new THREE.WebGLRenderer();

mesh.rotateX(40 * Math.PI / 180);
scene.add(mesh);
camera.position.z = 500;
renderer.setSize(window.innerWidth * 0.5, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);