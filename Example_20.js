import * as THREE from 'three';

/////////// Environment ///////////
// An agent operates on an environment,  which is defined by the Environment() constructor.
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
    setMap(map) {
        const offset = Math.floor(map.length / 2);

        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map.length; j++) {
                if (map[i][j] === "x") { this.add(new Wall(1, j - offset, -(i - offset))); }
                else if (map[i][j] === "r") { this.add(new Robot(0.5, j - offset, -(i - offset))); }
            }
        }
    }
}

class Sensor extends THREE.Raycaster {
    constructor(position, direction) {
        super();
        this.position = position;
        this.direction = direction;
        this.collision = false;
    }
}

class Robot extends THREE.Object3D {
    constructor(size, x, y) {
        super();
        this.position.x = x; 
        this.position.y = y; 
        this.sensor = new Sensor();
        this.actuator = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), new THREE.MeshBasicMaterial({ color: '#aa0000' }));
        this.actuator.commands = [];
        this.add(this.actuator);
    }
    sense(environment) {
        this.sensor.set(this.position, new THREE.Vector3(Math.cos(this.rotation.z), Math.sin(this.rotation.z), 0));
        const obstacle = this.sensor.intersectObjects(environment.children, true);

        if ((obstacle.length > 0 && (obstacle[0].distance <= 0.5))) { this.sensor.collision = true; }
        else { this.sensor.collision = false; }
    }
    plan() {
        this.actuator.commands = [];

        if (this.sensor.collision == true) { this.actuator.commands.push('rotateCCW'); }
        else { this.actuator.commands.push('goStraight'); }
    }
    act() {
        const command = this.actuator.commands.pop();

        if (command === undefined) { console.log('Undefined command'); }
        else if (command in this.operations) { this.operations[command](this); }
        else { console.log('Unknow Command'); }
    }
}

// The possible operations are goStraight(), rotateCW(), rotateCCW()
Robot.prototype.operations = {}; 

Robot.prototype.operations.goStraight = function(robot, distance) {
    if (distance === undefined) {
        distance = 0.05;
        robot.position.x += distance * Math.cos(robot.rotation.z);
        robot.position.y += distance * Math.sin(robot.rotation.z);
    }
}

Robot.prototype.operations.rotateCW = function(robot, angle) {
    if (angle === undefined) {
        angle = -Math.PI / 2;
        robot.rotation.z += angle;
    }
}

Robot.prototype.operations.rotateCCW = function(robot, angle) {
    if(angle === undefined) {
        angle = Math.PI / 2;
        robot.rotation.z += angle;
    }
}

class Wall extends THREE.Object3D {
    constructor(size, x, y) {
        super();
        this.add(new THREE.Mesh(new THREE.BoxGeometry(size, size, size), new THREE.MeshNormalMaterial()));
        this.size = size;
        this.position.x = x;
        this.position.y = y;
    }
}

function setup(){
    const mapa = new Array(); 

    mapa[0] =   "xxxxxxxxxxxxxxxxxxxxxxxxx"; 
    mapa[1] =   "xr               r      x"; 
    mapa[2] =   "x                       x"; 
    mapa[3] =   "x                       x"; 
    mapa[4] =   "x                       x"; 
    mapa[5] =   "x                       x"; 
    mapa[6] =   "x                       x"; 
    mapa[7] =   "x                       x"; 
    mapa[8] =   "xxxx   xxxxxxxxxxxxxxxxxx"; 
    mapa[9] =   "x         r             x"; 
    mapa[10] =  "x                       x"; 
    mapa[11] =  "x                       x"; 
    mapa[12] =  "x      r                x"; 
    mapa[13] =  "x                       x"; 
    mapa[14] =  "xxxxxxxxxxxxxxxxx    xxxx"; 
    mapa[15] =  "x                       x"; 
    mapa[16] =  "x     r                 x"; 
    mapa[17] =  "x                       x"; 
    mapa[18] =  "x                       x"; 
    mapa[19] =  "x                       x"; 
    mapa[20] =  "x xxxx                  x"; 
    mapa[21] =  "x    r                  x"; 
    mapa[22] =  "x                       x"; 
    mapa[23] =  "x     r                 x"; 
    mapa[24] =  "xxxxxxxxxxxxxxxxxxxxxxxxx"; 

    environment = new Environment(); 
    environment.setMap(mapa); 
    camera = new THREE.PerspectiveCamera(); 
    camera.position.z = 30; 
    renderer = new THREE.WebGLRenderer(); 
    renderer.setSize(window.innerWidth * 0.5, window.innerHeight); 
    document.body.appendChild(renderer.domElement); 
    environment.add(camera); 
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