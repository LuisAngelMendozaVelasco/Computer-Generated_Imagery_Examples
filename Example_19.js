import * as THREE from 'three';

/////////// Environment ///////////
class Environment extends THREE.Scene {
    constructor() { super(); }
    // The interface between the environment and the agents will be given by the following methods:
    // this.children is the array where the objects are placed within the scene
    sense() {
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].sense !== undefined) { this.children[i].sense(this); }
        }
    }
    plan() {
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].plan !== undefined) { this.children[i].plan(this); }
        }
    }
    act() {
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].act !== undefined) { this.children[i].act(this); }
        }
    }
}

/////////// Ball ///////////
class Ball extends THREE.Object3D {
    constructor(r, x = 0, y = 0) {
        super();
        this.add(new THREE.Mesh(new THREE.SphereGeometry(r), new THREE.MeshNormalMaterial()));
        this.step = 0.1;
        this.colision = 0;
        this.radius = r;
        this.position.x = x;
        this.position.y = y;
        // Raycaster is a line that allows to detect the face of an object. Depending on the direction the Raycaster changes as well.
        this.sensor = new THREE.Raycaster(this.position, new THREE.Vector3(1, 0, 0));
    }
    sense(environment) {
        this.sensor.set(this.position, new THREE.Vector3(1, 0, 0));
        const obstacle1 = this.sensor.intersectObjects(environment.children, true);

        this.sensor.set(this.position, new THREE.Vector3(-1, 0, 0));
        const obstacle2 = this.sensor.intersectObjects(environment.children, true);

        if ((obstacle1.length > 0 && (obstacle1[0].distance <= this.radius)) || (obstacle2.length > 0 && (obstacle2[0].distance <= this.radius)))
            this.colision = 1;

        else
            this.colision = 0;
    }
    act() {
        if (this.colision == 1) { this.step = -this.step; }

        this.position.x += this.step;
    }
}

/////////// Wall ///////////
// The walls that the ball bounces off are not agents, so they can simply be of type Object3D
class Wall extends THREE.Object3D {
    constructor(size, x = 0, y = 0) {
        super();
        this.add(new THREE.Mesh(new THREE.BoxGeometry(size, size, size), new THREE.MeshNormalMaterial()));
        this.size = size;
        this.position.x = x;
        this.position.y = y;
    }
}

function setup(){
    environment = new Environment(); 
    camera = new THREE.PerspectiveCamera(); 
    camera.position.z = 20;
    environment.add(camera);
    environment.add(new Wall(1, 7, 0));
    environment.add(new Wall(1, -7, 0));
    environment.add(new Wall(1, 7, 1));
    environment.add(new Wall(1, -7, 1)); 
    environment.add(new Wall(1, 7, -1)); 
    environment.add(new Wall(1, -7, -1)); 
    environment.add(new Ball(0.5));
    environment.add(new Ball(0.9, 2, 0));
    renderer = new THREE.WebGLRenderer(); 
    renderer.setSize(window.innerWidth * 0.5, window.innerHeight); 
    document.body.appendChild(renderer.domElement); 
}

function loop(){
    requestAnimationFrame(loop); 
    environment.sense();
    environment.plan();
    environment.act();
    renderer.render(environment, camera); 
}

var environment, camera, renderer;
 
setup();
loop();