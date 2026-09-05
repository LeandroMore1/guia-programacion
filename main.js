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


//SECTION - mover la camara


// camera.position.z = 3;  //NOTE - la camara empieza en el centro de todo, y los objetos cargados tambien, el valor 3 hace que la camara se aleje 3 unidades del cubo hacia nuestro lado
// camera.position.x = 2
// camera.position.y = 3
camera.position.set (2,3,3) // NOTE aca directamente podemos reemplazar y poner los ejes XYZ en vez de escribir uno por uno
const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(window.innerWidth , window.innerHeight)
document.body.appendChild(renderer.domElement)


//SECTION - Cubo 


const geometry = new THREE.BoxGeometry( 1,1,1);
const material = new THREE.MeshBasicMaterial({
    color: 0xEB9449,

});  
const cubo = new THREE.Mesh(geometry , material) //NOTE - le cargo la forma (geometry) y el material al cubo
scene.add(cubo)

const wmat = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    wireframe: true, // NOTE  Habilita la malla del objeto, lo vuelve wireframe 
});  
const wireframe = new THREE.Mesh(geometry , wmat)
cubo.position.y = 0.5
cubo.add(wireframe) // NOTE - le agrego el mesh del wireframe al cubo


// SECTION - cubo 2


const cubo2 = new THREE.Mesh(geometry , material) //NOTE - le cargo la forma (geometry) y el material al cubo
scene.add(cubo2)
cubo2.position.x = 2 // NOTE - ubico el cubo 2 posiciones en el eje X, va a quedar al lado del cubo 1
cubo2.position.y = 0.5


//SECTION -  controlar camara con mouse


const controls = new OrbitControls( camera, renderer.domElement );


// SECTION - poner guias de ejes


const axesHelper = new THREE.AxesHelper( 5 ); // el 5 representa el largo de las lineas de los ejes
scene.add( axesHelper )


// SECTION poner cuadriculas para ayuda visual


const gridHelper = new THREE.GridHelper( 5,5) // NOTE los numeros de los parentesis indican el tamaño de la grillag
scene.add(gridHelper)


// SECTION poner un plano (piso)


// NOTE creamos el texture loader, es para poder instanciar la textura que vamos a usar
const textureLoader = new THREE.TextureLoader()
const texturaPiso = textureLoader.load("./assets/textura.jpg") // NOTE asigno a la textura la imagen que quiero que tenga
const geometry2 = new THREE.PlaneGeometry(10,10);
const material2 = new THREE.MeshBasicMaterial({
    map: texturaPiso // NOTE cargo la textura al piso
    // color: 0xFAA18F,
// NOTE hacer que el plano se vea de los 2 lados usar side: THREE.DoubleSide 
})
const piso = new THREE.Mesh(geometry2, material2) 
// NOTE para rotar objetos, usamos radianes: Math.PI = 180 grados
// MATH.PI / 2 = 90 GRADOS
// MATH.PI * 2 = 180 GRADOS
piso.rotation.x = -Math.PI / 2  // NOTE se le agrega el negativo a Math para que el piso mire hacia arriba
scene.add(piso)


// SECTION - limitaciones de camara


// controls.enableZoom = false // NOTE bloquea el zoom

// controls.enablePan = false // NOTE bloquea el paneo
// controls.enableRotate = false // NOTE bloquea la rotacion
// controls.autoRotate = true // NOTE hace que la camara gire automaticamente, sin el controls.update() no funciona
// controls.autoRotateSpeed = 5 // NOTE velocidad del autorotate

controls.enableDamping = true // ANCHOR hace que el movimiento de la camara "resbale" y no se detenga brucsamente
controls.dampingFactor = 0.02 // ANCHOR mientras menos sea el damping, mas resbaloso es el movimiento de la camara

// NOTE las limitaciones se manejan en radianes en rotacion eje X e Y
controls.minDistance = 2   // NOTE  limite minimo hacia donde hago zoom
controls.maxDistance = 6   // NOTE  limite maximo hacia donde hago zoom

// NOTE eje vertical, que tan arriba y abajo podemos manejar la camara: PolarAngle, empieza desde el polo superior hacia el inferior
controls.minPolarAngle = 0  // NOTE Empieza desde arriba, vista cenital
controls.maxPolarAngle = Math.PI / 2 // NOTE aca lo dejo que solo llegue hasta 90 grados, la camara va llegar que solo llegue al piso

//REVIEW - En este ejemplo de abajo la camara quedaria fija a un angulo un poco menor a 90 grados y puedo limitar la rotacion vertical ya que empieza y termina en el mismo angulo
// controls.minPolarAngle = Math.PI / 2.5 
// controls.maxPolarAngle = Math.PI / 2.5 

//NOTE eje horizontal, que tan a los costados puedo rotar la camara, el recorrido es horizontal de 360 grados, AzimuthAngle
controls.minAzimuthAngle = -Math.PI / 4 // NOTE empiezo limitando desde -90 grados
controls.maxAzimuthAngle =  Math.PI / 4 // NOTE finalizo la limitacion hasta 90 grados

//REVIEW - En este ejemplo de abajo, como el anterior la camara quedaria fija si lo seteo en el mismo valor de rotacion
// controls.minAzimuthAngle = -Math.PI / 4 
// controls.maxAzimuthAngle= Math.PI / 2.5 


//SECTION - la funcion animate levanta el render frame a frame, eso es posible gracias a requestAnimationFrame


function animate(){

    requestAnimationFrame(animate);
    controls.update() //NOTE esto se usa para el damping
    cubo.rotation.y += 0.01
    renderer.render(scene,camera)
}
animate()