import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const container = document.getElementById("bees-container");
const canvas = document.getElementById("bees-canvas");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

scene.add(new THREE.AmbientLight(0xffffff, 1));

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 5, 5);
scene.add(light);

const root = new THREE.Group();
scene.add(root);

let model;
let mixer;

// -----------------------------
// SCREEN → WORLD HELPER
// -----------------------------
function getWorldFromScreen(x, y, camera, distance) {
  const v = new THREE.Vector3(x, y, 0.5);
  v.unproject(camera);

  const dir = v.sub(camera.position).normalize();
  return camera.position.clone().add(dir.multiplyScalar(distance));
}

// anchors
const STARTING_POSITION = { x: 0.5, y: 0.25 };
const CENTER = { x: 0, y: -0.75 };
const END_POSITION = { x: 0.75, y: -0.75 };

// -----------------------------
// LOAD MODEL
// -----------------------------
new GLTFLoader().load("/assets/glb/bee.glb", (gltf) => {
  model = gltf.scene;

  // center model
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  model.position.sub(center);

  model.scale.set(0.4, 0.4, 0.4);
  model.rotation.y = THREE.MathUtils.degToRad(70);

  const beesYCoords = [0.03, 0, -0.03];
  const clones = [];

  for (let i = 0; i < 3; i++) {
    const clone = model.clone(true);
    clone.position.set(
      -0.11,
      beesYCoords[i] + (Math.random() * (0.002 + 0.002) + 0.002),
      0,
    );
    root.add(clone);
    clones.push(clone);
  }

  // camera framing
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

  camera.position.z = cameraZ * 1.6;
  camera.position.y = cameraZ * 0.2;

  camera.lookAt(0, 0, 0);

  const distance = camera.position.distanceTo(model.position);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".glb-anim",
      start: "bottom-=50svh bottom",
    },
  });

  tl.add("start");

  tl.to(
    clones.map((c) => c.position),
    {
      x: 0.11,
      duration: 1,
      stagger: (index) => {
        if (index === 1) return 0.85;
        return 0.5;
      },
      ease: "none",
    },
    "start",
  );

  const intensity = 0.1;

  tl.to(
    clones.map((c) => c.rotation),
    {
      x: `+=${intensity}`,
      y: `-=${intensity}`,
      duration: 0.15,
      repeat: -1,
      yoyo: true,
      ease: "none",
    },
    "start",
  );
});

// -----------------------------
// RESIZE
// -----------------------------
window.addEventListener("resize", () => {
  const w = container.clientWidth;
  const h = container.clientHeight;

  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  renderer.setSize(w, h);
});

// -----------------------------
// RENDER LOOP
// -----------------------------
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
