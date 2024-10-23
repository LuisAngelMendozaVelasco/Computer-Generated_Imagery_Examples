import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

var camera, scene, renderer; 
var tower1;
var mesh1, mesh2, group1, group2, group3, group4;

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

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera();
    camera.position.z = 190;
    camera.position.x = 45;
    camera.position.y = -30;
    scene.rotateX(Math.PI * 0.8);

    // Texture
    const texture1 = new THREE.TextureLoader().load('./images/white_marble.jpg'); 
    const texture2 = new THREE.TextureLoader().load('./images/black_marble.jpg');
    const texture3 = new THREE.TextureLoader().load('./images/white_ceramic.jpg');
    const texture4 = new THREE.TextureLoader().load('./images/black_ceramic.jpg');
    const texture5 = new THREE.TextureLoader().load('./images/wood.jpg');
    
    const white_marble = new THREE.MeshBasicMaterial({map: texture1});
    const black_marble = new THREE.MeshBasicMaterial({map: texture2});
    const white_ceramic = new THREE.MeshBasicMaterial({map: texture3});
    const black_ceramic = new THREE.MeshBasicMaterial({map: texture4});  
    const wood = new THREE.MeshBasicMaterial({map: texture5});
    
    tower1 = new THREE.Mesh(tower, white_marble);
    tower1.position.y = 10;
    tower1.position.z = -7;
    tower1.position.x = 10;
    tower1.scale.set(0.05, 0.05, 0.05);
    tower1.rotateX(-Math.PI / 2);

    // Chessboard
    const cube = new THREE.BoxGeometry(10, 10, 10);
    group1 = new THREE.Group();
    group2 = new THREE.Group();
    var k = 0; 

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (k%2 !== 0) {
                mesh1 = new THREE.Mesh(cube, white_ceramic);
                mesh1.position.x = (j + 1) * 10; // Columns
                mesh1.position.y = (i + 1) * 10; // Rows
                mesh1.matrixAutoUpdate = false;
                mesh1.updateMatrix();
                mesh1.receiveShadow = true;
                group1.add(mesh1);
            }

            k++; 
        }

        k++; 
    }
  
    var k = 0;

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (k%2 == 0) {
                mesh2 = new THREE.Mesh(cube, black_ceramic);
                mesh2.position.x = (j + 1) * 10; // Columns
                mesh2.position.y = (i + 1) * 10; // Rows
                mesh2.matrixAutoUpdate = false;
                mesh2.updateMatrix();
                mesh2.receiveShadow = true;
                group2.add(mesh2);
            }

            k++; 
        }

        k++; 
    }

    group3 = new THREE.Group();
    group4 = new THREE.Group();

    for (var l = 0; l < 10; l++) { // Columns
        for (var m = 0; m < 2; m++) { // Rows
            const mesh3 = new THREE.Mesh(cube, wood);
            
            if(m == 1) { mesh3.position.y = 90; }

            mesh3.position.x = l * 10;
            mesh3.matrixAutoUpdate = false;
            mesh3.updateMatrix();
            mesh3.receiveShadow = true;
            group3.add(mesh3);
        }
    }
  
    for (var n = 1; n < 9; n++) { // Rows
        for (var o = 0; o < 2; o++) { // Columns
            const mesh4 = new THREE.Mesh(cube, wood); 

            if (o == 1) { mesh4.position.x = 90; }

            mesh4.position.y = n * 10;
            mesh4.matrixAutoUpdate = false;
            mesh4.updateMatrix();
            mesh4.receiveShadow = true;
            group4.add(mesh4);
        }
    }
  
    scene.add(tower1, group1, group2, group3, group4);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,  window.innerHeight);
    document.body.appendChild(renderer.domElement);
}
  
function loop() {
    window.onload = function() { document.onkeydown = move; }

    function move(piece) {
        const key = piece.which;

        switch(key) {
            case 37: //Left
                tower1.translateX(-10);
                break;
            case 38: //Up
                tower1.translateZ(-10);
                break;
            case 39: //Right
                tower1.translateX(10);
                break;
            case 40: //Down
                tower1.translateZ(10);
                break;
            default:
                alert("Press the arrows on the keyboard!");
        }
    }

    requestAnimationFrame(loop);
    renderer.render(scene, camera);
} 

init();
loop();