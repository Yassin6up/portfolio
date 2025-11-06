import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PhoenixBird() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const phoenixRef = useRef<THREE.Group | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, 15);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00ff94, 2);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x00ff94, 1.5);
    pointLight1.position.set(-5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x0b1f3f, 1);
    pointLight2.position.set(5, -5, -5);
    scene.add(pointLight2);

    const loader = new GLTFLoader();
    loader.load(
      "/models/scene.gltf",
      (gltf) => {
        const phoenix = gltf.scene;
        phoenixRef.current = phoenix;

        // Made the model EXTREMELY small
        phoenix.scale.set(0.01, 0.01, 0.01);
        phoenix.position.set(-0.5, 0, 0);
        phoenix.rotation.y = Math.PI / 4;

        phoenix.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.material) {
              const material = mesh.material as THREE.MeshStandardMaterial;
              material.emissiveIntensity = 0.5;
              material.metalness = 0.3;
              material.roughness = 0.6;
            }
          }
        });

        scene.add(phoenix);

        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(phoenix);
          mixerRef.current = mixer;
          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            // Slow down the animation playback
            action.setEffectiveTimeScale(0.5); // 50% slower
            action.play();
          });
        }

        setupScrollAnimation();
      },
      undefined,
      (error) => {
        console.error("Error loading phoenix model:", error);
      },
    );

    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      if (phoenixRef.current) {
        // Slower continuous rotation
        phoenixRef.current.rotation.y += 0.001; // Reduced from 0.003 to 0.001
        // Slower floating movement
        phoenixRef.current.position.y += Math.sin(Date.now() * 0.0005) * 0.001; // Reduced frequency and amplitude
      }

      renderer.render(scene, camera);
    }

    animate();

    function setupScrollAnimation() {
      if (!phoenixRef.current || !sceneRef.current) return;

      const sections = document.querySelectorAll("section");
      const totalSections = sections.length;

      if (totalSections === 0) return;

      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const progress = self.progress;

          if (phoenixRef.current) {
            const yPos =
              (progress * window.innerHeight * (totalSections - 1)) / 100;
            // Slower scroll-based movements
            const targetY = Math.sin(progress * Math.PI * 2) * 0.2; // Reduced frequency
            const targetX = Math.cos(progress * Math.PI) * 0.3 - 0.5; // Reduced frequency
            const targetZ = Math.sin(progress * Math.PI * 1.5) * 0.1; // Reduced frequency

            gsap.to(phoenixRef.current.position, {
              x: targetX,
              y: targetY,
              z: targetZ,
              duration: 1, // Increased from 0.5 to 1 second for smoother transitions
              ease: "power2.out",
            });

            // Slower rotation during scroll
            const rotationY = progress * Math.PI * 3 + Math.PI / 4; // Reduced from 6 to 3
            gsap.to(phoenixRef.current.rotation, {
              y: rotationY,
              duration: 1, // Increased from 0.5 to 1 second
              ease: "power2.out",
            });

            // Slower scale variation
            const scale = 0.008 + Math.sin(progress * Math.PI * 4) * 0.002; // Reduced frequency
            gsap.to(phoenixRef.current.scale, {
              x: scale,
              y: scale,
              z: scale,
              duration: 0.6, // Increased from 0.3 to 0.6 seconds
            });
          }
        },
      });

      sections.forEach((section, index) => {
        if (!section) return;

        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            if (phoenixRef.current && pointLight1) {
              gsap.to(pointLight1, {
                intensity: 2.5,
                duration: 1, // Slower light transition
                ease: "power2.out",
              });
            }
          },
          onLeave: () => {
            if (phoenixRef.current && pointLight1) {
              gsap.to(pointLight1, {
                intensity: 1.5,
                duration: 1, // Slower light transition
                ease: "power2.out",
              });
            }
          },
        });
      });
    }

    function handleResize() {
      if (!cameraRef.current || !rendererRef.current) return;

      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-30"
      style={{ mixBlendMode: "screen" }}
    />
  );
}