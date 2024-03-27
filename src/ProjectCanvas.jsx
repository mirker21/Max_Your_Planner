import { Suspense, useEffect, useRef } from "react";
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, OrbitControls, PerspectiveCamera, Clouds, Cloud } from "@react-three/drei";
import Scenery from "./components/Scenery";
import Maxwell from './components/Maxwell_the_beaver_final'

export default function ProjectCanvas() {
    const logRef = useRef(null)
    const logFocusRef = useRef(null)

    return (
        <Canvas id="three-canvas" linear shadows>
            {/* position={[-5, 1, -20]} rotation={[Math.PI*2, Math.PI, Math.PI*2]} */}
            <PerspectiveCamera makeDefault fov={60} near={.01} far={1000} position={[.9, .02, -.3]} rotation={[.02, -1.9, -.02]} />
            <OrbitControls />
            <ambientLight intensity={3} color="#ffefdd" />
            <directionalLight position={[0, 5, 10]} intensity={3} color="#fbffe0" />
            <Clouds material={THREE.MeshBasicMaterial}>
                <Cloud seed={6} segments={15} bounds={[30, 5, 30]} volume={15} color="white" position={[-.55, .3, 0]} scale={[.03, .03, .03]} opacity={5} />
                <Cloud seed={8} segments={15} bounds={[35, 5, 35]} volume={20} color="white" position={[-.55, .33, 0]} scale={[.04, .04, .04]} opacity={5} />
                {/* <Cloud seed={1} segments={40} bounds={[2, 2, 2]} volume={3} color="white" position={[5, 3, 0]} /> */}
                {/* <Cloud seed={2} segments={40} bounds={[2, 2, 2]} volume={3} color="white" position={[10, 3, 0]} /> */}
            </Clouds>
            <Scenery logRef={logRef} />
            <Suspense fallback={null}>
                <Maxwell scale={[.01, .01, .01]} position={[.78, -.01, -.246]} rotation={[0, -Math.PI/2 + Math.PI, 0]} />
            </Suspense>
            <mesh ref={logFocusRef} position={[-1.61, .21, -.51]}>
                <boxGeometry args={[.05, .05, .05]} />
                <meshBasicMaterial color={0xff0000} />
            </mesh>
            <color args={ [ '#11eeFF' ] } attach="background" />
        </Canvas>
    )
}