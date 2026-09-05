import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene()

scene.background = new THREE.Color(0xFFE5CF)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1, // near
    1000 // far
)


//NOTE - mover la camara


camera.position.z = 3;  //REVIEW - la camara empieza en el centro de todo, y los objetos cargados tambien, 
                       //REVIEW - el valor 3 hace que la camara se aleje 3 unidades del cubo hacia nuestro lado
const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(window.innerWidth , window.innerHeight)
document.body.appendChild(renderer.domElement)


//NOTE - Cubo 


const geometry = new THREE.BoxGeometry( 1,1,1);
const material = new THREE.MeshBasicMaterial({
    color: 0xEB9449,

});  
const cubo = new THREE.Mesh(geometry , material) //REVIEW - le cargo la forma (geometry) y el material al cubo
scene.add(cubo)

const wmat = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    wireframe: true, // REVIEW  Habilita la malla del objeto, lo vuelve wireframe 
});  
const wireframe = new THREE.Mesh(geometry , wmat)
cubo.add(wireframe) // REVIEW - le agrego el mesh del wireframe al cubo

// NOTE - cubo 2

const cubo2 = new THREE.Mesh(geometry , material) //REVIEW - le cargo la forma (geometry) y el material al cubo
scene.add(cubo2)
cubo2.position.x = 2 // REVIEW - ubico el cubo 2 posiciones en el eje X, va a quedar al lado del cubo 1


//NOTE -  controlar camara con mouse


const controls = new OrbitControls( camera, renderer.domElement );

// NOTE - poner guias de ejes


const axesHelper = new THREE.AxesHelper( 5 ); // el 5 representa el largo de las lineas de los ejes
scene.add( axesHelper )


// NOTE poner cuadriculas para ayuda visual

const gridHelper = new THREE.GridHelper( 5,5) // REVIEW los numeros de los parentesis indican el tamaño de la grillag
scene.add(gridHelper)


//NOTE - la funcion animate levanta el render frame a frame, eso es posible gracias a requestAnimationFrame


function animate(){

    requestAnimationFrame(animate);
    cubo.rotation.y += 0.01
    renderer.render(scene,camera)
}
animate()