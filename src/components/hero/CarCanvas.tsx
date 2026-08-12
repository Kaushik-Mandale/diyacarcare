import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

interface CarCanvasProps {
  className?: string;
}

// 3 Dynamic Visual Modes for Car Care
type DisplayMode = "scan" | "service" | "detail";

export default function CarCanvas({ className }: CarCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<DisplayMode>("scan");

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // ─── Scene & Camera Setup ─────────────────────────────────────
    const scene = new THREE.Scene();
    const w = el.clientWidth;
    const h = el.clientHeight;

    const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
    camera.position.set(3.8, 1.4, 4.8);
    camera.lookAt(0, 0.35, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    el.appendChild(renderer.domElement);

    // ─── Studio Lighting Setup ─────────────────────────────────────
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x0a101d, 1.4);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e6, 3.5);
    keyLight.position.set(5, 7, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8bc34a, 1.0);
    fillLight.position.set(-5, 4, 3);
    scene.add(fillLight);

    // Diya Green Rim Lighting
    const rimLight = new THREE.DirectionalLight(0x22c55e, 2.5);
    rimLight.position.set(-4, 3, -4);
    scene.add(rimLight);

    // Underbody neon light
    const underGlow = new THREE.PointLight(0x22c55e, 3, 6);
    underGlow.position.set(0, 0.1, 0);
    scene.add(underGlow);

    // ─── Pedestal & Laser Scan Grid ───────────────────────────────
    const platformGroup = new THREE.Group();
    scene.add(platformGroup);

    // Ground reflector disc
    const pedestalGeo = new THREE.CylinderGeometry(2.8, 2.9, 0.06, 64);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x0d121d,
      roughness: 0.25,
      metalness: 0.8,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -0.03;
    pedestal.receiveShadow = true;
    platformGroup.add(pedestal);

    // Outer neon Ring
    const ringGeo = new THREE.TorusGeometry(2.85, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.001;
    platformGroup.add(ring);

    // Tech Grid Floor Lines
    const gridHelper = new THREE.GridHelper(6, 20, 0x22c55e, 0x1e293b);
    gridHelper.position.y = 0.002;
    platformGroup.add(gridHelper);

    // ─── Procedural Supercar Assembly ──────────────────────────────
    const carPivot = new THREE.Group();
    scene.add(carPivot);

    // Shared Materials
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x111622,
      roughness: 0.12,
      metalness: 0.9,
    });

    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.5,
      metalness: 0.4,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.08,
      metalness: 0.95,
    });

    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.05,
      metalness: 0.1,
      transparent: true,
      opacity: 0.5,
    });

    const headlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const greenGlowMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });

    // 1. Lower Chassis
    const chassisGeo = new THREE.BoxGeometry(3.6, 0.45, 1.7);
    const chassis = new THREE.Mesh(chassisGeo, bodyMat);
    chassis.position.y = 0.45;
    chassis.castShadow = true;
    carPivot.add(chassis);

    // Front Bumper Splitter
    const splitterGeo = new THREE.BoxGeometry(0.5, 0.08, 1.75);
    const splitter = new THREE.Mesh(splitterGeo, carbonMat);
    splitter.position.set(-1.8, 0.25, 0);
    carPivot.add(splitter);

    // 2. Cabin Hood Curve (Extruded aerodynamic shape)
    const cabinShape = new THREE.Shape();
    cabinShape.moveTo(-1.1, 0);
    cabinShape.lineTo(-0.6, 0.48);
    cabinShape.lineTo(0.5, 0.48);
    cabinShape.lineTo(1.2, 0.1);
    cabinShape.lineTo(1.3, 0);
    cabinShape.closePath();

    const extrudeSettings = { depth: 1.35, bevelEnabled: true, bevelSegments: 4, steps: 1, bevelSize: 0.06, bevelThickness: 0.06 };
    const cabinGeo = new THREE.ExtrudeGeometry(cabinShape, extrudeSettings);
    cabinGeo.center();
    const cabin = new THREE.Mesh(cabinGeo, bodyMat);
    cabin.position.set(-0.1, 0.88, 0);
    cabin.castShadow = true;
    carPivot.add(cabin);

    // Windshield Glass
    const wsGeo = new THREE.PlaneGeometry(0.85, 0.72);
    const windshield = new THREE.Mesh(wsGeo, glassMat);
    windshield.rotation.y = -Math.PI / 2;
    windshield.rotation.x = -Math.PI * 0.22;
    windshield.position.set(-0.78, 0.88, 0);
    carPivot.add(windshield);

    // Side Windows
    const swGeo = new THREE.PlaneGeometry(0.9, 0.38);
    const swL = new THREE.Mesh(swGeo, glassMat);
    swL.position.set(-0.05, 0.92, 0.7);
    carPivot.add(swL);
    const swR = new THREE.Mesh(swGeo, glassMat);
    swR.position.set(-0.05, 0.92, -0.7);
    swR.rotation.y = Math.PI;
    carPivot.add(swR);

    // 3. LED Headlights & Taillight Strip
    const headlightL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.4), headlightMat);
    headlightL.position.set(-1.82, 0.52, 0.55);
    carPivot.add(headlightL);

    const headlightR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.4), headlightMat);
    headlightR.position.set(-1.82, 0.52, -0.55);
    carPivot.add(headlightR);

    // Rear LED Light Bar (Green Diya accent)
    const tailBar = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 1.5), greenGlowMat);
    tailBar.position.set(1.81, 0.55, 0);
    carPivot.add(tailBar);

    // 4. Wheels & Alloy Rims (4 wheels)
    const wheelPositions = [
      [-1.15, 0.32, 0.88],
      [-1.15, 0.32, -0.88],
      [1.15, 0.32, 0.88],
      [1.15, 0.32, -0.88],
    ];

    const wheels: THREE.Group[] = [];

    wheelPositions.forEach(([x, y, z]) => {
      const wg = new THREE.Group();

      // Tire
      const tireGeo = new THREE.TorusGeometry(0.32, 0.11, 24, 48);
      const tireMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 });
      const tire = new THREE.Mesh(tireGeo, tireMat);
      tire.rotation.y = Math.PI / 2;
      tire.castShadow = true;
      wg.add(tire);

      // Rim
      const rimGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.08, 32);
      const rim = new THREE.Mesh(rimGeo, chromeMat);
      rim.rotation.z = Math.PI / 2;
      wg.add(rim);

      // Brake Caliper (Green)
      const caliperGeo = new THREE.BoxGeometry(0.06, 0.14, 0.1);
      const caliper = new THREE.Mesh(caliperGeo, greenGlowMat);
      caliper.position.set(0.02, 0.1, 0);
      wg.add(caliper);

      wg.position.set(x, y, z);
      carPivot.add(wg);
      wheels.push(wg);
    });

    // 5. Diagnostic Holographic Laser Scanner Beam
    const scanBeamGeo = new THREE.PlaneGeometry(0.08, 2.2);
    const scanBeamMat = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
    });
    const scanBeam = new THREE.Mesh(scanBeamGeo, scanBeamMat);
    scanBeam.rotation.x = Math.PI / 2;
    scanBeam.position.y = 0.5;
    scene.add(scanBeam);

    // Particle Swarm floating around car
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 6;
      particlePositions[i + 1] = Math.random() * 2.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x22c55e,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ─── Interaction Tracking ─────────────────────────────────────
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

    // ─── Continuous Animation Loop ────────────────────────────────
    let frameId: number;
    let time = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.016;

      // Smooth Rotation
      currentRotY += (targetRotY - currentRotY) * 0.06;
      carPivot.rotation.y = currentRotY + time * 0.35;
      carPivot.position.y = Math.sin(time * 1.5) * 0.03;

      // Wheel Rotation
      wheels.forEach((w) => {
        w.rotation.x += 0.05;
      });

      // Laser Scan Sweep Animation
      scanBeam.position.x = Math.sin(time * 2) * 2.2;
      scanBeam.position.y = 0.5 + Math.cos(time * 2) * 0.2;

      // Scroll Pitch Effect
      carPivot.rotation.x = Math.sin(scrollY * 0.0008) * 0.04;

      // Particle floating
      particles.rotation.y = time * 0.05;

      renderer.render(scene, camera);
    };

    animate();

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
      {/* 3D Mode Selector Badge Overlay */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 glass-card px-3 py-1.5 rounded-xl">
        <div className="w-2 h-2 rounded-full animate-ping" style={{ background: "var(--accent)" }} />
        <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
          3D Live Diagnostics
        </span>
      </div>

      {/* Mode Switches */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2 glass-card p-1.5 rounded-2xl">
        {[
          { id: "scan", label: "🔍 Diagnostic Scan" },
          { id: "service", label: "🛠️ Service Mode" },
          { id: "detail", label: "✨ Detailing Polish" },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveMode(m.id as DisplayMode)}
            className="px-3 py-1 rounded-xl text-xs font-semibold transition-all duration-200"
            style={{
              background: activeMode === m.id ? "var(--accent)" : "transparent",
              color: activeMode === m.id ? "white" : "var(--text-secondary)",
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Canvas Mount */}
      <div ref={mountRef} className="w-full h-full" aria-label="Interactive 3D Car Care Showcase" />
    </div>
  );
}
