import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const trunk_form = new THREE.CylinderGeometry(0.25, 0.5, 1);
const sphere_form = new THREE.SphereGeometry(0.65);
const geometries = [];

sphere_form.translate(0, 1, 0);
geometries[0] = trunk_form;
geometries[1] = sphere_form;

const tree_form = BufferGeometryUtils.mergeGeometries(geometries);
const material = new THREE.MeshNormalMaterial();
const tree_mesh = new THREE.Mesh(tree_form, material);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();
const renderer = new THREE.WebGLRenderer();

scene.add(tree_mesh);
camera.position.z = 5;
renderer.setSize(window.innerWidth * 0.5, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);