import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const container = document.getElementById("model-container");
const canvas = document.getElementById("three-canvas");

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
new GLTFLoader().load("/assets/glb/pasieka.glb", (gltf) => {
  model = gltf.scene;

  // center model
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  model.position.sub(center);

  model.scale.set(0.4, 0.4, 0.4);
  model.rotation.z = THREE.MathUtils.degToRad(12.5);

  root.add(model);

  // camera framing
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

  camera.position.z = cameraZ * 1.6;
  camera.position.y = cameraZ * 0.2;

  camera.lookAt(0, 0, 0);

  const distance = camera.position.distanceTo(model.position);

  // --------------------------------------------------
  // INITIAL STATE: FORCE MODEL INTO TOP-RIGHT CORNER
  // --------------------------------------------------
  const startPos = getWorldFromScreen(
    STARTING_POSITION.x,
    STARTING_POSITION.y,
    camera,
    distance,
  );

  model.position.copy(startPos);

  // --------------------------------------------------
  // SCROLL: TOP-RIGHT → TOP-LEFT TRANSITION (example)
  // --------------------------------------------------
  const centerPos = getWorldFromScreen(CENTER.x, CENTER.y, camera, distance);
  const endPos = getWorldFromScreen(
    END_POSITION.x,
    END_POSITION.y,
    camera,
    distance,
  );

  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#transition-move",
        start: "top +=200px",
        end: "bottom top",
        scrub: 1,
      },
    })
    .to(model.position, {
      x: centerPos.x,
      y: centerPos.y,
      z: centerPos.z,
      ease: "none",
    })
    .to(model.rotation, {
      z: 0,
    })
    .to(
      model.scale,
      {
        x: 1,
        y: 1,
        z: 1,
        ease: "power1.out",
      },
      0,
    );
  // --------------------------------------------------
  // GLB ANIMATION SCRUB
  // --------------------------------------------------
  if (gltf.animations?.length) {
    mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(gltf.animations[0]);
    action.play();

    const proxy = { t: 0 };
    const duration = gltf.animations[0].duration;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".glb-anim",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tl.to(proxy, {
      t: duration,
      ease: "none",
      onUpdate: () => mixer.setTime(proxy.t * 0.99),
    });
  }

  // --------------------------------------------------
  // OPTIONAL: ROTATION
  // --------------------------------------------------
  gsap.to(model.rotation, {
    y: Math.PI * 2,
    duration: 25,
    repeat: -1,
    ease: "none",
  });
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
