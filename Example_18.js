import * as THREE from 'three';

function Piece_object() {
    const body = new THREE.Mesh(new THREE.BoxGeometry(5, 10, 5), new THREE.MeshBasicMaterial({color: 0x0000ff}));

    this.left_leg = new THREE.Mesh(new THREE.BoxGeometry(1, 4.9, 1), new THREE.MeshBasicMaterial({color: 0xff0000}));
    this.left_leg.position.z = -1.9;
    this.left_leg.position.y = -2.5;

    this.right_leg = new THREE.Mesh(new THREE.BoxGeometry(1, 4.9, 1), new THREE.MeshBasicMaterial({color: 0x00ff00}));
    this.right_leg.position.z = 1.9;
    this.right_leg.position.y = -2.5;

    this.add(this.left_leg, this.right_leg, body);
    body.position.y = 2.5;
}

var piece, renderer, scene, camera;
Piece_object.prototype = new THREE.Object3D;

function setup() {
    scene = new THREE.Scene();
    piece = new Piece_object();
    scene.add(piece);
    camera = new THREE.PerspectiveCamera();
    camera.position.z = 20;
    camera.position.y = 2;
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth * 0.5, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function loop() {
    piece.rotateY(0.01);
    piece.left_leg.rotateZ(0.05);
    piece.right_leg.rotateZ(-0.05);
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
}

setup();
loop();