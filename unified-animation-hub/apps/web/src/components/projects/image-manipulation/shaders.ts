import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

export const DistortionMaterial = shaderMaterial(
    {
        uTime: 0,
        uTimeline: 0,
        uImage1: new THREE.Texture(),
    },
    // vertex shader
    `
    #define PI 3.141592653589793
    uniform float uTime;
    uniform float uTimeline;
    varying vec2 vUv;

    void main() {
        vec3 newPosition = position;
        newPosition.z += sin(((uTimeline+uv.y+1.0))*PI)*10.;
        newPosition.z += sin(((uTimeline-uv.x+0.0))*PI)*10.;
        
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);
        vUv = uv;
    }
  `,
    // fragment shader
    `
    #define PI 3.141592653589793
    uniform float uTime;
    uniform sampler2D uImage1;
    varying vec2 vUv;

    void main() {
        vec2 uv = vUv;
        gl_FragColor = texture2D(uImage1, uv);
    }
  `
);

extend({ DistortionMaterial });
