# Dragon Flight Game Website Plan (Professional Roadmap - Physics + Cinematic Edition)

## 1) Product Vision and Core Experience
- Build a browser-based 3D action game inspired by HTTYD-style dragon flight, focused on cinematic speed, responsive controls, and believable physics.
- Core loop:
  1. Player controls dragon speed, lift, and direction.
  2. Player flies through movie-like tracks (island cliffs, canyons, storm clouds, caves, sea stacks).
  3. Player avoids or destroys obstacles by precision movement or fire attack.
  4. Player earns score for clean movement, obstacle handling, speed efficiency, and completion time.

## 2) Scope Definition (MVP -> V2)

### MVP (Must-Have)
- One dragon character with wing animation + inverse-kinematics-assisted pose system.
- One playable track with high-quality background environment.
- Flight controls:
  - Accelerate
  - Decelerate
  - Brake / near-hover
  - Move left / right
  - Pitch up / down (light vertical control)
- Obstacle system with collisions and destruction states.
- Fire throw mechanic (projectile breath) with cooldown + heat meter.
- High-clarity HUD: speed, altitude, stamina/energy, fire cooldown/heat, score, combo.
- Start screen, pause/restart, game over, level complete.

### V2 (Should-Have)
- Multiple tracks and weather variants (sunset, storm, night bioluminescence).
- Improved AI obstacle patterns and dynamic hazards (falling rocks, moving ships, wind gust zones).
- Progression (unlock dragons/skins/fire types).
- Audio polish (adaptive music layers, wings, fire, impacts, distant ambience).
- Leaderboard + player profile (online).

## 3) Technical Stack and Architecture

### Frontend / Game Engine
- **Three.js + JavaScript** for rendering, camera systems, lighting, animation, particles.
- **HTML/CSS** for shell UI, overlays, and menus.
- **GSAP or lightweight tween utility (optional)** for UI transitions and camera micro-polish.

### Optional Backend
- **Python (FastAPI preferred)** for leaderboard, profile, telemetry, run validation.
- REST endpoints for score submission/retrieval and session summaries.

### Database (Optional but recommended)
- **SQL (PostgreSQL/MySQL/SQLite)**
  - `users`
  - `scores`
  - `runs` (track, duration, collisions, fire accuracy)
  - `unlocks`
  - `telemetry_events` (optional for balancing)

### Why this split
- Keep gameplay real-time and local in browser for low-latency control.
- Use backend/database only for persistence, analytics, anti-cheat checks, and social features.

## 4) Visual Direction: Background and Environment Design

### Environment Pillars
- **Cinematic Depth:** distant mountains, layered fog, volumetric skyboxes.
- **Speed Readability:** track landmarks and lighting contrast to show motion clearly.
- **World Storytelling:** ruins, Viking structures, cave drawings, and ocean life silhouettes.

### Track Background Plan
- Track 1 (MVP): Island canyon with ocean cliffs and cave tunnel section.
- Track 2 (V2): Storm valley with lightning flashes and moving cloud layers.
- Track 3 (V2): Night run with glowing flora and lava fissures.

### Rendering Techniques for Better Background
- HDRI + directional key light + rim light on dragon.
- Multi-layer sky dome (cloud cards + gradient atmosphere).
- Distance fog tuned by biome.
- Parallax background meshes for depth illusion.
- Post-processing: subtle bloom, color grading LUT, motion blur (carefully tuned).

## 5) User Interface / User Experience Plan (Better UI)

### UI Principles
- **Minimal but informative:** only show what player needs each second.
- **Cinematic style:** translucent panels, rune-like accents, clean iconography.
- **Readable under speed:** high contrast, large key indicators, center-safe layout.

### HUD Layout
- Top-left: Health/Stability + damage state.
- Top-right: Fire heat meter + cooldown ring.
- Bottom-left: Speedometer + acceleration trend arrow.
- Bottom-center: Context prompts (e.g., "Obstacle ahead: FIRE").
- Bottom-right: Score, combo multiplier, checkpoint progress.

### Key Screens
- **Landing Page:** Play, Settings, Controls, Leaderboard.
- **Settings:** graphics quality, sensitivity, invert controls, audio sliders.
- **Pause Overlay:** resume/restart/quit + objective reminder.
- **Results Screen:** time split, collisions, accuracy, style score.

### UI Interaction Polish
- Smooth transitions (150-250ms).
- Color state system:
  - Safe = cyan/green
  - Warning = amber
  - Critical = red
- Haptic-like screen feedback (camera shake + HUD pulse) on impacts and boost.

## 6) System Design (High-Level Modules)
- **Scene Manager**: load/unload environments, lighting presets, weather.
- **Dragon Controller**: force-based movement, IK-driven pose logic, fire action.
- **Input Handler**: keyboard/gamepad mapping, dead zones, sensitivity curves.
- **Track Manager**: spline/path generation, checkpoints, segment streaming.
- **Obstacle Manager**: spawn logic, pooling, destruction rules, hazard metadata.
- **Fire/Combat System**: projectile simulation, cone mode, hit validation, cooldown.
- **Physics Layer**: aerodynamic forces, gravity, collision response, drag.
- **Animation Layer**: blend tree + inverse kinematics for wings, neck, tail stabilization.
- **UI/HUD Module**: in-game telemetry, menus, transitions, accessibility controls.
- **Audio Module**: spatial sound, adaptive music based on speed/risk.
- **Save/Sync Module**: local progress and backend sync.

## 7) Dragon Movement Plan (Inverse Mechanics + Physics Laws)

### Physics Model (Newtonian Foundation)
- Use rigid-body-like state variables: position, velocity, acceleration, angular velocity.
- Apply forces per frame:
  - Thrust (from wing beat impulse / glide boost)
  - Lift (function of speed + wing angle of attack)
  - Drag (proportional to velocity and drag coefficient)
  - Gravity (constant downward force)
- Update using stable integrator (semi-implicit Euler at minimum).

### Movement Inputs -> Physical Effects
- **Accelerate:** increase thrust target; wing beats gain amplitude/frequency.
- **Decelerate:** reduce thrust, increase drag posture (wings spread).
- **Stop / Hover-like:** high flap frequency + high lift + low forward thrust (energy expensive).
- **Left/Right:** apply roll torque, then yaw coupling for realistic turning.
- **Pitch Up/Down:** alter angle of attack affecting lift and speed bleed.

### Inverse Mechanics / Inverse Kinematics (IK)
- Use IK for believable body adaptation to movement and terrain:
  - Wing joints solve toward aerodynamic target pose.
  - Neck/head aim solver tracks look target or lock-on obstacle.
  - Tail IK stabilizes during turns (counterbalance).
- Drive IK targets from physics state (velocity vector, angular acceleration, upcoming curve).
- Maintain pose constraints (joint limits) to avoid impossible anatomy.

### Physics Law Compliance Checklist
- No instant velocity teleport unless in scripted cinematic.
- Conserve momentum trends during turns and impacts.
- Collision impulses must alter velocity and orientation.
- Fire recoil (optional subtle kick) should influence short-term stability.
- Cap unrealistic acceleration using dragon mass and max thrust constants.

## 8) Fire Throw Mechanic (Improved)

### Fire Modes
- **Primary (MVP):** short fire projectile burst.
- **Secondary (V2):** cone flame for close obstacle clusters.

### Fire System Rules
- Heat meter rises with use; overheating disables fire briefly.
- Cooldown ring + sound cue when ready.
- Obstacles have fire resistance tiers (wood < stone < armored).
- Direct hit gives combo bonus; wasted shots reduce style score.

### Fire Feedback
- GPU particles for flame/sparks/smoke.
- Dynamic light pulse near impact.
- Distinct impact states: scorch, crack, shatter, explosion.
- Audio layers: ignition, travel, impact, crackle.

## 9) Art & Asset Pipeline
- Blockout first with primitives and gameplay placeholders.
- Replace with stylized production assets (dragon, rocks, structures, vegetation).
- Use compressed textures + LODs for web performance.
- Standardize structure:
  - `/assets/models`
  - `/assets/textures`
  - `/assets/audio`
  - `/assets/vfx`
  - `/src/systems`
  - `/src/gameplay`
  - `/src/ui`

## 10) Performance Strategy (Critical for Web)
- Target 60 FPS on mid-range laptops (playable minimum 45 FPS fallback mode).
- Object pooling for obstacles/projectiles/particles.
- Frustum culling + distance-based LOD switching.
- Texture compression (KTX2/Basis), mesh optimization, batched static geometry.
- Limit expensive dynamic shadows; use cascades selectively.
- Profile CPU/GPU every milestone in browser devtools.

## 11) Development Phases and Milestones

### Phase 0: Pre-Production (1 week)
- Finalize game design brief + references for background/UI style.
- Define movement equations, constants (mass, thrust, lift, drag).
- Create architecture and data-flow diagrams.

### Phase 1: Core Flight Prototype (2 weeks)
- Set up Three.js scene + camera rigs.
- Implement physics-based acceleration/deceleration/turning.
- Add placeholder IK for wings and tail stabilization.

### Phase 2: Gameplay Loop (2 weeks)
- Add obstacles, collisions, scoring, fail/win states.
- Implement fire throw, cooldown, heat meter, destructible obstacles.
- Add first-pass HUD and menu flow.

### Phase 3: Visual/UI Polish (2–3 weeks)
- Upgrade background art, lighting, weather, and post-processing.
- Refine UI styles and transitions.
- Improve animation blending + VFX/SFX sync.

### Phase 4: Backend + Persistence (1–2 weeks, optional)
- Build Python API and SQL schema.
- Add leaderboard/run history/profile.
- Add basic anti-cheat validation for scores.

### Phase 5: QA + Launch Prep (1 week)
- Cross-browser/device testing.
- Performance tuning, accessibility pass, bug fixes.
- Deploy frontend + backend and monitor telemetry.

## 12) Team Roles (if collaborative)
- Game/Creative Designer
- Three.js Gameplay Engineer
- Technical Animator (IK/rigging)
- UI/UX Designer
- 3D Environment Artist
- Backend Engineer (Python + SQL)
- QA Tester

## 13) Risk Register and Mitigation
- **Risk:** Scope creep from cinematic ambition.
  - **Mitigation:** lock MVP and defer non-core features to V2.
- **Risk:** Physics feels realistic but not fun.
  - **Mitigation:** realistic base model + game-friendly tuning curves.
- **Risk:** Web performance drops due to heavy background/VFX.
  - **Mitigation:** strict performance budgets and aggressive optimization.
- **Risk:** UI clutter at high speed.
  - **Mitigation:** progressive HUD + contextual prompts only.

## 14) Immediate Action Checklist (Next 7 Days)
1. Write concise GDD (controls, scoring, level goals, fire behavior).
2. Build Three.js prototype with dragon placeholder and spline track.
3. Implement force-based movement model (thrust/lift/drag/gravity).
4. Add left-right roll/yaw turning and pitch controls.
5. Add simple IK targets for wings + tail response.
6. Add obstacle collisions and fire projectile with cooldown/heat.
7. Build first HUD + one polished environment background pass.

## 15) Definition of “Amazing” (Quality Bar)
- Flight feels smooth, cinematic, and physically believable.
- Dragon body motion reacts naturally to speed, turns, and impacts.
- Background environment looks rich and alive without hurting performance.
- Fire throw is satisfying, tactical, and visually impressive.
- UI is clean, stylish, and easy to read at high speed.
