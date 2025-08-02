import * as THREE from 'three';

const scene = new THREE.Scene();
const width = 120;
const height = 120;
const camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 0, 1000);

const geometry = new THREE.IcosahedronGeometry(50);
const material = new THREE.MeshPhongMaterial({ color: 0x79676B, shininess: 10, specular: 0x9fb4af, wireframe: false });
const cube = new THREE.Mesh(geometry, material);
cube.rotation.x = Number(sessionStorage.getItem("geometry-rotation-x"));
cube.rotation.y = Number(sessionStorage.getItem("geometry-rotation-y"));
scene.add(cube);

const light = new THREE.DirectionalLight(0xffffff, 1.0);
light.position.set(0, 0, 10);
light.target.position.set(0, 0, 0);
scene.add(light);

camera.position.z = 500;

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
    canvas: document.getElementById("geometry-canvas")
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(256, 256, false)
renderer.compile(scene, camera);
renderer.render(scene, camera);

const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
    const delta = clock.getDelta();
    cube.rotation.x += 0.1 * delta;
    cube.rotation.y += 0.2 * delta;
    sessionStorage.setItem("geometry-rotation-x", cube.rotation.x);
    sessionStorage.setItem("geometry-rotation-y", cube.rotation.y);

    renderer.render(scene, camera);
});

const macros = {}
renderMathInElement(document.body, {
    delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
    ],
    macros
});
