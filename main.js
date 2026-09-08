import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';


const scene = new THREE.Scene()
scene.background = new THREE.Color()

scene.background = new THREE.Color(0x99deed)

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
renderer.shadowMap.enabled = true // NOTE - activo las sombras
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
cubo.position.x = 4 
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
const material3 = new THREE.MeshStandardMaterial({ // NOTE en este se le agrega un mesh para ponerle iluminacion
    color: 0x87AA1A
})
const material4 = new THREE.ShadowMaterial({ // NOTE hace que el piso este integrado en el fondo para simular el fondo, vuelve transparente al piso
    opacity: 0.2
})
const piso = new THREE.Mesh(geometry2, material4) 
// NOTE para rotar objetos, usamos radianes: Math.PI = 180 grados
// MATH.PI / 2 = 90 GRADOS
// MATH.PI * 2 = 180 GRADOS
piso.receiveShadow = true
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


// SECTION TEXTURAS 


const textureLoader2 = new THREE.TextureLoader();

const colorTextura = textureLoader2.load('./assets/color.jpg') // NOTE toma el color de la textura
const disp = textureLoader2.load('./assets/disp.png') // NOTE  cargo el displacer

const exrLoader = new EXRLoader()
const normal = exrLoader.load('./assets/norm.exr') // NOTE cargo la normal
const rough = exrLoader.load('./assets/rough.exr') // NOTE carga la rugosidad de la textura, que tan rugosos se ven los bordes


// SECTION - esfera


const geometrySphere = new THREE.SphereGeometry(0.7 , 128, 128);
const materialSphere = new THREE.MeshStandardMaterial({
    // color: 0xcdc5bc ,
    map: colorTextura,
    normalMap: normal, // NOTE simula la textura, genera los relieves y marca la info de luz y sombra
    displacementMap: disp, // NOTE deforma la forma y genera profundidad
    displacementScale: 0.085, // NOTE configura que tanto se deforma el displacement
    roughnessMap: rough, // NOTE le da detalle a las piedras, se nota mas el detalle de la piedra
    metalness: 0,
    roughness: 0.2
})
const sphere = new THREE.Mesh( geometrySphere , materialSphere)
sphere.castShadow = true  // NOTE activo la sombras
sphere.receiveShadow = true 

sphere.position.y = 0.7
scene.add(sphere)


// SECTION - Iluminacion


// REVIEW  Hemispherelight, suaviza las iluminaciones - NO proyecta sombras

const ambiente = new THREE.HemisphereLight(0x9ED7F6, 0x5f7800, 0.2) // NOTE los argumentos son: color del cielo o superior, color de parte de abajo del objeto, es la sombra del objeto y el ultimo argumento intensidad de color, empieza a cobrar sentido con luces direccionales
scene.add(ambiente)

// REVIEW directionalLight (luz direccional, simula la del "sol")

const principal = new THREE.DirectionalLight(0xFFF6DB, 2.5) // NOTE el segundo argumento es la intensidad 
principal.position.set(-3,4,1) // NOTE ubico la luz principal
principal.castShadow = true // NOTE habilito que la iluminacion castee sombras
principal.shadow.mapSize.set(2048,2048) // NOTE calidad del mapa de sombra (512, 1024, 2048 o 4096)
principal.shadow.radius = 2// NOTE afecta el difuminado de la sombra del obj
scene.add(principal)
const helper = new THREE.DirectionalLightHelper(principal , 2) // NOTE muestra una guia para la luz, el segundo argumento es el tamaño de la guia
scene.add(helper)


// REVIEW pointLight (recibe color, intensidad y distancia)

const recorte = new THREE.PointLight( 0xff0000, 5, 10 ); // NOTE el brillo rojo en la piedra es el point light, mientras mas distancia le pongamos (el 50) mas cubre al objeto, el 5 es la intensidad
recorte.position.set( -2, 2, 1 );
scene.add( recorte );




// REVIEW se lo cargo al material de la esfera

const materialTexturas = new THREE.MeshStandardMaterial({
    color: 0xcdc5bd,
    metalness: 1,
    roughness: 0.2
})


//SECTION - la funcion animate levanta el render frame a frame, eso es posible gracias a requestAnimationFrame


function animate(){

    requestAnimationFrame(animate);
    controls.update() //NOTE esto se usa para el damping
    cubo.rotation.y += 0.01
    renderer.render(scene,camera)
}
animate()