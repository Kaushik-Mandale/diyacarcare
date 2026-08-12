import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface CarCanvasProps {
  className?: string;
}

export default function CarCanvas({ className }: CarCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // ─── 1. Scene setup ───────────────────────────────────────────
    const scene = new THREE.Scene();
    const w = el.clientWidth;
    const h = el.clientHeight;

    // Camera
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.set(4.2, 1.6, 5.2);
    camera.lookAt(0, 0.4, 0);

    // Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // WebGL not supported
    }
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    el.appendChild(renderer.domElement);

    // ─── 2. Lighting ───────────────────────────────────────────────
    // Hemisphere ambient
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x111625, 1.2);
    scene.add(hemiLight);

    // Key light (warm key from front top right)
    const keyLight = new THREE.DirectionalLight(0xfff8ee, 3.0);
    keyLight.position.set(6, 8, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.camera.left = -5;
    keyLight.shadow.camera.right = 5;
    keyLight.shadow.camera.top = 5;
    keyLight.shadow.camera.bottom = -5;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Fill light (cool fill from left)
    const fillLight = new THREE.DirectionalLight(0xd5e8ff, 1.5);
    fillLight.position.set(-6, 4, 4);
    scene.add(fillLight);

    // Rim light (Diya Green signature glow from rear top left)
    const rimLight = new THREE.DirectionalLight(0x22c55e, 1.2);
    rimLight.position.set(-5, 4, -5);
    scene.add(rimLight);

    // Additional bottom bounce
    const bounceLight = new THREE.DirectionalLight(0xffffff, 0.4);
    bounceLight.position.set(0, -5, 0);
    scene.add(bounceLight);

    // ─── 3. Studio Ground & Platform ────────────────────────────────
    const groundGeo = new THREE.PlaneGeometry(30, 30);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x12161f,
      roughness: 0.85,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = true;
    scene.add(ground);

    // Circular pedestal platform under car
    const platformGeo = new THREE.CylinderGeometry(3.2, 3.4, 0.08, 64);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x1a2130,
      roughness: 0.3,
      metalness: 0.6,
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.y = -0.04;
    platform.receiveShadow = true;
    scene.add(platform);

    // Pedestal rim ring light
    const ringGeo = new THREE.TorusGeometry(3.3, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.001;
    scene.add(ring);

    // ─── 4. Load 3D Car Model (GLTF/GLB) ───────────────────────────
    const carPivot = new THREE.Group();
    scene.add(carPivot);

    const loader = new GLTFLoader();

    loader.load(
      "/models/car.glb",
      (gltf) => {
        const model = gltf.scene;

        // Auto-center and normalize size
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        model.position.x = -center.x;
        model.position.y = -box.min.y; // Sit flat on floor
        model.position.z = -center.z;

        // Target length ~ 4.2 units
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4.2 / maxDim;
        model.scale.set(scale, scale, scale);

        // Enhance materials
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;

              // Tune body car paint reflections
              if (mat.name && (mat.name.toLowerCase().includes("body") || mat.name.toLowerCase().includes("paint") || mat.name.toLowerCase().includes("car_paint"))) {
                mat.roughness = 0.15;
                mat.metalness = 0.85;
                mat.envMapIntensity = 1.5;
              }
              // Glass transparency
              if (mat.name && (mat.name.toLowerCase().includes("glass") || mat.name.toLowerCase().includes("window"))) {
                mat.transparent = true;
                mat.opacity = 0.45;
                mat.roughness = 0.05;
              }
              // Chrome / Rim shine
              if (mat.name && (mat.name.toLowerCase().includes("rim") || mat.name.toLowerCase().includes("chrome"))) {
                mat.metalness = 0.95;
                mat.roughness = 0.1;
              }
            }
          }
        });

        carPivot.add(model);
        setIsLoaded(true);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadingProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (error) => {
        console.error("Error loading 3D car model:", error);
      }
    );

    // ─── 5. Mouse & Scroll Interactivity ───────────────────────────
    let mouseX = 0;
    let targetRotY = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetRotY = mouseX * 0.4;
    };
    el.addEventListener("mousemove", handleMouseMove);

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Resize handler
    const handleResize = () => {
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", handleResize);

    // ─── 6. Animation Loop ─────────────────────────────────────────
    let frameId: number;
    let time = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.012;

      // Smooth mouse rotation + continuous slow 360 spin
      currentRotY += (targetRotY - currentRotY) * 0.05;
      carPivot.rotation.y = currentRotY + time * 0.15;

      // Subtle float & scroll pitch
      carPivot.position.y = Math.sin(time * 0.8) * 0.02;
      carPivot.rotation.x = Math.sin(scrollY * 0.0006) * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // ─── 7. Cleanup ────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(frameId);
      el.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative ${className || ""}`} style={{ width: "100%", height: "100%" }}>
      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-3">
          <div
            className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }}
          />
          <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Loading 3D Car ({loadingProgress}%)
          </div>
        </div>
      )}

      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full" aria-label="3D Car Display" />
    </div>
  );
}
