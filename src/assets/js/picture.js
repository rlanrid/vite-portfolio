// import * as THREE from "https://cdn.skypack.dev/three@0.124.0";
// import { OrbitControls } from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/controls/OrbitControls";

// export function picture() {
//     const vertexShader = `
//     uniform float iter;
//     uniform vec2 currentMouse;
//     varying vec2 vUv;
//     varying vec3 vPosition;

//     // From THREE…
//     // uniform vec3 cameraPosition;
//     // attribute vec3 position;
//     // attribute vec2 uv;

//     void main() {
//         float dist = distance(position.x, currentMouse.x);
//         float distPct = dist / 5.0;

//         vec3 adjustedPosition = vec3(
//             position.x,
//             position.y,
//             position.z + sin(iter * 0.03 + uv.x*0.1) * distPct*0.2
//         );

//         vec4 mvPosition = modelViewMatrix * vec4(adjustedPosition, 1.0);

//         vUv = uv;
//         vPosition = adjustedPosition;

//         gl_Position = projectionMatrix * mvPosition;
//     }
//     `;
//     const fragmentShader = `
//     uniform sampler2D imageTexture;
//     uniform float iter;
//     uniform vec2 currentMouse;
//     varying vec2 vUv;
//     varying vec3 vPosition;

//     // From THREE…
//     // uniform vec3 cameraPosition;

//     void main() {
//         float u = vUv.x;
//         float v = vUv.y;
//         vec2 newUv = vec2(u, v);

//         float dist = distance(vPosition.x - v*0.5, currentMouse.x);
//         float distPct = 15.0 / dist;
//         float distColorShift = distPct;

//         float r = 1.0 - vPosition.z * 0.02 - distColorShift;
//         float g = 1.0 - distColorShift;
//         float b = 1.0 - vPosition.z * 0.02;

//         vec3 texture = vec3(r, g, b);

//         gl_FragColor = vec4(texture, vPosition.z * 0.031 + 1.2);
//     }
//     `;

//     class ThreeText {
//         constructor(
//             options = {
//                 appContainerSelector: "#picture"
//             }
//         ) {
//             this.options = options;
//             this.appContainer = document.querySelector(
//                 this.options.appContainerSelector
//             );
//             this.iter = 0;

//             // THREE items
//             this.renderer;
//             this.camera;
//             this.scene;
//             this.controls;
//             this.imageTexture;
//             this.uniforms;
//             this.geometry;
//             this.mesh;
//             this.font;

//             this.targetMeshScale = 1;

//             // 마우스
//             this.currentMouse = {
//                 x: 0,
//                 y: 0
//             };
//             this.targetMouse = {
//                 x: 0,
//                 y: 0
//             };

//             // 설정
//             this.settings = {
//                 cameraDistance: 100,
//                 bgColor: 0x070707,
//                 mouseEase: 0.05,
//                 blobMinScale: 1,
//                 blobMaxScale: 2,
//                 blobScaleEase: 0.05,
//                 blobInflate: 0.015,
//                 blobDeflate: 0.01
//             };

//             this.init();
//         }

//         init = async () => {
//             await this.loadTexture();
//             this.createUniforms();
//             this.createApp();

//             // Load font
//             const fontLoader = new THREE.FontLoader();
//             fontLoader.load(
//                 "https://assets.codepen.io/66496/noe-display-medium.json",
//                 (loadedFont) => {
//                     this.font = loadedFont;

//                     this.createItems();
//                     this.addEventListeners();
//                     this.update();
//                 }
//             );
//         };

//         loadTexture = async () => {
//             this.imageTexture = await new THREE.TextureLoader().load(
//                 "https://assets.codepen.io/66496/temple-ranch-hero.jpg"
//             );
//         };

//         createUniforms = () => {
//             this.uniforms = {
//                 imageTexture: {
//                     value: this.imageTexture
//                 }
//             };
//             this.updateUniforms();
//         };

//         updateUniforms = () => {
//             Object.assign(
//                 this.uniforms, {}, {
//                 iter: {
//                     value: this.iter
//                 },
//                 currentMouse: {
//                     value: this.currentMouse
//                 }
//             }
//             );
//         };

//         createApp = () => {
//             // 렌더링
//             this.renderer = new THREE.WebGLRenderer({ devicePixelRatio: 1.5, antialias: true });
//             this.renderer.setSize(this.appContainer.offsetWidth, this.appContainer.offsetHeight);
//             this.appContainer.appendChild(this.renderer.domElement);

//             // 카메라 설정
//             this.camera = new THREE.PerspectiveCamera(45, this.appContainer.offsetWidth / this.appContainer.offsetHeight, 1, 10000);
//             this.camera.position.set(-3, 2, this.settings.cameraDistance);
//             this.scene = new THREE.Scene();
//             this.scene.background = new THREE.Color(this.settings.bgColor);

//             // 움직임 컨트롤
//             this.controls = new OrbitControls(this.camera, this.renderer.domElement);
//             this.controls.enableKeys = false;
//             this.controls.enableZoom = false;
//             this.controls.enableDamping = false;

//             // 조명 설정
//             let ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
//             this.scene.add(ambientLight);

//             // 조명 설정
//             let directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
//             directionalLight.position.set(5, 3, 2);
//             directionalLight.target.position.set(0, 0, 0);
//             this.scene.add(directionalLight);
//         };

//         createItems = () => {
//             // 지오메트리
//             const imageRatio = 1304 / 2000;
//             const imageWidth = 60;
//             this.geometry = new THREE.PlaneBufferGeometry(
//                 imageWidth,
//                 imageWidth * imageRatio,
//                 16 * 2,
//                 9 * 2
//             );

//             // 머터리얼 만들기
//             let shaderMaterial = new THREE.ShaderMaterial({
//                 uniforms: this.uniforms,
//                 vertexShader: vertexShader,
//                 fragmentShader: fragmentShader,
//                 depthTest: false,
//                 transparent: true,
//                 vertexColors: true,
//                 side: THREE.DoubleSide
//             });

//             const message = "DEVELOPER";
//             const shapes = this.font.generateShapes(message, 26);
//             const geometry = new THREE.ShapeBufferGeometry(shapes);
//             geometry.computeBoundingBox();
//             const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
//             const yMid = -0.2 * (geometry.boundingBox.max.y - geometry.boundingBox.min.y);
//             geometry.translate(xMid, yMid, 2);

//             this.mesh = new THREE.Mesh(geometry, shaderMaterial);
//             this.scene.add(this.mesh);

//             // 구 만들기
//             let blobGeom = new THREE.TorusGeometry(20, 5, 10, 50);
//             let blobMat = new THREE.MeshPhongMaterial({
//                 color: 0xffffff,
//                 specular: 0xffffff,
//                 shininess: 40
//             });
//             this.blobMesh = new THREE.Mesh(blobGeom, blobMat);
//             this.scene.add(this.blobMesh);

//             this.updateCamera();
//         };

//         addEventListeners = () => {
//             this.appContainer.addEventListener("mousemove", this.onMouseMove);
//         };

//         onMouseMove = (evt) => {
//             if (this.targetMeshScale <= this.settings.blobMaxScale) {
//                 this.targetMeshScale += this.settings.blobInflate;
//             }

//             let vec = new THREE.Vector3();
//             let pos = new THREE.Vector3();
//             vec.set(
//                 (evt.clientX / window.innerWidth) * 2 - 1,
//                 -(evt.clientY / window.innerHeight) * 2 + 1,
//                 0.5
//             );
//             vec.unproject(this.camera);
//             vec.sub(this.camera.position).normalize();
//             let distance = -this.camera.position.z / vec.z;
//             pos.copy(this.camera.position).add(vec.multiplyScalar(distance));

//             this.targetMouse = {
//                 x: pos.x,
//                 y: pos.y
//             };
//         };

//         updateMouse = () => {
//             const mouseDiffX = (this.targetMouse.x - this.currentMouse.x) * this.settings.mouseEase;
//             const mouseDiffY = (this.targetMouse.y - this.currentMouse.y) * this.settings.mouseEase;

//             this.currentMouse.x += mouseDiffX;
//             this.currentMouse.y += mouseDiffY;
//         };

//         updateItems = () => {
//             this.blobMesh.position.set(this.currentMouse.x, this.currentMouse.y, 0);

//             const rotateSpeed = Math.abs(this.targetMouse.x - this.currentMouse.x) * 0.002 + 0.01;
//             this.blobMesh.rotation.x += rotateSpeed;
//             this.blobMesh.rotation.y += rotateSpeed;
//             this.blobMesh.rotation.z += rotateSpeed;

//             const scaleEffect = (this.targetMeshScale - this.blobMesh.scale.x) * this.settings.blobScaleEase;
//             this.blobMesh.scale.set(
//                 this.blobMesh.scale.x + scaleEffect,
//                 this.blobMesh.scale.x + scaleEffect,
//                 this.blobMesh.scale.x + scaleEffect
//             );

//             if (this.targetMeshScale > this.settings.blobMinScale) {
//                 this.targetMeshScale -= this.settings.blobDeflate;
//             }
//         };

//         updateCamera = () => {
//             this.camera.aspect = this.appContainer.offsetWidth / this.appContainer.offsetHeight;
//             this.camera.updateProjectionMatrix();
//             this.renderer.setSize(
//                 this.appContainer.offsetWidth,
//                 this.appContainer.offsetHeight
//             );

//             const dist = this.camera.position.distanceTo(this.mesh.position);
//             const w = this.mesh.geometry.boundingBox.max.x - this.mesh.geometry.boundingBox.min.x;
//             const aspect = this.appContainer.offsetWidth / this.appContainer.offsetHeight;
//             const fov = 2 * Math.atan(w / aspect / (2 * dist)) * (180 / Math.PI); // in degrees
//             this.camera.fov = fov * 1.2;
//         };

//         update = () => {
//             this.iter++;
//             this.updateMouse();
//             this.updateUniforms();
//             this.updateCamera();
//             this.updateItems();
//             this.renderer.render(this.scene, this.camera);
//             window.requestAnimationFrame(this.update);
//         };
//     }

//     new ThreeText();
// }