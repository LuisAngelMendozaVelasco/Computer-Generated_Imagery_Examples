import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// Define geometry
const cube = new THREE.BoxGeometry(10, 10, 10);

// Materials
const ivory = new THREE.MeshLambertMaterial({color: 0xFFFFF0});
const brown1 = new THREE.MeshLambertMaterial({color: 0xA52A2A});
const brown2 = new THREE.MeshLambertMaterial({color: 0x8B4513});

// Create chessboard
const chessboard = new THREE.Group();
var k = 0;

for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
        if (k % 2 == 0) {var mesh = new THREE.Mesh(cube, ivory);}
        else {var mesh = new THREE.Mesh(cube, brown1);}

        mesh.position.x = (j + 1) * 10; // Columns
        mesh.position.y = (i + 1) * 10; // Rows
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
        mesh.receiveShadow = true;
        chessboard.add(mesh);
        k++;
    }

    k++;
}

// Creating chessboard edges
const edge1 = new THREE.Group();

for (var l = 0; l < 10; l++) { // Columns
    for (var m = 0; m < 2; m++) { // Rows
        const mesh2 = new THREE.Mesh(cube, brown2);

        if (m == 1) {mesh2.position.y = 90;}

        mesh2.position.x = l * 10;
        mesh2.matrixAutoUpdate = false;
        mesh2.updateMatrix();
        mesh2.receiveShadow = true;
        edge1.add(mesh2);
    }
}

const edge2 = new THREE.Group();

for (var n = 1; n < 9; n++) { // Rows
    for (var o = 0; o < 2; o++) { // Columns
        const mesh3 = new THREE.Mesh(cube, brown2);

        if (o == 1) {mesh3.position.x = 90;}

        mesh3.position.y = n * 10;
        mesh3.matrixAutoUpdate = false;
        mesh3.updateMatrix();
        mesh3.receiveShadow = true;
        edge2.add(mesh3);
    }
}

// Create chess pieces
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

const white_material1 = new THREE.MeshLambertMaterial({color: 0xFFFFFF, transparent: true, opacity: 1});
const white_material2 = new THREE.MeshLambertMaterial({color: 0xFFFFFF, transparent: true, opacity: 0.75});
const white_tower_mesh1 = new THREE.Mesh(tower, white_material1);
const white_tower_mesh2 = new THREE.Mesh(tower, white_material2);
const black_material1 = new THREE.MeshLambertMaterial({color: 0x000000, transparent: true, opacity: 0.5});
const black_material2 = new THREE.MeshLambertMaterial({color: 0x000000, transparent: true, opacity: 0.25});
const black_tower_mesh1 = new THREE.Mesh(tower, black_material1);
const black_tower_mesh2 = new THREE.Mesh(tower, black_material2);

white_tower_mesh1.rotateX(Math.PI / 2);
white_tower_mesh2.rotateX(Math.PI / 2);
black_tower_mesh1.rotateX(Math.PI / 2);
black_tower_mesh2.rotateX(Math.PI / 2);
white_tower_mesh1.scale.set(0.05, 0.05, 0.05);
white_tower_mesh2.scale.set(0.05, 0.05, 0.05);
black_tower_mesh1.scale.set(0.05, 0.05, 0.05);
black_tower_mesh2.scale.set(0.05, 0.05, 0.05);
white_tower_mesh1.position.set(10, 10, 5);
white_tower_mesh2.position.set(80, 10, 5);
black_tower_mesh1.position.set(10, 80, 5);
black_tower_mesh2.position.set(80, 80, 5);
white_tower_mesh1.castShadow = true;
white_tower_mesh2.castShadow = true;
black_tower_mesh1.castShadow = true;
black_tower_mesh2.castShadow = true;

// Create lights in the scene
const light1 = new THREE.DirectionalLight(0xFF0000);
const light2 = new THREE.DirectionalLight(0x00FF00);
const light3 = new THREE.DirectionalLight(0xFFFFFF);
light1.castShadow = true;
light2.castShadow = true;
light3.castShadow = true;

// Lights position
light1.position.set(0, 90, 60);
light1.target = white_tower_mesh2;
light2.position.set(90, 90, 60);
light3.position.set(90, 0, 60);
light3.target = black_tower_mesh1;

const scene = new THREE.Scene();
scene.add(chessboard);
scene.add(edge1);
scene.add(edge2);
scene.add(white_tower_mesh1);
scene.add(white_tower_mesh2);
scene.add(black_tower_mesh1);
scene.add(black_tower_mesh2);
scene.add(light1);
scene.add(light2);
scene.add(light3);
scene.rotateX(-Math.PI / 4);

const camera = new THREE.PerspectiveCamera();
camera.position.set(45, 30, 120);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.render(scene, camera);