import { MeshWobbleMaterial, useTexture } from "@react-three/drei"
import { easing } from 'maath'
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

// Huge thanks to drcmda for providing an example for mesh distortion https://codesandbox.io/p/sandbox/unity-damping-4hbn17?file=%2Fsrc%2FApp.js

export default function Water() {
    const waterRef = useRef();
    const waterTexture = useTexture('./models/Water.png')

    useFrame((delta) => {
        easing.damp(waterRef.current.material, 'distort', 0.5, 0.25, delta)
        easing.damp(waterRef.current.material, 'speed', 4, 0.25, delta)
    })

    return (
        <mesh ref={waterRef} scale={[0.04, 0.04, 0.04]} position={[0,-.03, 0]} rotation={[-Math.PI/2, 0, 0]}>
            <planeGeometry args={[50, 50, 64, 64]} />
            <MeshWobbleMaterial map={waterTexture} opacity={1} factor={.005} speed={1} toneMapped={false} roughness={0}/>
        </mesh>
    )
}