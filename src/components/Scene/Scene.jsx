import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Syncora deep-field scene.
 *
 * A real Blue Marble day map (NASA imagery, public domain) wraps a sphere and
 * is re-lit in the shader so the terminator, lime atmosphere and graticule all
 * belong to the brand instead of looking like a stock planet. The ring is drawn
 * on one additive plane large enough to run past every edge of the viewport.
 *
 * One draw call per layer, no post-processing, no model files.
 */

const LIME = '#d7ff45';
const EARTH_MAP = `${import.meta.env.BASE_URL}textures/earth-day.webp`;

const EARTH_VERTEX = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  varying vec3 vPosL;

  void main() {
    vUv = uv;
    vPosL = position;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vPosW = world.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const EARTH_FRAGMENT = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec3 uLightDir;
  uniform vec3 uRim;

  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  varying vec3 vPosL;

  void main() {
    vec3 normal = normalize(vNormalW);
    vec3 viewDir = normalize(cameraPosition - vPosW);
    vec3 lightDir = normalize(uLightDir);

    vec3 map = texture2D(uMap, vUv).rgb;
    map = pow(map, vec3(1.16)) * vec3(0.88, 0.91, 0.94);

    float diffuse = smoothstep(-0.16, 0.95, dot(normal, lightDir));
    vec3 sunlight = mix(vec3(1.0), vec3(1.08, 1.02, 0.92), diffuse);
    vec3 color = map * sunlight * (0.24 + 1.12 * diffuse);

    // Specular only where the map is water.
    vec3 halfDir = normalize(lightDir + viewDir);
    float ocean = smoothstep(0.03, 0.22, map.b - map.r);
    float specular = pow(max(dot(normal, halfDir), 0.0), 72.0);
    color += vec3(0.72, 0.84, 0.80) * specular * ocean * 0.35;

    // Fine graticule, visible only where the surface catches light.
    vec3 local = normalize(vPosL);
    float lat = asin(clamp(local.y, -1.0, 1.0));
    float lon = atan(local.z, local.x);
    float grid =
      pow(max(sin(lat * 18.0), 0.0), 120.0) +
      pow(max(sin(lon * 18.0), 0.0), 140.0);
    color += uRim * clamp(grid, 0.0, 1.0) * (0.02 + 0.03 * diffuse);

    float rim = pow(1.0 - clamp(dot(normal, viewDir), 0.0, 1.0), 3.4);
    color += uRim * rim * (0.25 + 0.5 * diffuse) * 0.85;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const GLOW_VERTEX = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vPosW;

  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vPosW = world.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const GLOW_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uStrength;

  varying vec3 vNormalW;
  varying vec3 vPosW;

  void main() {
    vec3 normal = normalize(vNormalW);
    vec3 viewDir = normalize(cameraPosition - vPosW);
    float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 3.0);
    gl_FragColor = vec4(uColor, fresnel * uStrength);
  }
`;

const RING_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const RING_FRAGMENT = /* glsl */ `
  uniform float uTime;

  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.55;
    for (int i = 0; i < 4; i++) {
      value += amplitude * vnoise(p);
      p *= 2.1;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 point = (vUv - 0.5) * 2.0;
    float radius = length(point);
    float angle = atan(point.y, point.x);

    // Bands live in normalised radius, so they scale with the plane.
    float dust = fbm(vec2(cos(angle) * 3.0 + radius * 4.2, sin(angle) * 3.0) + uTime * 0.02);

    float inner = smoothstep(0.086, 0.089, radius) * (1.0 - smoothstep(0.096, 0.099, radius));
    float bandA = smoothstep(0.104, 0.107, radius) * (1.0 - smoothstep(0.117, 0.120, radius));
    float bandB = smoothstep(0.126, 0.129, radius) * (1.0 - smoothstep(0.147, 0.151, radius));
    float bandC = smoothstep(0.159, 0.162, radius) * (1.0 - smoothstep(0.174, 0.178, radius));
    float gas = smoothstep(0.185, 0.200, radius) * (1.0 - smoothstep(0.300, 0.380, radius));

    float texture = 0.76 + 0.24 * sin(radius * 900.0 + dust * 9.0);

    float density = inner * 0.5
      + bandA * 0.66
      + bandB * 0.5
      + bandC * 0.28
      + gas * 0.035;

    density *= texture * (0.80 + 0.20 * dust);
    density *= 0.85 + 0.15 * sin(angle * 2.0 + uTime * 0.1);
    density *= 1.0 - smoothstep(0.32, 0.44, radius);

    vec3 color = mix(vec3(0.72, 0.73, 0.69), vec3(0.843, 1.0, 0.27), 0.02 + 0.13 * dust);
    gl_FragColor = vec4(color, density * 0.42);
  }
`;

function usePointer() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  return pointer;
}

function Earth({ compact }) {
  const earthRef = useRef();
  const glowRef = useRef();
  const map = useLoader(THREE.TextureLoader, EARTH_MAP);

  const uniforms = useMemo(
    () => ({
      uMap: { value: map },
      uLightDir: { value: new THREE.Vector3(0.55, 0.45, 0.85).normalize() },
      uRim: { value: new THREE.Color(LIME) },
    }),
    [map],
  );

  const glowUniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(LIME) },
      uStrength: { value: 0.5 },
    }),
    [],
  );

  const segments = compact ? 64 : 112;

  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.028;
      if (glowRef.current) glowRef.current.rotation.y = earthRef.current.rotation.y;
    }
  });

  return (
    <group>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, segments, segments]} />
        <shaderMaterial
          vertexShader={EARTH_VERTEX}
          fragmentShader={EARTH_FRAGMENT}
          uniforms={uniforms}
        />
      </mesh>

      <mesh ref={glowRef}>
        <sphereGeometry args={[1.09, 48, 48]} />
        <shaderMaterial
          vertexShader={GLOW_VERTEX}
          fragmentShader={GLOW_FRAGMENT}
          uniforms={glowUniforms}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function Rings() {
  const ringRef = useRef();
  const ringMaterial = useRef();
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((state, delta) => {
    if (ringMaterial.current) ringMaterial.current.uniforms.uTime.value = state.clock.elapsedTime;
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.006;
  });

  return (
    <group rotation={[-1.16, 0.06, 0.26]}>
      <mesh ref={ringRef}>
        <planeGeometry args={[30, 30]} />
        <shaderMaterial
          ref={ringMaterial}
          vertexShader={RING_VERTEX}
          fragmentShader={RING_FRAGMENT}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function Starfield({ count = 700 }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    let seed = 9271;

    const random = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    for (let i = 0; i < count; i += 1) {
      const radius = 18 + random() * 26;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);

      array[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      array[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      array[i * 3 + 2] = radius * Math.cos(phi);
    }

    return array;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.0025;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={1.35}
        sizeAttenuation={false}
        color="#cfd6c6"
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Scene({ compact = false, still = false }) {
  const groupRef = useRef();
  const pointer = usePointer();
  const { size } = useThree();

  const anchor = useMemo(() => {
    const aspect = size.width / Math.max(size.height, 1);

    if (aspect < 0.82) return { x: 0, y: -1.75, scale: 0.7 }; // phones: below the copy
    if (aspect < 1.25) return { x: 0.55, y: -0.48, scale: 0.82 }; // tablets
    if (aspect < 1.55) return { x: 1.18, y: 0.02, scale: 0.88 }; // small laptops
    return { x: 1.24, y: 0.04, scale: 1 }; // desktop
  }, [size.width, size.height]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const scroll = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 2.4);
    const damping = Math.min(1, delta * 2.4);

    // --- Cursor interaction for rotation ---
    const pointerX = pointer.current.x;
    const pointerY = pointer.current.y;
    // Map pointer X to rotation around Z axis, and pointer Y to rotation around X axis
    // Adjust multipliers for sensitivity
    const rotationX = anchor.y + pointerY * 0.3;
    const rotationY = anchor.x + pointerX * 0.3;

    const targetX = still ? anchor.x : rotationY;
    const targetY = still ? anchor.y : rotationX - scroll * 0.75;

    groupRef.current.position.x += (targetX - groupRef.current.position.x) * damping;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * damping;

    const targetScale = anchor.scale * (1 - Math.min(scroll, 2.4) * 0.045);
    groupRef.current.scale.x += (targetScale - groupRef.current.scale.x) * damping;
    groupRef.current.scale.y = groupRef.current.scale.x;
    groupRef.current.scale.z = groupRef.current.scale.x;

    if (!still) {
      // Subtle self-rotation when not directly manipulated by cursor
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.02;
    }
  });

  return (
    <>
      <Starfield count={compact ? 380 : 760} />

      <group ref={groupRef} position={[anchor.x, anchor.y, 0]}>
        <Earth compact={compact} />
        <Rings />
      </group>
    </>
  );
}
