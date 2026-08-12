import React, { useRef, useEffect } from "react";
import * as THREE from "three";

interface CarCanvasProps {
  className?: string;
}

export default function CarCanvas({ className }: CarCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // ─── Scene setup ───────────────────────────────────────────
    const scene = new THREE.Scene();
    const w = el.clientWidth;
    const h = el.clientHeight;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(3.5, 1.5, 5.5);
    camera.lookAt(0, 0.5, 0);

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
    el.appendChild(renderer.domElement);

    // ─── Lighting ───────────────────────────────────────────────
    // Ambient
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    // Key light
    const keyLight = new THREE.DirectionalLight(0xfff5e0, 2.5);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 0.1;
    keyLight.shadow.camera.far = 30;
    scene.add(keyLight);

    // Rim light (green tint for branding)
    const rimLight = new THREE.DirectionalLight(0x22ff88, 0.4);
    rimLight.position.set(-5, 3, -3);
    scene.add(rimLight);

    // Fill light
    const fillLight = new THREE.DirectionalLight(0xe0f0ff, 0.8);
    fillLight.position.set(-3, 2, 4);
    scene.add(fillLight);

    // ─── Ground plane (reflection) ─────────────────────────────
    const groundGeo = new THREE.PlaneGeometry(16, 12);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xf0eeea,
      roughness: 0.9,
      metalness: 0.05,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = true;
    scene.add(ground);

    // ─── Car Group ──────────────────────────────────────────────
    const carGroup = new THREE.Group();

    // Shared materials
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xc8cdd4,
      roughness: 0.12,
      metalness: 0.85,
      envMapIntensity: 1.2,
    });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.5, metalness: 0.3 });
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x8bb4d4,
      roughness: 0.05,
      metalness: 0.1,
      transparent: true,
      opacity: 0.55,
    });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xd0d0d0, roughness: 0.1, metalness: 0.95 });
    const rubberMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
    const lightMat = new THREE.MeshStandardMaterial({ color: 0xfff9e0, emissive: 0xffe44a, emissiveIntensity: 0.6 });
    const redLightMat = new THREE.MeshStandardMaterial({ color: 0xff3300, emissive: 0xff1100, emissiveIntensity: 0.5 });

    // Helper to add mesh
    const addMesh = (geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) => {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.rotation.set(rx, ry, rz);
      mesh.scale.set(sx, sy, sz);
      mesh.castShadow = true;
      carGroup.add(mesh);
      return mesh;
    };

    // ── Body ────────────────────────────────────────────────────
    // Main body (lower)
    const bodyGeo = new THREE.BoxGeometry(3.8, 0.55, 1.75);
    bodyGeo.translate(0, 0, 0);
    addMesh(bodyGeo, bodyMat, 0, 0.55, 0);

    // Side sill
    const sillL = new THREE.BoxGeometry(3.6, 0.12, 0.05);
    addMesh(sillL, darkMat, 0, 0.32, 0.9);
    addMesh(sillL, darkMat, 0, 0.32, -0.9);

    // Cabin (top)
    // Sedan-style cabin with slight curve on top
    const cabinPoints = [
      new THREE.Vector2(-1.2, 0),
      new THREE.Vector2(-1.5, 0),
      new THREE.Vector2(-1.5, 0.5),
      new THREE.Vector2(-0.5, 0.82),
      new THREE.Vector2(0.6, 0.82),
      new THREE.Vector2(1.3, 0.42),
      new THREE.Vector2(1.5, 0),
      new THREE.Vector2(1.2, 0),
    ];
    const cabinShape = new THREE.Shape(cabinPoints);
    const cabinGeo = new THREE.ExtrudeGeometry(cabinShape, { depth: 1.42, bevelEnabled: false });
    const cabin = new THREE.Mesh(cabinGeo, bodyMat);
    cabin.position.set(-1.5, 0.82, -0.71);
    cabin.castShadow = true;
    carGroup.add(cabin);

    // Windshield
    const wsGeo = new THREE.PlaneGeometry(0.95, 0.72);
    addMesh(wsGeo, glassMat, -0.72, 1.22, 0, 0, 0, Math.PI * 0.22);
    // Rear window
    addMesh(wsGeo, glassMat, 0.98, 1.18, 0, 0, 0, -Math.PI * 0.22);
    // Side windows
    const swGeo = new THREE.PlaneGeometry(0.6, 0.42);
    addMesh(swGeo, glassMat, 0.05, 1.22, 0.73, 0, Math.PI / 2, 0);
    addMesh(swGeo, glassMat, 0.05, 1.22, -0.73, 0, Math.PI / 2, 0);

    // ── Hood ──────────────────────────────────────────────────
    const hoodGeo = new THREE.BoxGeometry(1.35, 0.06, 1.65);
    addMesh(hoodGeo, bodyMat, -1.4, 0.86, 0, -0.04, 0, 0);

    // ── Trunk ─────────────────────────────────────────────────
    const trunkGeo = new THREE.BoxGeometry(0.75, 0.14, 1.65);
    addMesh(trunkGeo, bodyMat, 1.52, 0.82, 0, 0.06, 0, 0);

    // ── Front bumper ──────────────────────────────────────────
    const fbGeo = new THREE.BoxGeometry(0.15, 0.35, 1.65);
    addMesh(fbGeo, darkMat, -1.98, 0.45, 0);
    // Grille
    const grilleGeo = new THREE.BoxGeometry(0.06, 0.18, 1.1);
    addMesh(grilleGeo, darkMat, -2.02, 0.5, 0);
    // Front badge
    const badgeGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.04, 16);
    addMesh(badgeGeo, chromeMat, -2.04, 0.62, 0, 0, 0, Math.PI / 2);

    // ── Rear bumper ───────────────────────────────────────────
    const rbGeo = new THREE.BoxGeometry(0.15, 0.35, 1.65);
    addMesh(rbGeo, darkMat, 1.98, 0.45, 0);
    // Exhaust
    const exGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.1, 12);
    addMesh(exGeo, chromeMat, 2.02, 0.28, 0.55, 0, 0, Math.PI / 2);

    // ── Headlights ────────────────────────────────────────────
    const hlGeo = new THREE.BoxGeometry(0.06, 0.12, 0.35);
    addMesh(hlGeo, lightMat, -2.01, 0.65, 0.55);
    addMesh(hlGeo, lightMat, -2.01, 0.65, -0.55);
    // DRL
    const drlGeo = new THREE.BoxGeometry(0.04, 0.04, 0.55);
    addMesh(drlGeo, lightMat, -2.02, 0.58, 0);

    // ── Taillights ────────────────────────────────────────────
    const tlGeo = new THREE.BoxGeometry(0.06, 0.14, 0.38);
    addMesh(tlGeo, redLightMat, 2.01, 0.72, 0.55);
    addMesh(tlGeo, redLightMat, 2.01, 0.72, -0.55);

    // ── Wheels ────────────────────────────────────────────────
    const wheelPositions = [
      [-1.25, 0.3, 0.92],
      [-1.25, 0.3, -0.92],
      [1.1, 0.3, 0.92],
      [1.1, 0.3, -0.92],
    ];

    const wheels: THREE.Group[] = [];

    wheelPositions.forEach(([x, y, z]) => {
      const wg = new THREE.Group();

      // Tyre
      const tyreGeo = new THREE.TorusGeometry(0.3, 0.1, 16, 40);
      const tyre = new THREE.Mesh(tyreGeo, rubberMat);
      tyre.rotation.y = Math.PI / 2;
      tyre.castShadow = true;
      wg.add(tyre);

      // Rim
      const rimGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.01, 24);
      const rim = new THREE.Mesh(rimGeo, chromeMat);
      rim.rotation.z = Math.PI / 2;
      wg.add(rim);

      // Spokes (5)
      for (let i = 0; i < 5; i++) {
        const spokeGeo = new THREE.BoxGeometry(0.04, 0.18, 0.03);
        const spoke = new THREE.Mesh(spokeGeo, darkMat);
        spoke.rotation.z = (i / 5) * Math.PI * 2;
        spoke.position.y = Math.sin((i / 5) * Math.PI * 2) * 0.09;
        spoke.position.z = Math.cos((i / 5) * Math.PI * 2) * 0.09;
        rim.add(spoke);
      }

      // Hub
      const hubGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.015, 16);
      const hub = new THREE.Mesh(hubGeo, chromeMat);
      hub.rotation.z = Math.PI / 2;
      wg.add(hub);

      wg.position.set(x, y, z);
      carGroup.add(wg);
      wheels.push(wg);
    });

    // ── Door handles ─────────────────────────────────────────
    const dhGeo = new THREE.BoxGeometry(0.18, 0.04, 0.03);
    addMesh(dhGeo, chromeMat, -0.5, 0.78, 0.895);
    addMesh(dhGeo, chromeMat, 0.6, 0.78, 0.895);
    addMesh(dhGeo, chromeMat, -0.5, 0.78, -0.895);
    addMesh(dhGeo, chromeMat, 0.6, 0.78, -0.895);

    // ── Side mirrors ──────────────────────────────────────────
    const mirrorGeo = new THREE.BoxGeometry(0.18, 0.1, 0.06);
    addMesh(mirrorGeo, bodyMat, -1.35, 1.04, 0.92);
    addMesh(mirrorGeo, bodyMat, -1.35, 1.04, -0.92);

    // Shadow under car
    const shadowGeo = new THREE.PlaneGeometry(4.2, 2.0);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.12,
    });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.005;
    carGroup.add(shadow);

    // Position car
    carGroup.position.y = 0;
    scene.add(carGroup);

    // ─── Mouse tracking ─────────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRotY = mouseX * 0.3;
    };
    el.addEventListener("mousemove", handleMouseMove);

    // ─── Scroll tracking ────────────────────────────────────────
    let scrollY = 0;
    const handleScroll = () => { scrollY = window.scrollY; };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // ─── Resize handler ─────────────────────────────────────────
    const handleResize = () => {
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", handleResize);

    // ─── Animation loop ─────────────────────────────────────────
    let frameId: number;
    let time = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.016;

      // Smooth mouse follow
      currentRotY += (targetRotY - currentRotY) * 0.05;
      carGroup.rotation.y = currentRotY + time * 0.08;

      // Scroll-based pitch (subtle)
      carGroup.rotation.x = Math.sin(scrollY * 0.0008) * 0.05;

      // Wheel spin
      wheels.forEach((w) => {
        w.rotation.x += 0.03;
      });

      // Subtle car float
      carGroup.position.y = Math.sin(time * 0.5) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // ─── Cleanup ────────────────────────────────────────────────
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
    <div
      ref={mountRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
      aria-label="Interactive 3D car display"
    />
  );
}
