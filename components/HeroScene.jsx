"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { heroCubes } from "@/lib/content";

const ORANGE = "#ff9b00";
const PURPLE = "#2a0e4a";
const GOLD = "#c39a4b";

// Gold coin face with an embossed rupee sign.
function coinTexture(font) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(100, 90, 10, 128, 128, 128);
  g.addColorStop(0, "#f7dc9a");
  g.addColorStop(0.6, "#d8ad55");
  g.addColorStop(1, "#a97d2c");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = "rgba(120,80,20,.45)";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(128, 128, 104, 0, Math.PI * 2);
  ctx.stroke();
  // The cylinder cap's UVs turn the image 90° clockwise once the coin is stood up, so draw it pre-rotated
  ctx.translate(128, 128);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `800 130px ${font}`;
  ctx.fillStyle = "rgba(255,240,200,.6)";
  ctx.fillText("₹", -4, 4);
  ctx.fillStyle = "#8a6420";
  ctx.fillText("₹", 0, 8);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// Small floating stat card (rendered as a textured plane).
function cardTexture(font, { label, value, accent }) {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 224;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.beginPath();
  ctx.roundRect(8, 8, 496, 208, 40);
  ctx.fill();
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.roundRect(36, 56, 112, 112, 28);
  ctx.fill();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 12;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(62, 132);
  ctx.lineTo(88, 104);
  ctx.lineTo(104, 118);
  ctx.lineTo(124, 90);
  ctx.stroke();
  ctx.fillStyle = "#6a5c80";
  ctx.font = `700 34px ${font}`;
  ctx.fillText(label, 176, 96);
  ctx.fillStyle = PURPLE;
  ctx.font = `800 60px ${font}`;
  ctx.fillText(value, 174, 158);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// Draws a cube's front label onto a canvas so it can be used as a texture.
function drawLabel(canvas, title, font) {
  const ctx = canvas.getContext("2d");
  const s = canvas.width;
  const g = ctx.createLinearGradient(0, 0, s, s);
  g.addColorStop(0, "#ffffff");
  g.addColorStop(1, "#f4f0fa");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);

  ctx.fillStyle = ORANGE;
  ctx.fillRect(s * 0.42, s * 0.3, s * 0.16, s * 0.035);

  ctx.fillStyle = PURPLE;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const size = title.length > 4 ? s * 0.2 : s * 0.25;
  ctx.font = `800 ${size}px ${font}`;
  ctx.fillText(title, s / 2, s * 0.56);
}

function solidTexture(color, accent) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2;
  for (let i = -256; i < 256; i += 28) {
    ctx.beginPath();
    ctx.moveTo(i, 256);
    ctx.lineTo(i + 256, 0);
    ctx.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export default function HeroScene() {
  const canvasRef = useRef(null);
  const tipRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const tip = tipRef.current;
    const host = canvas.parentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 14);

    // Soft studio reflections so the gold and glossy pieces read as metal
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envMap;
    scene.environmentIntensity = 0.55;

    scene.add(new THREE.AmbientLight("#ffffff", 1.1));
    const key = new THREE.DirectionalLight("#ffffff", 2);
    key.position.set(4, 6, 8);
    scene.add(key);
    const warm = new THREE.PointLight(ORANGE, 25, 20);
    warm.position.set(-3, 2, 5);
    scene.add(warm);

    const cluster = new THREE.Group();
    scene.add(cluster);

    // Shared side materials: purple left/right, orange top/bottom, white labelled front/back
    const sidePurple = new THREE.MeshStandardMaterial({
      map: solidTexture(PURPLE, "rgba(255,155,0,.18)"),
      roughness: 0.5,
      metalness: 0.1,
    });
    const sideOrange = new THREE.MeshStandardMaterial({
      map: solidTexture(ORANGE, "rgba(255,255,255,.18)"),
      roughness: 0.45,
      metalness: 0.05,
    });

    const fontFamily =
      getComputedStyle(document.documentElement).getPropertyValue("--font-head").trim() || "sans-serif";

    // Honeycomb formation: one centre cube with six around it (x, y, z, size)
    const layout = [
      [0, 0, 0.6, 1.35],
      [0, 2.2, -0.3, 1.05],
      [1.95, 1.1, 0.1, 1.05],
      [1.95, -1.1, -0.4, 1.05],
      [0, -2.2, 0.2, 1.05],
      [-1.95, -1.1, -0.2, 1.05],
      [-1.95, 1.1, 0, 1.05],
    ];

    const labels = [];
    const cubes = heroCubes.map((data, i) => {
      const [x, y, z, size] = layout[i % layout.length];
      const c = document.createElement("canvas");
      c.width = c.height = 512;
      drawLabel(c, data.title, fontFamily);
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      labels.push({ canvas: c, tex, title: data.title });

      const face = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.6,
        metalness: 0,
        envMapIntensity: 0.4,
        emissive: new THREE.Color(ORANGE),
        emissiveIntensity: 0,
      });
      // Material order: +x, -x, +y, -y, +z, -z
      const mats = [sidePurple, sidePurple, sideOrange, sideOrange, face, face];
      const mesh = new THREE.Mesh(new RoundedBoxGeometry(size, size, size, 4, size * 0.14), mats);
      mesh.position.set(x, y, z);
      mesh.rotation.set((Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.2);
      mesh.userData = {
        base: mesh.position.clone(),
        baseRot: mesh.rotation.clone(),
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 0.5,
        hover: 0,
        intro: 0,
        introDelay: 0.25 + i * 0.08,
        face,
      };
      cluster.add(mesh);
      return mesh;
    });

    // Redraw labels once the web font is ready (canvas falls back otherwise)
    document.fonts?.ready.then(() => {
      labels.forEach(({ canvas: c, tex, title }) => {
        drawLabel(c, title, fontFamily);
        tex.needsUpdate = true;
      });
    });

    // Soft particles for depth
    const pCount = 120;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 14;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: ORANGE, size: 0.04, transparent: true, opacity: 0.55, depthWrite: false })
    );
    scene.add(particles);


    // ---------- Finance-themed 3D decor around the formation ----------
    // Each item: { obj, pos, delay, spin(t, ease) } and pops in after the cubes.
    const decor = [];
    const addDecor = (obj, [x, y, z], delay, animate) => {
      obj.position.set(x, y, z);
      obj.scale.setScalar(0);
      obj.userData = { base: new THREE.Vector3(x, y, z), delay, animate, phase: Math.random() * 6 };
      cluster.add(obj);
      decor.push(obj);
    };

    // Rupee coins
    // Textures with text are redrawn once the web font has loaded
    const fontTextures = [];
    const withFont = (mat, make) => {
      mat.map = make();
      fontTextures.push({ mat, make });
      return mat;
    };
    document.fonts?.ready.then(() =>
      fontTextures.forEach(({ mat, make }) => {
        mat.map.dispose();
        mat.map = make();
        mat.needsUpdate = true;
      })
    );

    const coinFace = withFont(
      new THREE.MeshStandardMaterial({ metalness: 0.65, roughness: 0.3 }),
      () => coinTexture(fontFamily)
    );
    const coinEdge = new THREE.MeshStandardMaterial({ color: GOLD, metalness: 0.9, roughness: 0.28 });
    [
      [[-3.1, 2.5, 0.6], 0.44],
      [[3.25, -0.2, 1.0], 0.36],
      [[1.15, -3.25, 0.9], 0.3],
    ].forEach(([pos, r], i) => {
      const pivot = new THREE.Group();
      const coin = new THREE.Mesh(new THREE.CylinderGeometry(r, r, r * 0.22, 48), [coinEdge, coinFace, coinFace]);
      coin.rotation.x = Math.PI / 2;
      pivot.add(coin);
      addDecor(pivot, pos, 1 + i * 0.12, (o, t) => {
        // Rock rather than spin so the mirrored back face never shows
        o.rotation.y = Math.sin(t * (0.8 + i * 0.2) + o.userData.phase) * 0.55;
      });
    });

    // Bar chart on a plinth
    const chart = new THREE.Group();
    const plinth = new THREE.Mesh(
      new RoundedBoxGeometry(2, 0.14, 0.9, 3, 0.05),
      new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.4 })
    );
    chart.add(plinth);
    const barGeo = new THREE.BoxGeometry(0.3, 1, 0.3);
    barGeo.translate(0, 0.5, 0);
    const bars = [
      [0.55, "#6b3fa0"],
      [0.85, PURPLE],
      [1.2, ORANGE],
      [1.65, GOLD],
    ].map(([h, color], i) => {
      const bar = new THREE.Mesh(
        barGeo,
        new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: color === GOLD ? 0.7 : 0.1 })
      );
      bar.position.set(-0.66 + i * 0.44, 0.07, 0);
      bar.userData.h = h;
      chart.add(bar);
      return bar;
    });
    chart.rotation.set(0.25, 0.55, 0);
    addDecor(chart, [-3.2, -2.6, 0.4], 1.1, (o, t, ease) => {
      bars.forEach((b, i) => {
        const grow = Math.min(1, Math.max(0, ease * 1.6 - i * 0.15));
        b.scale.y = Math.max(0.001, b.userData.h * grow * (1 + Math.sin(t * 1.2 + i) * 0.04));
      });
      o.rotation.y = 0.55 + Math.sin(t * 0.4) * 0.15;
    });

    // Donut (pie) chart
    const donut = new THREE.Group();
    let start = 0;
    [
      [0.45, ORANGE],
      [0.3, PURPLE],
      [0.25, GOLD],
    ].forEach(([share, color]) => {
      const arc = share * Math.PI * 2 - 0.08;
      const seg = new THREE.Mesh(
        new THREE.TorusGeometry(0.6, 0.2, 20, 64, arc),
        new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness: color === GOLD ? 0.7 : 0.1 })
      );
      seg.rotation.z = start;
      start += share * Math.PI * 2;
      donut.add(seg);
    });
    addDecor(donut, [3.2, 2.45, -0.4], 1.2, (o, t) => {
      o.rotation.x = -0.5 + Math.sin(t * 0.5) * 0.15;
      o.rotation.z = t * 0.35;
    });

    // Growth line that draws itself, ending in an arrowhead
    const curve = new THREE.CatmullRomCurve3(
      [
        [-1.6, -0.7],
        [-0.9, -0.15],
        [-0.3, -0.45],
        [0.5, 0.35],
        [1.5, 0.8],
      ].map(([x, y]) => new THREE.Vector3(x, y, 0))
    );
    const tubeGeo = new THREE.TubeGeometry(curve, 120, 0.05, 10);
    const lineMat = new THREE.MeshStandardMaterial({ color: ORANGE, emissive: ORANGE, emissiveIntensity: 0.25, roughness: 0.3 });
    const tube = new THREE.Mesh(tubeGeo, lineMat);
    const head = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.32, 20), lineMat);
    const end = curve.getPoint(1);
    head.position.copy(end);
    head.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), curve.getTangent(1).normalize());
    const growth = new THREE.Group();
    growth.add(tube, head);
    const tubeCount = tubeGeo.index.count;
    addDecor(growth, [-0.4, 3.55, -1.4], 1.3, (o, t, ease) => {
      const p = Math.min(1, ease * 1.2);
      tubeGeo.setDrawRange(0, Math.floor((tubeCount * p) / 6) * 6);
      head.visible = p > 0.98;
      o.rotation.y = Math.sin(t * 0.5) * 0.25;
    });

    // Floating stat cards
    [
      [{ label: "Tax saved", value: "₹12.4L", accent: ORANGE }, [3.05, -2.55, 1.3], -0.25],
      [{ label: "Filings on time", value: "100%", accent: "#6b3fa0" }, [-3.1, 0.35, 1.4], 0.25],
    ].forEach(([data, pos, tilt], i) => {
      const card = new THREE.Mesh(
        new THREE.PlaneGeometry(1.9, 0.83),
        withFont(new THREE.MeshBasicMaterial({ transparent: true, toneMapped: false }), () => cardTexture(fontFamily, data))
      );
      card.rotation.y = tilt;
      addDecor(card, pos, 1.45 + i * 0.15, (o, t) => {
        o.rotation.y = tilt + Math.sin(t * 0.6 + i) * 0.12;
      });
    });

    // Small gold gems
    const gemMat = new THREE.MeshStandardMaterial({ color: GOLD, metalness: 0.85, roughness: 0.2, flatShading: true });
    [
      [-1.2, 3.1, 0.8, 0.16],
      [2.6, 3.4, 0.4, 0.12],
      [-2.7, -0.9, 1.6, 0.13],
      [2.9, 1.0, 1.6, 0.11],
      [-1.6, -3.4, 0.5, 0.14],
    ].forEach(([x, y, z, s], i) => {
      const gem = new THREE.Mesh(new THREE.OctahedronGeometry(s), gemMat);
      addDecor(gem, [x, y, z], 1.5 + i * 0.06, (o, t) => {
        o.rotation.x = t * 0.8 + i;
        o.rotation.y = t * 1.1;
      });
    });

    // Sizing: formation sits on the right on wide screens, centred on mobile
    let wide = true;
    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      wide = w > 960;
      cluster.position.x = wide ? Math.min(4.4, camera.aspect * 2.05) : 0;
      cluster.position.y = wide ? 0.25 : 0;
      cluster.scale.setScalar(wide ? 0.56 : Math.max(0.45, Math.min(0.58, w / 760)));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // Pointer: parallax, hover via raycasting, drag to spin
    const pointer = new THREE.Vector2(10, 10);
    const target = { x: 0, y: 0 };
    const spin = { y: 0, x: 0, vy: 0, vx: 0 };
    let dragging = false;
    let last = { x: 0, y: 0 };
    let hovered = null;
    const raycaster = new THREE.Raycaster();
    const tmp = new THREE.Vector3();

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      target.x = pointer.x;
      target.y = pointer.y;
      if (dragging) {
        spin.vy = (e.clientX - last.x) * 0.006;
        spin.vx = (e.clientY - last.y) * 0.004;
        last = { x: e.clientX, y: e.clientY };
      }
    };
    const onDown = (e) => {
      if (!hovered) return;
      dragging = true;
      last = { x: e.clientX, y: e.clientY };
    };
    const onUp = () => {
      dragging = false;
    };
    const onLeave = () => {
      pointer.set(10, 10);
      target.x = target.y = 0;
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    host.addEventListener("pointerleave", onLeave);

    // Only render while the hero is on screen
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(host);

    let raf;
    let t = 0;
    let prev = performance.now();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const now = performance.now();
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      if (!visible) return;
      t += dt;

      // Hover detection
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(cubes, false)[0]?.object ?? null;
      if (hit !== hovered) {
        hovered = hit;
        host.classList.toggle("is-hovering-cube", !!hovered);
        if (hovered) tip.textContent = heroCubes[cubes.indexOf(hovered)].sub;
      }

      // Inertial spin
      spin.y += spin.vy;
      spin.x += spin.vx;
      spin.vy *= 0.94;
      spin.vx *= 0.94;
      spin.x *= 0.98;
      spin.y *= dragging ? 1 : 0.985;

      const motion = reduceMotion ? 0 : 1;
      const sway = Math.sin(t * 0.25) * 0.12 * motion;
      cluster.rotation.y += (target.x * 0.25 + spin.y + sway - cluster.rotation.y) * 0.06;
      cluster.rotation.x += (-target.y * 0.15 + spin.x - cluster.rotation.x) * 0.06;

      cubes.forEach((m) => {
        const u = m.userData;
        u.intro = Math.min(1, u.intro + (t > u.introDelay ? dt * 1.6 : 0));
        const ease = 1 - Math.pow(1 - u.intro, 3);
        u.hover += ((m === hovered ? 1 : 0) - u.hover) * 0.12;

        const bob = Math.sin(t * u.speed + u.phase) * 0.12 * motion;
        m.position.set(u.base.x, u.base.y + bob, u.base.z - (1 - ease) * 10 + u.hover * 0.7);
        m.scale.setScalar(ease * (1 + u.hover * 0.12));

        // Hovered cube turns to face the viewer
        const rx = u.baseRot.x + Math.sin(t * 0.4 + u.phase) * 0.12 * motion;
        const ry = u.baseRot.y + Math.cos(t * 0.3 + u.phase) * 0.2 * motion;
        m.rotation.x += (rx * (1 - u.hover) - cluster.rotation.x * u.hover - m.rotation.x) * 0.1;
        m.rotation.y += (ry * (1 - u.hover) - cluster.rotation.y * u.hover - m.rotation.y) * 0.1;
        u.face.emissiveIntensity = u.hover * 0.1;
      });

      decor.forEach((o) => {
        const u = o.userData;
        const ease = t > u.delay ? 1 - Math.pow(1 - Math.min(1, (t - u.delay) * 1.4), 3) : 0;
        o.scale.setScalar(ease);
        o.position.y = u.base.y + Math.sin(t * 0.8 + u.phase) * 0.15 * motion;
        u.animate(o, motion ? t : 0, ease);
      });

      // Tooltip follows the hovered cube
      if (hovered) {
        hovered.getWorldPosition(tmp);
        tmp.y += 0.75 * cluster.scale.y;
        tmp.project(camera);
        const x = (tmp.x * 0.5 + 0.5) * host.clientWidth;
        const y = (-tmp.y * 0.5 + 0.5) * host.clientHeight;
        tip.style.transform = `translate(${x}px, ${y}px) translate(-50%, -100%)`;
      }

      particles.rotation.y = t * 0.02 * motion;
      warm.position.x = -3 + target.x * 3;
      warm.position.y = 2 + target.y * 2;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      host.removeEventListener("pointerleave", onLeave);
      scene.traverse((o) => {
        o.geometry?.dispose();
        const m = o.material;
        (Array.isArray(m) ? m : m ? [m] : []).forEach((mat) => {
          mat.map?.dispose();
          mat.dispose();
        });
      });
      envMap.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      <div ref={tipRef} className="cube-tip" aria-hidden="true" />
    </>
  );
}
