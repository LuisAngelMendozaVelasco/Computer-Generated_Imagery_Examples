import * as THREE from 'three';

const window_object = new Object();

window_object.listener = function() {
    window_object.camera.aspect = window.innerWidth / window.innerHeight;
    window_object.camera.updateProjectionMatrix();
    window_object.renderer.setSize(window.innerWidth, window.innerHeight);
}

window_object.setup = function() {
    window.addEventListener('resize', window_object.listener);
    window_object.scene = new THREE.Scene();
    window_object.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    window_object.camera.position.z = 5;
    window_object.renderer = new THREE.WebGLRenderer();
    window_object.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(window_object.renderer.domElement);
    window_object.mesh = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshNormalMaterial());
    window_object.scene.add(window_object.mesh);
}

window_object.loop = function() {
    requestAnimationFrame(window_object.loop);
    window_object.mesh.rotateX(0.05);
    window_object.mesh.rotateY(0.05);
    window_object.renderer.render(window_object.scene, window_object.camera);
}

window_object.setup();
window_object.loop();