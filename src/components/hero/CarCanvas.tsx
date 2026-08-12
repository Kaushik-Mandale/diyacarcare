import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface CarCanvasProps {
  className?: string;
}

export default function CarCanvas({ className }: CarCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<boolean>(false);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // ─── 1. Scene & Camera Setup ──────────────────────────────────
    const scene = new THREE.Scene();
    const w = el.clientWidth || 600;
    const h = el.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.set(3.6, 1.3, 4.6);
    camera.lookAt(0, 0.4, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setLoadError(true);
      return;
    }

    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    el.appendChild(renderer.domElement);

    // ─── 2. Professional Studio Lighting Setup ─────────────────────
    // Sky/Ground Ambient
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1a202c, 1.8);
    scene.add(hemiLight);

    // Main Studio Sun Key Light
    const keyLight = new THREE.DirectionalLight(0xfffdfa, 3.2);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.camera.left = -4;
    keyLight.shadow.camera.right = 4;
    keyLight.shadow.camera.top = 4;
    keyLight.shadow.camera.bottom = -4;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Soft Cool Fill Light
    const fillLight = new THREE.DirectionalLight(0xdbeafe, 1.4);
    fillLight.position.set(-5, 4, 3);
    scene.add(fillLight);

    // Diya Green Signature Rim Highlight
    const rimLight = new THREE.DirectionalLight(0x22c55e, 2.0);
    rimLight.position.set(-4, 4, -5);
    scene.add(rimLight);

    // Ground Bounce Ambient
    const bounceLight = new THREE.DirectionalLight(0xffffff, 0.5);
    bounceLight.position.set(0, -4, 0);
    scene.add(bounceLight);

    // ─── 3. Studio Ground & Soft Shadow Plane ──────────────────────
    const groundGroup = new THREE.Group();
    scene.add(groundGroup);

    // Mirror-like studio pedestal
    const pedestalGeo = new THREE.CylinderGeometry(2.8, 2.9, 0.04, 64);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x111622,
      roughness: 0.2,
      metalness: 0.8,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -0.02;
    pedestal.receiveShadow = true;
    groundGroup.add(pedestal);

    // Green Accent Ring
    const ringGeo = new THREE.TorusGeometry(2.85, 0.015, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.001;
    groundGroup.add(ring);

    // Soft radial ground shadow disc
    const shadowGeo = new THREE.PlaneGeometry(6, 6);
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, "rgba(0, 0, 0, 0.6)");
      grad.addColorStop(0.5, "rgba(0, 0, 0, 0.3)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(canvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowDisc = new THREE.Mesh(shadowGeo, shadowMat);
    shadowDisc.rotation.x = -Math.PI / 2;
    shadowDisc.position.y = 0.002;
    groundGroup.add(shadowDisc);

    // ─── 4. Load & Render Actual 3D Car Model ──────────────────────
    const carPivot = new THREE.Group();
    scene.add(carPivot);

    const loader = new GLTFLoader();

    loader.load(
      "/models/car.glb",
      (gltf) => {
        try {
          const model = gltf.scene;

          // Compute exact bounding box and center
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());

          model.position.x = -center.x;
          model.position.y = -box.min.y; // Sit flat on pedestal
          model.position.z = -center.z;

          // Normalize size to approx 3.8 units length
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 3.8 / maxDim;
          model.scale.set(scale, scale, scale);

          // Enable shadows safely across all child meshes
          model.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
            }
          });

          carPivot.add(model);
          setIsLoaded(true);
        } catch (err) {
          console.error("Error setting up 3D car model:", err);
          setLoadError(true);
        }
      },
      undefined,
      (error) => {
        console.error("Failed to load /models/car.glb:", error);
        setLoadError(true);
      }
    );

    // ─── 5. Smooth Parallax & Spin Controls ─────────────────────────
    let mouseX = 0;
    let targetRotY = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetRotY = mouseX * 0.45;
    };
    el.addEventListener("mousemove", handleMouseMove);

    let scrollY = 0;
    const handleScroll = () => { scrollY = window.scrollY; };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", handleResize);

    // ─── 6. Animation Loop ──────────────────────────────────────────
    let frameId: number;
    let time = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.012;

      // Smooth mouse rotation + continuous slow 360 degree showcase spin
      currentRotY += (targetRotY - currentRotY) * 0.05;
      carPivot.rotation.y = currentRotY + time * 0.18;

      // Gentle floating suspension effect
      carPivot.position.y = Math.sin(time * 0.8) * 0.015;

      // Scroll pitch effect
      carPivot.rotation.x = Math.sin(scrollY * 0.0006) * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // ─── 7. Cleanup ─────────────────────────────────────────────────
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
      {!isLoaded && !loadError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-3 backdrop-blur-sm">
          <div
            className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }}
          />
          <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Loading 3D Car Showcase...
          </div>
        </div>
      )}

      {/* Error Fallback */}
      {loadError && (
        <div className="absolute inset-0 flex items-center justify-center z-10 p-6 text-center">
          <div className="glass-card p-6 rounded-2xl max-w-sm">
            <span className="text-3xl block mb-2">🚗</span>
            <div className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>
              Diya Car Care 3D Showcase
            </div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>
              Premium Automotive Service & Detailing
            </div>
          </div>
        </div>
      )}

      {/* WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full" aria-label="Actual 3D Car Model Showcase" />
    </div>
  );
}
