import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const canvas = document.getElementById('game');
const speedEl = document.getElementById('speed');
const altitudeEl = document.getElementById('altitude');
const heatEl = document.getElementById('heat');
const cooldownEl = document.getElementById('cooldown');

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x09152a, 0.014);

const camera = new THREE.PerspectiveCamera(68, window.innerWidth / window.innerHeight, 0.1, 1500);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;

const hemi = new THREE.HemisphereLight(0x8ecbff, 0x10223c, 1.35);
scene.add(hemi);

const sun = new THREE.DirectionalLight(0xfff2d7, 1.15);
sun.position.set(16, 28, 10);
scene.add(sun);

const moonFill = new THREE.DirectionalLight(0x7bb6ff, 0.35);
moonFill.position.set(-15, 12, -40);
scene.add(moonFill);

const sky = new THREE.Mesh(
  new THREE.SphereGeometry(700, 40, 20),
  new THREE.MeshBasicMaterial({ color: 0x11284c, side: THREE.BackSide })
);
scene.add(sky);

const sea = new THREE.Mesh(
  new THREE.PlaneGeometry(2400, 2400),
  new THREE.MeshStandardMaterial({ color: 0x0d2b4f, roughness: 0.86, metalness: 0.16 })
);
sea.rotation.x = -Math.PI / 2;
sea.position.y = -16;
scene.add(sea);

const mountainGeo = new THREE.ConeGeometry(18, 42, 7);
const mountainMat = new THREE.MeshStandardMaterial({ color: 0x25344f, roughness: 0.92 });
const mountains = new THREE.Group();
for (let i = 0; i < 90; i++) {
  const m = new THREE.Mesh(mountainGeo, mountainMat);
  m.position.set((Math.random() - 0.5) * 900, -10 + Math.random() * 8, -40 - Math.random() * 1800);
  m.scale.setScalar(0.5 + Math.random() * 2.2);
  m.rotation.y = Math.random() * Math.PI;
  mountains.add(m);
}
scene.add(mountains);

const cloudMat = new THREE.MeshBasicMaterial({ color: 0xc8def6, transparent: true, opacity: 0.2 });
const clouds = [];
for (let i = 0; i < 28; i++) {
  const cloud = new THREE.Mesh(new THREE.PlaneGeometry(36 + Math.random() * 26, 11 + Math.random() * 5), cloudMat);
  cloud.position.set((Math.random() - 0.5) * 400, 35 + Math.random() * 35, -100 - Math.random() * 1000);
  cloud.rotation.x = -0.18;
  cloud.userData.speed = 2 + Math.random() * 3;
  clouds.push(cloud);
  scene.add(cloud);
}

const trackGroup = new THREE.Group();
const obstacleGeo = new THREE.BoxGeometry(3.2, 7, 3.2);
const obstacleMat = new THREE.MeshStandardMaterial({ color: 0x394f6b, roughness: 0.84 });
const obstacles = [];
for (let i = 0; i < 180; i++) {
  const obstacle = new THREE.Mesh(obstacleGeo, obstacleMat);
  obstacle.position.set(Math.sin(i * 0.17) * 42 + (Math.random() - 0.5) * 30, -5 + Math.random() * 14, -55 - i * 26);
  obstacle.scale.y = 0.65 + Math.random() * 2.4;
  obstacles.push(obstacle);
  trackGroup.add(obstacle);
}
scene.add(trackGroup);

const dragon = new THREE.Group();
const dragonBody = new THREE.Mesh(
  new THREE.CapsuleGeometry(1.05, 2.5, 8, 14),
  new THREE.MeshStandardMaterial({ color: 0x151619, roughness: 0.64, metalness: 0.08 })
);
dragonBody.rotation.z = Math.PI / 2;
dragon.add(dragonBody);

const dragonHead = new THREE.Mesh(
  new THREE.SphereGeometry(0.82, 18, 18),
  new THREE.MeshStandardMaterial({ color: 0x181b1e, roughness: 0.54 })
);
dragonHead.position.set(1.7, 0.16, 0);
dragon.add(dragonHead);

function makeWing(side = 1) {
  const root = new THREE.Group();
  root.position.set(0.25, 0.16, side * 1.32);

  const bone1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.09, 2.55),
    new THREE.MeshStandardMaterial({ color: 0x141519, roughness: 0.62 })
  );
  bone1.position.z = side * 1.35;

  const membrane = new THREE.Mesh(
    new THREE.PlaneGeometry(4.8, 1.75),
    new THREE.MeshStandardMaterial({ color: 0x1f2431, side: THREE.DoubleSide, transparent: true, opacity: 0.74 })
  );
  membrane.position.set(0.2, -0.2, side * 2.65);
  membrane.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;

  root.add(bone1, membrane);
  root.userData.membrane = membrane;
  return root;
}

const wingL = makeWing(1);
const wingR = makeWing(-1);
dragon.add(wingL, wingR);
scene.add(dragon);

const ambientDragons = [];
function makeAmbientDragon() {
  const g = new THREE.Group();
  const b = new THREE.Mesh(new THREE.CapsuleGeometry(0.3, 0.8, 4, 8), new THREE.MeshBasicMaterial({ color: 0x0b0f17 }));
  b.rotation.z = Math.PI / 2;
  const l = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 1.25), new THREE.MeshBasicMaterial({ color: 0x0c121b }));
  const r = l.clone();
  l.position.set(0, 0, 0.72);
  r.position.set(0, 0, -0.72);
  g.add(b, l, r);
  g.userData.leftWing = l;
  g.userData.rightWing = r;
  g.userData.phase = Math.random() * Math.PI * 2;
  g.userData.radius = 40 + Math.random() * 80;
  g.userData.speed = 0.08 + Math.random() * 0.14;
  g.position.set((Math.random() - 0.5) * 180, 24 + Math.random() * 16, -120 - Math.random() * 420);
  scene.add(g);
  ambientDragons.push(g);
}
for (let i = 0; i < 10; i++) makeAmbientDragon();

const fireballs = [];
const fireGeo = new THREE.SphereGeometry(0.24, 12, 12);

const input = {
  accel: false,
  decel: false,
  left: false,
  right: false,
  pitchUp: false,
  pitchDown: false,
  brake: false,
  fire: false,
};

const state = {
  velocity: new THREE.Vector3(0, 0, -11),
  accel: new THREE.Vector3(),
  yaw: 0,
  roll: 0,
  pitch: 0,
  heat: 0,
  fireCooldown: 0,
  score: 0,
};

const keyMap = {
  KeyW: 'accel',
  KeyS: 'decel',
  KeyA: 'left',
  KeyD: 'right',
  ArrowUp: 'pitchUp',
  ArrowDown: 'pitchDown',
  ShiftLeft: 'brake',
  Space: 'fire',
};

window.addEventListener('keydown', (e) => {
  const action = keyMap[e.code];
  if (action) input[action] = true;
});
window.addEventListener('keyup', (e) => {
  const action = keyMap[e.code];
  if (action) input[action] = false;
});

function spawnFireball() {
  const mat = new THREE.MeshBasicMaterial({ color: 0xff8330 });
  const ball = new THREE.Mesh(fireGeo, mat);
  const spawnOffset = new THREE.Vector3(1.9, 0.1, 0).applyEuler(dragon.rotation);
  ball.position.copy(dragon.position).add(spawnOffset);
  const forward = new THREE.Vector3(0, 0, -1).applyEuler(dragon.rotation).normalize();
  ball.userData.velocity = forward.multiplyScalar(58).add(state.velocity.clone().multiplyScalar(0.2));
  ball.userData.life = 0;
  fireballs.push(ball);
  scene.add(ball);
}

function updateFlight(dt, now) {
  const forward = new THREE.Vector3(0, 0, -1).applyEuler(dragon.rotation).normalize();
  const up = new THREE.Vector3(0, 1, 0).applyEuler(dragon.rotation).normalize();
  const speed = state.velocity.length();

  const thrustForce = (input.accel ? 28 : 8) - (input.decel ? 12 : 0) - (input.brake ? 30 : 0);
  const gravity = new THREE.Vector3(0, -9.2, 0);
  const drag = state.velocity.clone().multiplyScalar(-(0.045 + speed * 0.0028));
  const liftMag = Math.max(0, speed * 0.58 - 3.8);
  const lift = up.multiplyScalar(liftMag);

  state.accel.copy(forward.multiplyScalar(thrustForce)).add(gravity).add(drag).add(lift);
  state.velocity.addScaledVector(state.accel, dt);

  const yawInput = (input.left ? 1 : 0) - (input.right ? 1 : 0);
  const pitchInput = (input.pitchUp ? 1 : 0) - (input.pitchDown ? 1 : 0);

  const yawTargetRate = yawInput * THREE.MathUtils.clamp(1.15 + speed * 0.012, 1.15, 2.5);
  state.yaw += yawTargetRate * dt;

  const desiredRoll = -yawInput * THREE.MathUtils.clamp(0.32 + speed * 0.008, 0.32, 0.72);
  state.roll = THREE.MathUtils.lerp(state.roll, desiredRoll, 5.8 * dt);

  const autoPitch = THREE.MathUtils.clamp(state.velocity.y / 22, -0.42, 0.42);
  const playerPitch = pitchInput * 0.36;
  state.pitch = THREE.MathUtils.lerp(state.pitch, autoPitch + playerPitch, 4.4 * dt);

  dragon.rotation.set(state.pitch, state.yaw, state.roll);
  dragon.position.addScaledVector(state.velocity, dt);

  if (dragon.position.y < -6) {
    dragon.position.y = -6;
    if (state.velocity.y < 0) state.velocity.y *= -0.2;
  }

  const flapTempo = THREE.MathUtils.clamp(2.2 - speed * 0.035, 0.78, 2.1);
  const flap = Math.sin(now * 0.008 * flapTempo) * THREE.MathUtils.clamp(0.48 + (input.accel ? 0.28 : 0), 0.46, 0.78);
  const featherFlex = Math.sin(now * 0.012 + 0.8) * 0.12;

  wingL.rotation.x = flap;
  wingR.rotation.x = -flap;
  wingL.userData.membrane.rotation.z = 0.12 + featherFlex;
  wingR.userData.membrane.rotation.z = -0.12 - featherFlex;
  dragonHead.rotation.y = THREE.MathUtils.lerp(dragonHead.rotation.y, -state.roll * 0.8, 7 * dt);

  return speed;
}

function updateFire(dt) {
  if (input.fire && state.fireCooldown <= 0 && state.heat < 100) {
    spawnFireball();
    state.fireCooldown = 0.19;
    state.heat = Math.min(100, state.heat + 10.5);
  }

  state.fireCooldown = Math.max(0, state.fireCooldown - dt);
  state.heat = Math.max(0, state.heat - dt * 7.2);

  for (let i = fireballs.length - 1; i >= 0; i--) {
    const b = fireballs[i];
    b.position.addScaledVector(b.userData.velocity, dt);
    b.userData.velocity.y -= 4.5 * dt;
    b.userData.life += dt;

    let removed = false;

    for (let j = obstacles.length - 1; j >= 0; j--) {
      const obstacle = obstacles[j];
      if (obstacle.position.distanceTo(b.position) < 2.5) {
        trackGroup.remove(obstacle);
        obstacles.splice(j, 1);
        state.score += 100;
        removed = true;
        break;
      }
    }

    if (removed || b.userData.life > 3.2) {
      scene.remove(b);
      fireballs.splice(i, 1);
    }
  }
}

function updateBackground(dt, now) {
  for (const cloud of clouds) {
    cloud.position.x += cloud.userData.speed * dt;
    if (cloud.position.x > 240) cloud.position.x = -240;
  }

  for (const d of ambientDragons) {
    d.userData.phase += d.userData.speed * dt;
    d.position.x += Math.cos(d.userData.phase) * 0.12;
    d.position.y += Math.sin(d.userData.phase * 0.7) * 0.04;
    d.userData.leftWing.rotation.x = Math.sin(now * 0.01 + d.userData.phase) * 0.6;
    d.userData.rightWing.rotation.x = -Math.sin(now * 0.01 + d.userData.phase) * 0.6;
  }
}

function updateCamera(dt, speed) {
  const lookAhead = THREE.MathUtils.clamp(14 + speed * 0.85, 20, 44);
  const height = THREE.MathUtils.clamp(4 + speed * 0.06, 4, 7.5);
  const distance = THREE.MathUtils.clamp(10 + speed * 0.1, 11, 19);

  const chaseOffset = new THREE.Vector3(0, height, distance).applyEuler(dragon.rotation);
  const targetPos = dragon.position.clone().add(chaseOffset);
  camera.position.lerp(targetPos, 4.6 * dt);

  const lookTarget = dragon.position
    .clone()
    .add(new THREE.Vector3(0, 1.2, 0))
    .add(new THREE.Vector3(0, 0, -lookAhead).applyEuler(dragon.rotation));
  camera.lookAt(lookTarget);

  camera.fov = THREE.MathUtils.lerp(camera.fov, THREE.MathUtils.clamp(66 + speed * 0.35, 66, 84), 3.1 * dt);
  camera.updateProjectionMatrix();
}

function updateHud(speed) {
  speedEl.textContent = `${speed.toFixed(1)} m/s`;
  altitudeEl.textContent = `${(dragon.position.y + 16).toFixed(1)} m`;
  heatEl.textContent = `${state.heat.toFixed(0)}%`;
  cooldownEl.textContent = state.fireCooldown > 0 ? `${state.fireCooldown.toFixed(2)}s` : 'Ready';
}

let last = performance.now();
function animate(now) {
  const dt = Math.min((now - last) / 1000, 0.033);
  last = now;

  const speed = updateFlight(dt, now);
  updateFire(dt);
  updateBackground(dt, now);
  updateCamera(dt, speed);
  updateHud(speed);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
