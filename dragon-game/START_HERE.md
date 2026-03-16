# Start Here: Build the Dragon Game Step by Step

Use this checklist in order.

## 1) Create the game folder
Create `dragon-game/` with:
- `index.html`
- `styles.css`
- `src/main.js`
- `assets/models/` (for dragon model)
- `three/` (optional local Three.js)

## 2) Add Three.js
Preferred local file:
```bash
curl -L https://unpkg.com/three@0.160.0/build/three.module.js -o dragon-game/three/three.module.js
```
Then use:
```js
import * as THREE from '../three/three.module.js';
```

Fallback (if downloads are blocked):
```js
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
```

## 3) Replace placeholder dragon with your real 3D file
Yes — upload your dragon `.glb` / `.gltf` model into:
- `dragon-game/assets/models/dragon.glb`

Then load it in `src/main.js` using `GLTFLoader` (next step after this prototype baseline).

## 4) What this prototype already gives you
- Better flight handling with thrust/lift/drag/gravity.
- Better game-style camera with speed-based FOV and look-ahead.
- Better wing motion rhythm (inspired by fast arcade flight feel).
- Fire projectile + cooldown + heat mechanics.
- Animated sky/background with moving clouds + ambient dragon silhouettes.

## 5) Run locally
From repository root:
```bash
python3 -m http.server 4173
```
Open:
- `http://localhost:4173/dragon-game/`

## 6) Immediate next coding steps
1. Add `GLTFLoader` and replace placeholder dragon mesh.
2. Map wing bones from your rig and drive them from current flap values.
3. Add collider volumes for obstacles and dragon body.
4. Add checkpoint track and combo scoring.
5. Add particles and sound for boost/fire/impact.

## 7) About HTTYD objects/dragons
- Use only assets you own or have permission/license to use.
- If you upload your own dragon model, this project can integrate it directly.
