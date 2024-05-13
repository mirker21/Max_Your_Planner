/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.12 scenery.gltf -k -keepmeshes 
*/

import React from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import Water from './Water'

export default function Scenery(props) {
  const { nodes } = useGLTF('./models/scenery.gltf')
  const mountainsTexture = useTexture('./models/Office_Buddy_Baked_Resized.png')
  mountainsTexture.flipY = false;
  const mountainsMaterial = new THREE.MeshStandardMaterial({
    map: mountainsTexture,
  })
  
  return (
    <group {...props} dispose={null}>
      <mesh name="Landscape001" castShadow receiveShadow geometry={nodes.Landscape001.geometry} material={mountainsMaterial} userData={{ name: 'Landscape.001' }} />
      <mesh name="Mountains" castShadow receiveShadow geometry={nodes.Mountains.geometry} material={mountainsMaterial} position={[-0.784, -0.044, 0]} userData={{ name: 'Mountains' }} />
      <group name="Log" userData={{ name: 'Log' }}>
        <mesh name="Cylinder" castShadow receiveShadow geometry={nodes.Cylinder.geometry} material={mountainsMaterial} />
        <mesh name="Cylinder_1" castShadow receiveShadow geometry={nodes.Cylinder_1.geometry} material={mountainsMaterial} />
        <mesh name="Cylinder_2" castShadow receiveShadow geometry={nodes.Cylinder_2.geometry} material={mountainsMaterial} />
      </group>
      <Water />
      <mesh name="Landscape002" castShadow receiveShadow geometry={nodes.Landscape002.geometry} material={mountainsMaterial} userData={{ name: 'Landscape.002' }} />
      <mesh name="Landscape003" castShadow receiveShadow geometry={nodes.Landscape003.geometry} material={mountainsMaterial} userData={{ name: 'Landscape.003' }} />
    </group>
  )
}

useGLTF.preload('./models/scenery.gltf')