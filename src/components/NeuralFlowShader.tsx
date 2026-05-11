import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vs = `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}`

const fs = `
precision mediump float;
uniform float uTime;
varying vec2 vUv;

float hash(vec2 p){
  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);
}

float noise(vec2 p){
  vec2 i=floor(p);
  vec2 f=fract(p);
  f=f*f*(3.0-2.0*f);
  float a=hash(i);
  float b=hash(i+vec2(1.0,0.0));
  float c=hash(i+vec2(0.0,1.0));
  float d=hash(i+vec2(1.0,1.0));
  return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
}

float fbm(vec2 p){
  float v=0.0;
  float a=0.5;
  vec2 shift=vec2(100.0);
  mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.5));
  for(int i=0;i<5;i++){
    v+=a*noise(p);
    p=rot*p*2.0+shift;
    a*=0.5;
  }
  return v;
}

void main(){
  vec2 uv=vUv;
  float t=uTime*0.05;

  vec3 bg=vec3(0.059,0.09,0.164);
  float l1=0.0;
  float l2=0.0;

  for(float i=0.0;i<4.0;i++){
    float fi=i+1.0;
    vec2 p=uv*fi*3.0;
    p+=vec2(t*fi*0.3,t*fi*0.2);
    float n1=fbm(p+vec2(fi*10.0));
    float n2=fbm(p*0.8+vec2(fi*20.0,t));
    l1+=smoothstep(0.02,0.0,abs(n1-0.5))*(1.0/fi);
    l2+=smoothstep(0.025,0.0,abs(n2*0.7-0.5))*(1.0/fi);
  }

  vec3 cc=vec3(0.133,0.827,0.933)*l1*0.3;
  vec3 sc=vec3(0.22,0.745,0.973)*l2*0.2;

  float glw=1.0-length(uv-0.5)*1.2;
  glw=max(glw,0.0);
  glw=glw*glw*0.08;
  vec3 gc=vec3(0.22,0.745,0.973)*glw;

  vec3 col=bg+cc+sc+gc;

  float vig=1.0-length(uv-0.5)*0.8;
  vig=smoothstep(0.0,1.0,vig);
  col*=vig;

  gl_FragColor=vec4(col,1.0);
}
`

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), [])
  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vs}
        fragmentShader={fs}
        uniforms={uniforms}
      />
    </mesh>
  )
}

export function NeuralFlowShader() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        orthographic
        camera={{ zoom: 1, position: [0, 0, 1] }}
        gl={{ antialias: false, alpha: false }}
        dpr={[1, 1.5]}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  )
}
