import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vs = `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}`
const fs = `
precision mediump float;uniform float uTime;uniform vec2 uRes;varying vec2 vUv;
vec3 m(vec3 x){return x-floor(x*(1./289.))*289.;}
vec3 p(vec3 x){return m(((x*34.)+1.)*x);}
float sn(vec2 v){
  vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
  vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=m(i);vec3 px=p(p(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
  vec3 x=2.*fract(px*C.www)-1.;vec3 h=abs(x)-.5;vec3 ox=floor(x+.5);vec3 a0=x-ox;
  x=130.*dot(pow(a0,vec3(2.))+pow(h,vec3(2.)),vec3(1.79284291400159-.85373472095314*(a0*a0+h*h)));
  return 130.*dot(x,vec3(1.));
}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*sn(p);p*=2.;a*=.5;}return v;}
void main(){
  vec2 uv=vUv;float t=uTime*.05;
  vec3 bg=vec3(.059,.09,.164);
  float l1=0.,l2=0.;
  for(float i=0.;i<4.;i++){float fi=i+1.;vec2 p=uv*fi*3.;
    p+=vec2(t*fi*.3,t*fi*.2);float n1=fbm(p+vec2(fi*10.)),n2=fbm(p*.8+vec2(fi*20.,t));
    l1+=smoothstep(.02,0.,abs(n1))*(1./fi);l2+=smoothstep(.025,0.,abs(n2*.7))*(1./fi);}
  vec3 cc=vec3(.133,.827,.933)*l1*.3,sc=vec3(.22,.745,.973)*l2*.2;
  float glw=1.-length(uv-.5)*1.2;glw=max(glw,0.);glw=glw*glw*.08;
  vec3 gc=vec3(.22,.745,.973)*glw;
  vec3 col=bg+cc+sc+gc;
  float vig=1.-length(uv-.5)*.8;vig=smoothstep(0.,1.,vig);col*=vig;
  gl_FragColor=vec4(col,1.);
}`

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  }), [])
  useFrame((state) => { if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.elapsedTime })
  return (
    <mesh ref={meshRef}><planeGeometry args={[2, 2]} />
      <shaderMaterial ref={matRef} vertexShader={vs} fragmentShader={fs} uniforms={uniforms} />
    </mesh>
  )
}

export function NeuralFlowShader() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 1] }} gl={{ antialias: false, alpha: false }} dpr={[1, 1.5]}>
        <ShaderPlane />
      </Canvas>
    </div>
  )
}