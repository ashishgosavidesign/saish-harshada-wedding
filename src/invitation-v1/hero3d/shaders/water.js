export const waterVertexShader = /* glsl */ `
uniform float uTime;
uniform float uWaveAmp;

varying vec2 vUv;
varying float vElevation;
varying vec3 vWorldPos;

void main() {
  vUv = uv;
  vec3 pos = position;

  float wave1 = sin(pos.x * 0.35 + uTime * 0.9) * 0.12;
  float wave2 = sin(pos.y * 0.28 - uTime * 0.7) * 0.1;
  float wave3 = sin((pos.x + pos.y) * 0.22 + uTime * 0.5) * 0.06;
  pos.z += (wave1 + wave2 + wave3) * uWaveAmp;

  vElevation = pos.z;
  vec4 world = modelMatrix * vec4(pos, 1.0);
  vWorldPos = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`

export const waterFragmentShader = /* glsl */ `
uniform vec3 uDeepColor;
uniform vec3 uShallowColor;
uniform vec3 uSunDirection;

varying vec2 vUv;
varying float vElevation;
varying vec3 vWorldPos;

void main() {
  vec3 viewDir = normalize(cameraPosition - vWorldPos);
  vec3 normal = normalize(vec3(
    -dFdx(vElevation) * 2.0,
    1.0,
    -dFdy(vElevation) * 2.0
  ));

  float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);
  float spec = pow(max(dot(reflect(-uSunDirection, normal), viewDir), 0.0), 64.0);

  float depthMix = smoothstep(-0.05, 0.25, vElevation + 0.08);
  vec3 waterCol = mix(uDeepColor, uShallowColor, depthMix * 0.35 + fresnel * 0.45);

  vec3 col = waterCol + vec3(spec * 0.55);
  col = mix(col, uShallowColor * 1.15, fresnel * 0.35);

  gl_FragColor = vec4(col, 0.96);
}
`
