export const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const fragmentShader = `
// Ashima simplex noise 2D
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}


uniform float uTime;
uniform vec3 uColor;
uniform vec2 uResolution;
uniform float uOpacity;
uniform float uLineOpacity;
uniform float uScale;
uniform float uLineThickness;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  // Correct aspect ratio based on the plane dimensions
  float aspect = uResolution.x / uResolution.y;
  vec2 noiseUv = uv;
  noiseUv.x *= aspect;

  // Circle mask (aspect-corrected to stay perfectly round)
  vec2 centeredUv = uv - 0.5;
  centeredUv.x *= aspect;
  float dist = length(centeredUv);
  float radius = 0.6;
  float mask = 1.0 - smoothstep(radius - 0.01, radius + 0.01, dist);

  // Noise Generation
  float n = snoise(noiseUv * uScale + uTime * 0.05);

  // Isolines
  float lines = fract(n * 5.0);
  float pattern = smoothstep(0.5 - uLineThickness, 0.5, lines) - smoothstep(0.5, 0.5 + uLineThickness, lines);

  // Opacity
  float opacity = uLineOpacity;

  // Grain
  float grain = (fract(sin(dot(vUv, vec2(12.9898, 78.233) * 2.0)) * 43758.5453) - 0.5) * 0.15;

  vec3 finalColor = uColor + grain;

  gl_FragColor = vec4(finalColor, pattern * opacity * mask * uOpacity);
}
`;
