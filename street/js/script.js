var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 35, window.innerWidth/window.innerHeight, 0.1, 1000 );
// var camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );

var renderer = new THREE.WebGLRenderer({antialias: true, alpha:true, transparent:true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 20;
// controls
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enablePan = false;

// light
var light = new THREE.AmbientLight( 0xffffff );
light.intensity = 2;
scene.add( light );


//
// video plane
var texture = new THREE.VideoTexture( videoEl );
var geometry = new THREE.PlaneBufferGeometry( 19.2, 10.8, 100, 100 );
bgmaterial = new THREE.MeshStandardMaterial( { 
map : texture
} );
vplane = new THREE.Mesh( geometry, bgmaterial );
vplane.position.set(0,0,-0.01)
scene.add( vplane );
// vplane.material.depthWrite = false;
//
var geometry = new THREE.PlaneGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { 
color: 0x00ff00,
// alphaMap: texture, 
// alphaTest: 0.5
 } );
var cube = new THREE.Mesh( geometry, material );
cube.position.y = 1;
// cube.position.z = -0.5;
scene.add( cube );




var animate = function () {
// vplane.material.displacementMap.needsUpdate = true;

	requestAnimationFrame( animate );

	// cube.positin.x = Math.cos(2);
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );
};

animate();