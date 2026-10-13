import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function disposeObject(object: THREE.Object3D) {
  object.traverse(child => {
    if (!(child instanceof THREE.Mesh)) return;
    child.geometry.dispose();
    for (const material of Array.isArray(child.material) ? child.material : [child.material]) {
      for (const value of Object.values(material)) if (value instanceof THREE.Texture) value.dispose();
      material.dispose();
    }
  });
}

export async function createScene(host: HTMLElement, signal: AbortSignal) {
  const scene = new THREE.Scene();
  const loader = new GLTFLoader();
  const load = async (name: string) => {
    const response = await fetch(`/assets/glb/${name}.glb`, { signal });
    if (!response.ok) throw new Error(`Model ${name}: ${response.status}`);
    return loader.parseAsync(await response.arrayBuffer(), '/assets/glb/');
  };
  const results = await Promise.allSettled([load('pasieka-web'), load('bee')]);
  if (signal.aborted || results.some(result => result.status === 'rejected')) {
    for (const result of results) if (result.status === 'fulfilled') disposeObject(result.value.scene);
    if (signal.aborted) return () => {};
    throw new Error('Could not load the complete scene');
  }
  const jarGLTF = (results[0] as PromiseFulfilledResult<Awaited<ReturnType<typeof load>>>).value;
  const beeGLTF = (results[1] as PromiseFulfilledResult<Awaited<ReturnType<typeof load>>>).value;
  const mobile = matchMedia('(max-width: 760px)').matches;
  let renderer: THREE.WebGLRenderer;
  try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !mobile, powerPreference: 'low-power' }); }
  catch (error) { disposeObject(jarGLTF.scene); disposeObject(beeGLTF.scene); throw error; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.25 : 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  host.replaceChildren(renderer.domElement);

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, .1, 5000);
  camera.position.set(0, 0, 1800);
  let environment: THREE.WebGLRenderTarget | undefined;
  if (!mobile) {
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    environment = pmrem.fromScene(room, .04);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();
  }
  scene.add(new THREE.HemisphereLight(0xfff3d6, 0x756044, 2.2));
  const key = new THREE.DirectionalLight(0xfff3de, 3);
  key.position.set(-400, 600, 700);
  scene.add(key);

  const jarModel = jarGLTF.scene;
  const mixer = new THREE.AnimationMixer(jarModel);
  if (jarGLTF.animations[0]) {
    const action = mixer.clipAction(jarGLTF.animations[0]);
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;
    action.play();
    mixer.setTime(jarGLTF.animations[0].duration * .85);
  }
  const jarMesh = jarModel.getObjectByName('MasonJar') as THREE.Mesh;
  if (jarMesh) {
    const previous = jarMesh.material;
    jarMesh.material = new THREE.MeshPhysicalMaterial({ color: 0xc58723, metalness: .18, roughness: .25, clearcoat: 1, clearcoatRoughness: .1 });
    for (const material of Array.isArray(previous) ? previous : [previous]) material.dispose();
  }
  jarModel.updateMatrixWorld(true);
  const bounds = new THREE.Box3().setFromObject(jarMesh || jarModel);
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());
  jarModel.position.sub(center);
  const jar = new THREE.Group();
  const normalisedJar = new THREE.Group();
  normalisedJar.add(jarModel);
  normalisedJar.scale.setScalar(1 / size.y);
  jar.add(normalisedJar);
  jar.rotation.set(.06, -.3, -.16);
  scene.add(jar);

  // A small physical paper label makes the untextured jar read as a REIL product.
  const labelCanvas = document.createElement('canvas');
  labelCanvas.width = 768; labelCanvas.height = 384;
  const ctx = labelCanvas.getContext('2d')!;
  ctx.fillStyle = '#f6efd9'; ctx.fillRect(0, 0, 768, 384);
  ctx.strokeStyle = '#725222'; ctx.lineWidth = 3; ctx.strokeRect(14, 14, 740, 356);
  ctx.fillStyle = '#3b3021'; ctx.textAlign = 'center';
  const english = document.documentElement.lang === 'en';
  ctx.font = '20px Arial'; ctx.fillText(english ? 'B E E K E E P I N G   W O R K S H O P' : 'P R A C O W N I A   P S Z C Z E L A R S K A', 384, 70);
  ctx.font = '178px "PT Serif", Georgia'; ctx.fillText('reil.', 380, 248);
  ctx.font = '20px Arial'; ctx.fillText(english ? 'F R O M   B E E   T O   J A R' : 'O D   P S Z C Z O Ł Y   D O   S Ł O I K A', 384, 322);
  const labelTexture = new THREE.CanvasTexture(labelCanvas);
  labelTexture.colorSpace = THREE.SRGBColorSpace;
  const radius = Math.max(size.x, size.z) / size.y * .505;
  const label = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, .4, 48, 1, true, -1.22, 2.44), new THREE.MeshStandardMaterial({ map: labelTexture, roughness: .9, side: THREE.DoubleSide }));
  label.position.y = -.03;
  jar.add(label);

  const beeModel = beeGLTF.scene;
  const beeBounds = new THREE.Box3().setFromObject(beeModel);
  const beeSize = beeBounds.getSize(new THREE.Vector3());
  beeModel.position.sub(beeBounds.getCenter(new THREE.Vector3()));
  const bee = new THREE.Group();
  const normalisedBee = new THREE.Group();
  normalisedBee.add(beeModel);
  normalisedBee.scale.setScalar(1 / Math.max(beeSize.x, beeSize.y, beeSize.z));
  bee.add(normalisedBee);
  bee.rotation.set(.22, -.65, -.12);
  scene.add(bee);

  if (mobile) {
    scene.traverse(child => {
      if (!(child instanceof THREE.Mesh)) return;
      const simplify = (material: THREE.MeshStandardMaterial) => {
        const simple = new THREE.MeshLambertMaterial({ color: material.color, map: material.map, side: material.side, transparent: material.transparent, opacity: material.opacity });
        for (const value of Object.values(material)) if (value instanceof THREE.Texture && value !== material.map) value.dispose();
        material.dispose();
        return simple;
      };
      child.material = Array.isArray(child.material) ? child.material.map(simplify) : simplify(child.material);
    });
  }

  const heroArt = document.querySelector<HTMLElement>('.hero-art')!;
  const marker = document.querySelector<HTMLElement>('.flower-mark')!;
  const opening = document.querySelector<HTMLElement>('.opening')!;
  const flight = { progress: 0, entrance: 0, clip: .85 };
  let dirty = true;
  let visible = true;
  let disposed = false;
  let compiled = false;
  let width = innerWidth;
  let height = innerHeight;

  const updateLayout = () => {
    width = innerWidth; height = innerHeight;
    renderer.setPixelRatio(Math.min(devicePixelRatio, width <= 760 ? 1.25 : 1.75));
    renderer.setSize(width, height);
    camera.left = -width / 2; camera.right = width / 2;
    camera.top = height / 2; camera.bottom = -height / 2;
    camera.updateProjectionMatrix();
    dirty = true;
  };
  const markDirty = () => { dirty = true; };
  const entrance = gsap.to(flight, { entrance: 1, duration: 1.35, paused: true, ease: 'power2.out', onUpdate: markDirty });
  const dipper = gsap.fromTo(flight, { clip: .4 }, { clip: .85, duration: 1.4, paused: true, ease: 'power2.out', onUpdate: markDirty });
  const scroll = gsap.to(flight, {
    progress: 1, ease: 'none', onUpdate: markDirty,
    scrollTrigger: { trigger: opening, start: 'top top', end: 'bottom bottom', scrub: mobile ? .3 : .65, invalidateOnRefresh: true },
  });

  const render = () => {
    if (disposed || !compiled || !visible || document.hidden || !dirty) return;
    dirty = false;
    const canvasTop = renderer.domElement.getBoundingClientRect().top;
    const art = heroArt.getBoundingClientRect();
    const flower = marker.getBoundingClientRect();
    const progress = flight.progress;
    const jarScale = art.height * (width <= 760 ? .53 : .57);
    jar.scale.setScalar(jarScale * (.9 + .1 * flight.entrance));
    jar.position.set(art.left + art.width * .52 - width / 2, height / 2 - (art.top + art.height * .54 - canvasTop) - (1 - flight.entrance) * 60, 0);
    jar.rotation.z = -.16 + progress * .14;
    jar.rotation.y = -.3 + progress * .5 + (1 - flight.entrance) * -.3;
    mixer.setTime((jarGLTF.animations[0]?.duration || 0) * flight.clip);
    const startX = art.left + art.width * .14;
    const startY = art.top + art.height * .32;
    const endX = flower.left + flower.width * .48;
    const endY = flower.top + flower.height * .5;
    bee.position.set(THREE.MathUtils.lerp(startX, endX, progress) + Math.sin(progress * Math.PI * 2) * (width <= 760 ? 18 : 65) - width / 2, height / 2 - (THREE.MathUtils.lerp(startY, endY, progress) - canvasTop), 120);
    bee.scale.setScalar(THREE.MathUtils.lerp(Math.min(art.width * .21, 115), width <= 760 ? 95 : 195, progress) * flight.entrance);
    bee.rotation.z = -.12 + Math.sin(progress * Math.PI * 2) * .3;
    bee.rotation.y = -.65 + progress * 1.2;
    renderer.render(scene, camera);
  };
  const setRunning = () => {
    const running = compiled && visible && !document.hidden;
    if (running) { dirty = true; gsap.ticker.add(render); entrance.resume(); dipper.resume(); }
    else { gsap.ticker.remove(render); entrance.pause(); dipper.pause(); }
  };
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; setRunning(); });
  observer.observe(opening);
  window.addEventListener('scroll', markDirty, { passive: true });
  window.addEventListener('resize', updateLayout);
  document.addEventListener('visibilitychange', setRunning);
  const themeObserver = new MutationObserver(() => {
    renderer.toneMappingExposure = document.documentElement.dataset.theme === 'dark' ? 1.05 : 1.25;
    dirty = true;
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  updateLayout();

  function cleanup() {
    if (disposed) return;
    disposed = true;
    entrance.kill(); dipper.kill(); scroll.scrollTrigger?.kill(); scroll.kill();
    gsap.ticker.remove(render);
    observer.disconnect(); themeObserver.disconnect();
    window.removeEventListener('scroll', markDirty);
    window.removeEventListener('resize', updateLayout);
    document.removeEventListener('visibilitychange', setRunning);
    signal.removeEventListener('abort', cleanup);
    mixer.stopAllAction(); mixer.uncacheRoot(jarModel);
    disposeObject(scene); environment?.dispose(); renderer.dispose();
    renderer.domElement.remove();
    document.documentElement.classList.remove('scene-ready');
    host.dataset.state = 'stopped';
  }
  renderer.domElement.addEventListener('webglcontextlost', event => { event.preventDefault(); cleanup(); host.dataset.state = 'fallback'; }, { once: true });
  signal.addEventListener('abort', cleanup, { once: true });
  try { await renderer.compileAsync(scene, camera); }
  catch (error) { cleanup(); throw error; }
  if (signal.aborted || disposed) { cleanup(); return cleanup; }
  compiled = true;
  render();
  document.documentElement.classList.add('scene-ready');
  host.dataset.state = 'ready';
  setRunning();
  return cleanup;
}
