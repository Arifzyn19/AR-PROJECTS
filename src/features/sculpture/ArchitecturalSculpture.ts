import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// Pre-allocated scratch objects to prevent garbage collection inside render loop
const _vec3 = new THREE.Vector3();
const _targetEuler = new THREE.Euler();
const _targetQuat = new THREE.Quaternion();

export class ArchitecturalSculptureScene {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private pmremGenerator: THREE.PMREMGenerator | null = null;
  private environmentTexture: THREE.Texture | null = null;

  // 3D Objects
  private rootGroup: THREE.Group;
  private sculptureGroup: THREE.Group;
  private outerRing: THREE.Mesh;
  private midGimbal: THREE.Mesh;
  private innerGyro: THREE.Mesh;
  private centralCore: THREE.Mesh;
  private coreInnerFaceted: THREE.Mesh;
  private axialPin: THREE.Mesh;
  private accentRings: THREE.Group;
  private shadowPlane: THREE.Mesh;

  // Lights
  private hemiLight!: THREE.HemisphereLight;
  private keyLight!: THREE.DirectionalLight;
  private limeRimLight!: THREE.DirectionalLight;
  private topLight!: THREE.DirectionalLight;
  private centralIgnitionLight!: THREE.PointLight;

  // Cinematic Intro State
  private isIntroActive = false;
  private introStartTime = 0;
  private introDuration = 2.1; // 2.1 seconds (within 1.5–2.5s UX target)
  private introProgress = 0;
  private onIntroProgressCallback?: (progress: number) => void;
  private onIntroCompleteCallback?: () => void;
  private initialIntroCamPos = new THREE.Vector3(0.35, 0.22, 3.3);
  private initialIntroFov = 35;

  // Interaction State
  private pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
  private scrollProgress = 0;
  private targetScrollProgress = 0;
  private isVisible = true;
  private animationFrameId: number = 0;
  private clock = new THREE.Clock();
  private isDisposed = false;
  private isSoftwareGl = false;

  constructor(container: HTMLElement) {
    this.container = container;

    // Detect software WebGL to balance performance without altering scene layout
    this.isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // Initialize renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: !this.isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.setPixelRatio(this.isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = !this.isSoftwareGl;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.renderer.setSize(width, height);
    this.container.appendChild(this.renderer.domElement);

    // Initialize scene and camera
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x101112, 0.045);

    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    this.camera.position.set(0, 0.2, 5.2);

    // Setup procedural studio environment reflection
    this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    this.environmentTexture = this.pmremGenerator.fromScene(roomEnv, 0.04).texture;
    this.scene.environment = this.environmentTexture;
    roomEnv.dispose();

    // Scene groups
    this.rootGroup = new THREE.Group();
    this.sculptureGroup = new THREE.Group();
    this.rootGroup.add(this.sculptureGroup);
    this.scene.add(this.rootGroup);

    // Build procedural 3D sculpture parts
    const {
      outerRing,
      midGimbal,
      innerGyro,
      centralCore,
      coreInnerFaceted,
      axialPin,
      accentRings,
      shadowPlane,
    } = this.createSculpture();

    this.outerRing = outerRing;
    this.midGimbal = midGimbal;
    this.innerGyro = innerGyro;
    this.centralCore = centralCore;
    this.coreInnerFaceted = coreInnerFaceted;
    this.axialPin = axialPin;
    this.accentRings = accentRings;
    this.shadowPlane = shadowPlane;

    // Studio lighting rig
    this.setupLighting();

    // Bind event listeners
    this.bindEvents();

    // Adjust camera initial distance for mobile / desktop
    this.handleResize();

    // Start render loop
    this.clock.start();
    this.tick();
  }

  private createContactShadowTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(256, 256, 20, 256, 256, 250);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
      gradient.addColorStop(0.3, 'rgba(0, 0, 0, 0.4)');
      gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  private createSculpture() {
    // Shared PBR Material finishes matching the obsidian/titanium editorial aesthetic
    const titaniumMaterial = new THREE.MeshStandardMaterial({
      color: 0x242729,
      metalness: 0.94,
      roughness: 0.18,
    });

    const darkGunmetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x161819,
      metalness: 0.88,
      roughness: 0.32,
    });

    const obsidianFacetedMaterial = new THREE.MeshStandardMaterial({
      color: 0x111314,
      metalness: 0.96,
      roughness: 0.12,
      flatShading: true,
    });

    const acidLimeAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xB8F36B,
      metalness: 0.8,
      roughness: 0.25,
      emissive: 0x567e23,
      emissiveIntensity: 0.3,
    });

    // 1. Primary Outer Orbital Ring (Heavy architectural torus)
    const outerGeometry = new THREE.TorusGeometry(1.65, 0.045, 32, 128);
    const outerRing = new THREE.Mesh(outerGeometry, titaniumMaterial);
    outerRing.castShadow = true;
    outerRing.receiveShadow = true;

    // Add structural bracket lugs around the outer ring
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const lugGeom = new THREE.BoxGeometry(0.14, 0.09, 0.14);
      const lug = new THREE.Mesh(lugGeom, darkGunmetalMaterial);
      lug.position.set(Math.cos(angle) * 1.65, Math.sin(angle) * 1.65, 0);
      lug.rotation.z = angle;
      outerRing.add(lug);
    }
    this.sculptureGroup.add(outerRing);

    // 2. Secondary Inclined Gimbal Ring
    const midGeometry = new THREE.TorusGeometry(1.35, 0.038, 28, 100);
    const midGimbal = new THREE.Mesh(midGeometry, darkGunmetalMaterial);
    midGimbal.rotation.x = Math.PI / 4;
    midGimbal.castShadow = true;
    this.sculptureGroup.add(midGimbal);

    // Counter-weight pods on mid gimbal
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      const podGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.18, 16);
      const pod = new THREE.Mesh(podGeom, titaniumMaterial);
      pod.position.set(Math.cos(angle) * 1.35, Math.sin(angle) * 1.35, 0);
      pod.rotation.z = angle + Math.PI / 2;
      midGimbal.add(pod);
    }

    // 3. Inner Precision Gyro Ring
    const innerGeometry = new THREE.TorusGeometry(1.05, 0.032, 24, 90);
    const innerGyro = new THREE.Mesh(innerGeometry, titaniumMaterial);
    innerGyro.rotation.y = Math.PI / 3;
    innerGyro.castShadow = true;
    this.sculptureGroup.add(innerGyro);

    // 4. Central Architectural Faceted Monolith Core (Octahedron / Icosahedron hybrid)
    const coreGeometry = new THREE.OctahedronGeometry(0.62, 0);
    const centralCore = new THREE.Mesh(coreGeometry, obsidianFacetedMaterial);
    centralCore.castShadow = true;
    this.sculptureGroup.add(centralCore);

    // Inner nested faceted polyhedral gem with wireframe accent
    const innerCoreGeom = new THREE.IcosahedronGeometry(0.38, 0);
    const coreInnerFaceted = new THREE.Mesh(innerCoreGeom, acidLimeAccentMaterial);
    centralCore.add(coreInnerFaceted);

    // 5. Axial Titanium Pin
    const pinGeometry = new THREE.CylinderGeometry(0.022, 0.022, 2.6, 24);
    const axialPin = new THREE.Mesh(pinGeometry, darkGunmetalMaterial);
    // Knurled end-caps
    const capTop = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.08, 16), acidLimeAccentMaterial);
    capTop.position.y = 1.3;
    const capBottom = capTop.clone();
    capBottom.position.y = -1.3;
    axialPin.add(capTop, capBottom);
    this.sculptureGroup.add(axialPin);

    // 6. Architectural Accent Rings (fine acid-lime rings for subtle specular kick)
    const accentRings = new THREE.Group();
    const accentGeom1 = new THREE.RingGeometry(0.72, 0.74, 64);
    const accentRing1 = new THREE.Mesh(accentGeom1, acidLimeAccentMaterial);
    accentRing1.rotation.x = Math.PI / 2;
    const accentGeom2 = new THREE.RingGeometry(0.85, 0.865, 64);
    const accentRing2 = new THREE.Mesh(accentGeom2, acidLimeAccentMaterial);
    accentRing2.rotation.y = Math.PI / 2;
    accentRings.add(accentRing1, accentRing2);
    this.sculptureGroup.add(accentRings);

    // 7. Ground Contact Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: this.createContactShadowTexture(),
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.1;
    this.rootGroup.add(shadowPlane);

    return {
      outerRing,
      midGimbal,
      innerGyro,
      centralCore,
      coreInnerFaceted,
      axialPin,
      accentRings,
      shadowPlane,
    };
  }

  private setupLighting() {
    // 1. Hemisphere fill light (cool charcoal sky to deep obsidian ground)
    this.hemiLight = new THREE.HemisphereLight(0x3a3e42, 0x101112, 1.4);
    this.scene.add(this.hemiLight);

    // 2. Key directional light with soft studio shadows
    this.keyLight = new THREE.DirectionalLight(0xe8e9e5, 2.2);
    this.keyLight.position.set(4, 5, 4);
    this.keyLight.castShadow = !this.isSoftwareGl;
    if (this.keyLight.shadow) {
      this.keyLight.shadow.mapSize.width = 1024;
      this.keyLight.shadow.mapSize.height = 1024;
      this.keyLight.shadow.camera.near = 0.5;
      this.keyLight.shadow.camera.far = 15;
      this.keyLight.shadow.bias = -0.0005;
      this.keyLight.shadow.normalBias = 0.02;
      const d = 3;
      this.keyLight.shadow.camera.left = -d;
      this.keyLight.shadow.camera.right = d;
      this.keyLight.shadow.camera.top = d;
      this.keyLight.shadow.camera.bottom = -d;
    }
    this.scene.add(this.keyLight);

    // 3. Subtle Acid Lime Rim Light (gives the sculpture an architectural signature edge)
    this.limeRimLight = new THREE.DirectionalLight(0xB8F36B, 1.8);
    this.limeRimLight.position.set(-4.5, -1.5, -3.5);
    this.scene.add(this.limeRimLight);

    // 4. Subtle Top Soft Fill Light
    this.topLight = new THREE.DirectionalLight(0x757b7f, 1.0);
    this.topLight.position.set(0, 6, -1);
    this.scene.add(this.topLight);

    // 5. Central Lime Ignition Point Light for Cinematic Intro
    this.centralIgnitionLight = new THREE.PointLight(0xB8F36B, 0, 10, 2);
    this.centralIgnitionLight.position.set(0, 0, 0);
    this.scene.add(this.centralIgnitionLight);
  }

  private bindEvents() {
    const onPointerMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      this.pointer.targetX = (e.clientX - halfW) / halfW;
      this.pointer.targetY = (e.clientY - halfH) / halfH;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const halfW = window.innerWidth / 2;
        const halfH = window.innerHeight / 2;
        this.pointer.targetX = (touch.clientX - halfW) / halfW;
        this.pointer.targetY = (touch.clientY - halfH) / halfH;
      }
    };

    const onScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      this.targetScrollProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', this.handleResize, { passive: true });

    // Store unbind callbacks for dispose
    (this as any)._unbind = () => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', this.handleResize);
    };
  }

  public setVisibility(visible: boolean) {
    this.isVisible = visible;
    if (visible && !this.animationFrameId) {
      this.clock.start();
      this.tick();
    }
  }

  private restingCamPos = new THREE.Vector3(0, 0.08, 5.2);
  private restingFov = 40;

  public handleResize = () => {
    if (this.isDisposed || !this.container) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera.aspect = width / height;

    // Responsive resting camera position
    if (width < 640) {
      this.restingFov = 44;
      this.restingCamPos.set(0, 0.15, 6.0);
      this.rootGroup.position.set(0, 0.05, 0);
    } else if (width < 1024) {
      this.restingFov = 42;
      this.restingCamPos.set(0, 0.1, 5.5);
      this.rootGroup.position.set(0, 0, 0);
    } else {
      this.restingFov = 40;
      this.restingCamPos.set(0, 0.08, 5.2);
      this.rootGroup.position.set(0, 0, 0);
    }

    if (!this.isIntroActive) {
      this.camera.fov = this.restingFov;
      this.camera.position.copy(this.restingCamPos);
    }

    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  public playIntro(onProgress?: (p: number) => void, onComplete?: () => void) {
    this.isIntroActive = true;
    this.introProgress = 0;
    this.introStartTime = performance.now();
    this.onIntroProgressCallback = onProgress;
    this.onIntroCompleteCallback = onComplete;

    // Initial Stage: Start in deep obsidian darkness
    if (this.keyLight) this.keyLight.intensity = 0;
    if (this.limeRimLight) this.limeRimLight.intensity = 0;
    if (this.hemiLight) this.hemiLight.intensity = 0;
    if (this.topLight) this.topLight.intensity = 0;
    if (this.centralIgnitionLight) this.centralIgnitionLight.intensity = 0;

    // Cinematic close-up camera orientation
    this.camera.fov = this.initialIntroFov;
    this.camera.position.copy(this.initialIntroCamPos);
    this.camera.updateProjectionMatrix();

    // Compact ring scale and aligned starter angles
    this.outerRing.scale.setScalar(0.15);
    this.midGimbal.scale.setScalar(0.15);
    this.innerGyro.scale.setScalar(0.15);
    this.sculptureGroup.rotation.set(0.45, -1.2, 0.25);

    if (!this.animationFrameId) {
      this.clock.start();
      this.tick();
    }
  }

  public skipIntro() {
    if (!this.isIntroActive) return;
    this.isIntroActive = false;
    this.introProgress = 1.0;

    // Restore full studio lighting
    if (this.keyLight) this.keyLight.intensity = 2.2;
    if (this.limeRimLight) this.limeRimLight.intensity = 1.8;
    if (this.hemiLight) this.hemiLight.intensity = 1.4;
    if (this.topLight) this.topLight.intensity = 1.0;
    if (this.centralIgnitionLight) this.centralIgnitionLight.intensity = 0;

    this.outerRing.scale.setScalar(1);
    this.midGimbal.scale.setScalar(1);
    this.innerGyro.scale.setScalar(1);

    this.camera.position.copy(this.restingCamPos);
    this.camera.fov = this.restingFov;
    this.camera.updateProjectionMatrix();

    this.onIntroProgressCallback?.(1.0);
    this.onIntroCompleteCallback?.();
  }

  private tick = () => {
    if (this.isDisposed) return;

    if (!this.isVisible) {
      this.animationFrameId = 0;
      return;
    }

    const dt = Math.min(this.clock.getDelta(), 0.1);
    const elapsedTime = this.clock.getElapsedTime();

    // === CINEMATIC INTRO SEQUENCE HANDLING ===
    if (this.isIntroActive) {
      const elapsed = (performance.now() - this.introStartTime) / 1000;
      const rawProgress = Math.min(1.0, elapsed / this.introDuration);
      this.introProgress = rawProgress;
      this.onIntroProgressCallback?.(rawProgress);

      // 1. Stage 1 (0 to 0.22s / ~0 to 0.46s): Void & Central Lime Spark
      if (rawProgress <= 0.22) {
        const t1 = rawProgress / 0.22;
        const spark = Math.sin(t1 * Math.PI * 0.5);
        this.centralIgnitionLight.intensity = spark * 5.5;
        this.coreInnerFaceted.scale.setScalar(0.8 + spark * 0.35);
        this.hemiLight.intensity = spark * 0.25;

        this.outerRing.scale.setScalar(0.15);
        this.midGimbal.scale.setScalar(0.15);
        this.innerGyro.scale.setScalar(0.15);
        this.keyLight.intensity = 0;
        this.limeRimLight.intensity = 0;
      }
      // 2. Stage 2 (0.22 to 0.65 / ~0.46s to 1.36s): Orbital Geometry Assembly
      else if (rawProgress <= 0.65) {
        const t2 = (rawProgress - 0.22) / 0.43;
        // Smooth cubic ease-out
        const ease2 = 1 - Math.pow(1 - t2, 3);

        const scaleVal = 0.15 + 0.85 * ease2;
        this.outerRing.scale.setScalar(scaleVal);
        this.midGimbal.scale.setScalar(scaleVal);
        this.innerGyro.scale.setScalar(scaleVal);

        // Orbital rotational unfolding
        this.outerRing.rotation.z = ease2 * Math.PI * 0.8;
        this.midGimbal.rotation.x = THREE.MathUtils.lerp(0, Math.PI / 4, ease2);
        this.midGimbal.rotation.y = ease2 * Math.PI * 1.3;
        this.innerGyro.rotation.y = THREE.MathUtils.lerp(0, Math.PI / 3, ease2);
        this.innerGyro.rotation.x = -ease2 * Math.PI * 1.6;

        // Controlled studio lighting ramp up with subtle metallic reflections
        this.keyLight.intensity = ease2 * 2.2;
        this.limeRimLight.intensity = ease2 * 1.8;
        this.hemiLight.intensity = 0.25 + ease2 * 1.15;
        this.topLight.intensity = ease2 * 1.0;
        this.centralIgnitionLight.intensity = Math.max(0, (1 - ease2) * 5.5);

        // Camera smoothly glides closer during assembly
        this.camera.position.lerpVectors(this.initialIntroCamPos, new THREE.Vector3(0.12, 0.16, 4.2), ease2);
      }
      // 3. Stage 3 (0.65 to 1.0 / ~1.36s to 2.1s): Cinematic Camera Sweep into Hero Composition
      else {
        const t3 = (rawProgress - 0.65) / 0.35;
        // Smoothstep curve for seamless landing
        const ease3 = t3 * t3 * (3 - 2 * t3);

        this.outerRing.scale.setScalar(1);
        this.midGimbal.scale.setScalar(1);
        this.innerGyro.scale.setScalar(1);

        this.keyLight.intensity = 2.2;
        this.limeRimLight.intensity = 1.8;
        this.hemiLight.intensity = 1.4;
        this.topLight.intensity = 1.0;
        this.centralIgnitionLight.intensity = 0;

        // Camera smoothly glides into resting hero framing
        this.camera.position.lerpVectors(new THREE.Vector3(0.12, 0.16, 4.2), this.restingCamPos, ease3);
        this.camera.fov = THREE.MathUtils.lerp(this.initialIntroFov, this.restingFov, ease3);
        this.camera.updateProjectionMatrix();

        // Blend sculpture group orientation into neutral hero alignment
        this.sculptureGroup.rotation.y = THREE.MathUtils.lerp(this.sculptureGroup.rotation.y, 0, ease3 * 0.15);
        this.sculptureGroup.rotation.x = THREE.MathUtils.lerp(this.sculptureGroup.rotation.x, 0, ease3 * 0.15);
        this.sculptureGroup.rotation.z = THREE.MathUtils.lerp(this.sculptureGroup.rotation.z, 0, ease3 * 0.15);
      }

      if (rawProgress >= 1.0) {
        this.isIntroActive = false;
        this.camera.position.copy(this.restingCamPos);
        this.camera.fov = this.restingFov;
        this.camera.updateProjectionMatrix();
        this.onIntroCompleteCallback?.();
      }
    }

    // === CONTINUOUS IDLE ROTATION & POINTER PARALLAX ===
    // 1. Exponential smooth damping for pointer parallax
    const dampRate = 1 - Math.exp(-4.5 * dt);
    this.pointer.x += (this.pointer.targetX - this.pointer.x) * dampRate;
    this.pointer.y += (this.pointer.targetY - this.pointer.y) * dampRate;

    // Scroll progress smooth damping
    const scrollDamp = 1 - Math.exp(-3.5 * dt);
    this.scrollProgress += (this.targetScrollProgress - this.scrollProgress) * scrollDamp;

    // 2. Slow idle kinetic rotation across multiple structural axes
    const idleSpeed = 0.4;
    if (!this.isIntroActive) {
      this.outerRing.rotation.z = elapsedTime * idleSpeed * 0.25;
      this.outerRing.rotation.x = Math.sin(elapsedTime * 0.15) * 0.12;

      this.midGimbal.rotation.y = elapsedTime * idleSpeed * 0.45;
      this.midGimbal.rotation.z = Math.cos(elapsedTime * 0.2) * 0.18;

      this.innerGyro.rotation.x = -elapsedTime * idleSpeed * 0.6;
      this.innerGyro.rotation.y = Math.sin(elapsedTime * 0.3) * 0.25;

      // Pointer-driven and scroll-driven sculpture orientation
      const targetRotY = this.pointer.x * 0.55 + this.scrollProgress * Math.PI * 1.5;
      const targetRotX = this.pointer.y * 0.4 + Math.sin(this.scrollProgress * Math.PI) * 0.3;
      const targetRotZ = -this.pointer.x * 0.15;

      this.sculptureGroup.rotation.y += (targetRotY - this.sculptureGroup.rotation.y) * dampRate;
      this.sculptureGroup.rotation.x += (targetRotX - this.sculptureGroup.rotation.x) * dampRate;
      this.sculptureGroup.rotation.z += (targetRotZ - this.sculptureGroup.rotation.z) * dampRate;

      // Subtle breathing vertical bobbing
      this.sculptureGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.06;
    }

    // Core continuous rotation
    this.centralCore.rotation.x = elapsedTime * idleSpeed * 0.35;
    this.centralCore.rotation.y = elapsedTime * idleSpeed * 0.55;
    this.coreInnerFaceted.rotation.y = -elapsedTime * 0.8;

    this.accentRings.rotation.z = -elapsedTime * 0.2;
    this.accentRings.rotation.x = Math.PI / 2 + Math.sin(elapsedTime * 0.25) * 0.15;

    // Render scene
    this.renderer.render(this.scene, this.camera);

    this.animationFrameId = requestAnimationFrame(this.tick);
  };

  public dispose() {
    this.isDisposed = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if ((this as any)._unbind) {
      (this as any)._unbind();
    }

    // Traverse and dispose geometries and materials
    this.scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.geometry?.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else if (mesh.material) {
          mesh.material.dispose();
        }
      }
    });

    if (this.environmentTexture) {
      this.environmentTexture.dispose();
    }
    if (this.pmremGenerator) {
      this.pmremGenerator.dispose();
    }

    this.renderer.dispose();
    if (this.renderer.domElement.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
    }
  }
}
