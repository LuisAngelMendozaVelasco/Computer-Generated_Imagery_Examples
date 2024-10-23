import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

var camera, scene, renderer; 
var tower1, tower2, tower3, tower4; 
var king1, king2;
var black_pawn1, black_pawn2, black_pawn3, black_pawn4, black_pawn5, black_pawn6, black_pawn7, black_pawn8; 
var white_pawn1, white_pawn2, white_pawn3, white_pawn4, white_pawn5, white_pawn6, white_pawn7, white_pawn8; 
var mesh1, mesh2; 

const prototype = new Object(); 
scene = new THREE.Scene();
scene.rotateX(Math.PI * 0.7);
camera = new THREE.PerspectiveCamera(); 
camera.position.set(45, -30, 200); 

prototype.TowerGeometry = function() {
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
    
    return tower
}

const cube = new THREE.BoxGeometry(10, 10, 10); 

prototype.ChessboardGeometry1 = function(){
    const texture3 = new THREE.TextureLoader().load('./images/white_ceramic.jpg'); 
    const texture4 = new THREE.TextureLoader().load('./images/black_ceramic.jpg'); 
    const white_ceramic = new THREE.MeshBasicMaterial({map: texture3}); 
    const black_ceramic = new THREE.MeshBasicMaterial({map: texture4}); 
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
                this.add(mesh1); 
            }

            k++; 
        }

        k++; 
    }
    
    var k = 0;

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (k%2 == 0){
                mesh2 = new THREE.Mesh(cube, black_ceramic); 
                mesh2.position.x = (j + 1) * 10; // Columns
                mesh2.position.y = (i + 1) * 10; // Rows
                mesh2.matrixAutoUpdate = false; 
                mesh2.updateMatrix(); 
                mesh2.receiveShadow = true; 
                this.add(mesh2); 
            }

            k++; 
        }

        k++; 
    }
}

prototype.ChessboardGeometry2 = function(){
    const texture5 = new THREE.TextureLoader().load('./images/wood.jpg'); 
    const wood = new THREE.MeshBasicMaterial({map: texture5}); 
    
    for (var l = 0; l < 10; l++) { // Columns
        for (var m = 0; m < 2; m++) { // Rows
            const mesh3 = new THREE.Mesh(cube, wood);

            if (m == 1) {mesh3.position.y = 90;}

            mesh3.position.x = l * 10; 
            mesh3.matrixAutoUpdate = false; 
            mesh3.updateMatrix(); 
            mesh3.receiveShadow = true; 
            this.add(mesh3); 
        }
    }
    
    for (var n = 1; n < 9; n++) { // Rows
        for (var o = 0; o < 2; o++) { // Columns
            const mesh4 = new THREE.Mesh(cube, wood);

            if (o == 1) {mesh4.position.x = 90;}

            mesh4.position.y = n * 10
            mesh4.matrixAutoUpdate = false; 
            mesh4.updateMatrix(); 
            mesh4.receiveShadow = true; 
            this.add(mesh4); 
        }
    }
}

prototype.PawnGeometry = function(){
    // Geometries
    const pawn_base1 = new THREE.CylinderGeometry(5, 5, 2, 20); // Height = 2
    const pawn_base2 = new THREE.TorusGeometry(3, 1.5, 20, 100); // Height = 4
    pawn_base2.rotateX(Math.PI / 2); 
    pawn_base2.translate(0, 1, 0); 
    const column = new THREE.CylinderGeometry(3.5, 3.5, 8, 10); 
    column.translate(0, 6, 0); 
    const pawn_top1 = new THREE.CylinderGeometry(4, 4, 1, 20); // Height = 9
    pawn_top1.translate(0, 10, 0); 
    const pawn_top2 = new THREE.SphereGeometry(3.5, 20, 20); 
    pawn_top2.translate(0, 12, 0); 

    const geometries = [];

    geometries[0] = pawn_base1;
    geometries[1] = pawn_base2;
    geometries[2] = column;
    geometries[3] = pawn_top1;
    geometries[4] = pawn_top2;

    const pawn = BufferGeometryUtils.mergeGeometries(geometries);

    return pawn;
}

prototype.KingGeometry = function(){
    const king_points = []; 
    
    king_points.push(new THREE.Vector2(0, 0)); 
    king_points.push(new THREE.Vector2(20, 0)); 
    king_points.push(new THREE.Vector2(20, 10)); 
    king_points.push(new THREE.Vector2(15, 10)); 
    king_points.push(new THREE.Vector2(15, 15)); 
    king_points.push(new THREE.Vector2(10, 15)); 
    king_points.push(new THREE.Vector2(5, 60)); 
    king_points.push(new THREE.Vector2(20, 60)); 
    king_points.push(new THREE.Vector2(20, 65)); 
    king_points.push(new THREE.Vector2(10, 65)); 
    king_points.push(new THREE.Vector2(10, 70)); 
    king_points.push(new THREE.Vector2(15, 70)); 
    king_points.push(new THREE.Vector2(15, 80)); 
    king_points.push(new THREE.Vector2(10, 80)); 
    king_points.push(new THREE.Vector2(20, 100)); 
    king_points.push(new THREE.Vector2(0, 100)); 
    
    var king_base = new THREE.LatheGeometry(king_points); 
    var vertical = new THREE.BoxGeometry(10, 20, 10); 
    var horizontal = new THREE.BoxGeometry(20, 10, 10);

    vertical.translate(0, 110, 0); 
    horizontal.translate(0, 110, 0); 

    const geometries = [];

    geometries[0] = king_base;
    geometries[1] = vertical;
    geometries[2] = horizontal;

    const king = BufferGeometryUtils.mergeGeometries(geometries);

    return king;
}

prototype.KingGeometry.prototype = new THREE.BufferGeometry();
prototype.PawnGeometry.prototype = new THREE.BufferGeometry(); 
prototype.ChessboardGeometry1.prototype = new THREE.Group(); 
prototype.ChessboardGeometry2.prototype = new THREE.Group(); 
prototype.TowerGeometry.prototype = new THREE.BufferGeometry();

prototype.setup = function(){
    // Texture
    var texture1 = new THREE.TextureLoader().load('./images/white_marble.jpg'); 
    var texture2 = new THREE.TextureLoader().load('./images/black_marble.jpg'); 
    var white_marble = new THREE.MeshBasicMaterial({map: texture1}); 
    var black_marble = new THREE.MeshBasicMaterial({map: texture2}); 

    // Figures
    // tower1
    tower1 = new THREE.Mesh(new prototype.TowerGeometry(), white_marble);
    tower1.position.set(10, 10, -5);
    tower1.scale.set(0.05, 0.05, 0.05); 
    tower1.rotateX(-Math.PI / 2); 

    // tower2
    tower2 = new THREE.Mesh(new prototype.TowerGeometry(), white_marble);
    tower2.position.set(10, 80, -5);
    tower2.scale.set(0.05, 0.05, 0.05); 
    tower2.rotateX(-Math.PI / 2); 

    // tower3
    tower3 = new THREE.Mesh(new prototype.TowerGeometry(), black_marble);
    tower3.position.set(80, 10, -5);
    tower3.scale.set(0.05, 0.05, 0.05); 
    tower3.rotateX(-Math.PI / 2); 

    // tower4
    tower4 = new THREE.Mesh(new prototype.TowerGeometry(), black_marble);
    tower4.position.set(80, 80, -5);
    tower4.scale.set(0.05, 0.05, 0.05); 
    tower4.rotateX(-Math.PI / 2); 

    // King2
    king2 = new THREE.Mesh(new prototype.KingGeometry(), black_marble);
    king2.position.set(80, 50, -5);
    king2.scale.set(0.175, 0.175, 0.175); 
    king2.rotateX(-Math.PI / 2); 

    // King1
    king1 = new THREE.Mesh(new prototype.KingGeometry(), white_marble);
    king1.position.set(10, 50, -5);
    king1.scale.set(0.175, 0.175, 0.175); 
    king1.rotateX(-Math.PI / 2);    

    // black_pawn1
    black_pawn1 = new THREE.Mesh(new prototype.PawnGeometry(), black_marble);
    black_pawn1.rotateX(-Math.PI / 2);
    black_pawn1.position.set(70, 10, -5);

    // black_pawn2
    black_pawn2 = new THREE.Mesh(new prototype.PawnGeometry(), black_marble); 
    black_pawn2.rotateX(-Math.PI / 2);
    black_pawn2.position.set(70, 20, -5);

    // black_pawn3
    black_pawn3 = new THREE.Mesh(new prototype.PawnGeometry(), black_marble); 
    black_pawn3.rotateX(-Math.PI / 2);
    black_pawn3.position.set(70, 30, -5);

    // black_pawn4
    black_pawn4 = new THREE.Mesh(new prototype.PawnGeometry(), black_marble); 
    black_pawn4.rotateX(-Math.PI / 2);
    black_pawn4.position.set(70, 40, -5);   

    // black_pawn5
    black_pawn5 = new THREE.Mesh(new prototype.PawnGeometry(), black_marble); 
    black_pawn5.rotateX(-Math.PI / 2);
    black_pawn5.position.set(70, 50, -5);

    // black_pawn6
    black_pawn6 = new THREE.Mesh(new prototype.PawnGeometry(), black_marble); 
    black_pawn6.rotateX(-Math.PI / 2); 
    black_pawn6.position.set(70, 60, -5);  

    // black_pawn7
    black_pawn7 = new THREE.Mesh(new prototype.PawnGeometry(), black_marble); 
    black_pawn7.rotateX(-Math.PI / 2);
    black_pawn7.position.set(70, 70, -5); 

    // black_pawn8
    black_pawn8 = new THREE.Mesh(new prototype.PawnGeometry(), black_marble); 
    black_pawn8.rotateX(-Math.PI / 2);
    black_pawn8.position.set(70, 80, -5);

    // white_pawn1
    white_pawn1 = new THREE.Mesh(new prototype.PawnGeometry(), white_marble); 
    white_pawn1.rotateX(-Math.PI / 2);
    white_pawn1.position.set(20, 10, -5); 

    // white_pawn2
    white_pawn2 = new THREE.Mesh(new prototype.PawnGeometry(), white_marble); 
    white_pawn2.rotateX(-Math.PI / 2);
    white_pawn2.position.set(20, 20, -5);

    // white_pawn3
    white_pawn3 = new THREE.Mesh(new prototype.PawnGeometry(), white_marble); 
    white_pawn3.rotateX(-Math.PI / 2);
    white_pawn3.position.set(20, 30, -5); 

    // white_pawn4
    white_pawn4 = new THREE.Mesh(new prototype.PawnGeometry(), white_marble); 
    white_pawn4.rotateX(-Math.PI / 2);
    white_pawn4.position.set(20, 40, -5);

    // white_pawn5
    white_pawn5 = new THREE.Mesh(new prototype.PawnGeometry(), white_marble); 
    white_pawn5.rotateX(-Math.PI / 2);
    white_pawn5.position.set(20, 50, -5);

    // white_pawn6
    white_pawn6 = new THREE.Mesh(new prototype.PawnGeometry(), white_marble); 
    white_pawn6.rotateX(-Math.PI / 2);
    white_pawn6.position.set(20, 60, -5); 

    // white_pawn7
    white_pawn7 = new THREE.Mesh(new prototype.PawnGeometry(), white_marble); 
    white_pawn7.rotateX(-Math.PI / 2);
    white_pawn7.position.set(20, 70, -5);

    // white_pawn8
    white_pawn8 = new THREE.Mesh(new prototype.PawnGeometry(), white_marble); 
    white_pawn8.rotateX(-Math.PI / 2);
    white_pawn8.position.set(20, 80, -5);

    scene.add(tower1, tower2, tower3, tower4);
    scene.add(king1, king2);
    scene.add(new prototype.ChessboardGeometry1(), new prototype.ChessboardGeometry2());
    scene.add(black_pawn1, black_pawn2, black_pawn3, black_pawn4, black_pawn5, black_pawn6, black_pawn7, black_pawn8); 
    scene.add(white_pawn1, white_pawn2, white_pawn3, white_pawn4, white_pawn5, white_pawn6, white_pawn7, white_pawn8); 
    renderer = new THREE.WebGLRenderer(); 
    renderer.setSize(window.innerWidth, window.innerHeight); 
    document.body.appendChild(renderer.domElement); 
}

prototype.loop = function(){
    requestAnimationFrame(prototype.loop); 
    renderer.render(scene, camera); 
}

prototype.setup(); 
prototype.loop(); 