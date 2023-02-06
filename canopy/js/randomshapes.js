var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var num = 0;
//
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 25;
camera.position.x = 13;
camera.lookAt(0,0,0)



//
group = new THREE.Group();
scene.add(group)

//
var radius = 20;
var radials = 1;
var circles = 1;
var divisions = 64;

var disc = new THREE.PolarGridHelper( radius, radials, circles, divisions );
disc.rotation.x = Math.PI/2;
scene.add( disc );


// remove group children
function clrpoints(){
	for( var i = group.children.length - 1; i >= 0; i--) { 
	     obj = group.children[i];
	     group.remove(obj); 
	}
}


// add point with letter
function addpoint(){
	num++;
	var geometry = new THREE.BoxGeometry(num, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0xff0000,
	 transparent:true,
	 opacity:0.4 } );
	var cube = new THREE.Mesh( geometry, material );
	cube.rotation.set(0,0,Math.PI*Math.random(num)*2)
	cube.scale.set(Math.random(),Math.PI*Math.random(),Math.PI*Math.random(num)*2)
	group.add( cube );
}


// handle window resize
window.addEventListener('resize', function(){
	renderer.setSize( WIDTH, HEIGHT );
	camera.aspect	= WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}, false)


var animate = function () {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
};

animate();	