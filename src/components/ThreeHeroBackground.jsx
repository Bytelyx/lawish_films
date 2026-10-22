import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeHeroBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x09090b, 0.002);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 120;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for mouse parallax
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 1. Subtle warm ambient light dust / golden bokeh particles
    const particleCount = 220;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const alphas = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 350;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
      scales[i] = Math.random() * 2.5 + 0.5;
      alphas[i] = Math.random() * 0.5 + 0.2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Custom circular soft particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(212, 178, 120, 0.9)');
    grad.addColorStop(0.3, 'rgba(197, 168, 128, 0.5)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    const pMaterial = new THREE.PointsMaterial({
      size: 4,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.65,
    });

    const particles = new THREE.Points(geometry, pMaterial);
    worldGroup.add(particles);

    // 2. Subtle architectural light planes (floating minimalist glass shards)
    const shardsCount = 6;
    const shardGroup = new THREE.Group();
    const shardGeo = new THREE.PlaneGeometry(35, 50);

    for (let i = 0; i < shardsCount; i++) {
      const shardMat = new THREE.MeshBasicMaterial({
        color: 0xc5a880,
        transparent: true,
        opacity: 0.035 + (i * 0.01),
        wireframe: i % 2 === 0,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(shardGeo, shardMat);
      mesh.position.set(
        (Math.random() - 0.5) * 220,
        (Math.random() - 0.5) * 140,
        (Math.random() - 0.5) * 100 - 30
      );
      mesh.rotation.set(
        Math.random() * 0.4,
        Math.random() * 0.4,
        Math.random() * 0.2
      );
      mesh.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.002,
        rotSpeedY: (Math.random() - 0.5) * 0.002,
      };
      shardGroup.add(mesh);
    }
    worldGroup.add(shardGroup);

    // Mouse tracking with smooth lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle scroll depth
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY || document.documentElement.scrollTop;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth mouse lerp
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      worldGroup.rotation.y = targetX * 0.12;
      worldGroup.rotation.x = -targetY * 0.08;

      // Scroll camera reaction
      camera.position.y = -scrollY * 0.04;
      camera.rotation.z = targetX * 0.02;

      // Particles subtle float
      const positionsArr = particles.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const yIndex = i * 3 + 1;
        positionsArr[yIndex] += Math.sin(elapsedTime + i) * 0.04;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Shards subtle rotation
      shardGroup.children.forEach((shard) => {
        shard.rotation.x += shard.userData.rotSpeedX;
        shard.rotation.y += shard.userData.rotSpeedY;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      geometry.dispose();
      texture.dispose();
      pMaterial.dispose();
      shardGeo.dispose();
      renderer.dispose();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-80"
      aria-hidden="true"
    />
  );
};
