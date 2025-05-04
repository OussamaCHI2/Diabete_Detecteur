

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'


export function Heart(props) {
    const { nodes, materials } = useGLTF('/models/heart.glb')
    return (
      <group {...props} dispose={null}>
        <group rotation={[-0.819, 1.391, -2.092]}>
          <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <group rotation={[Math.PI / 2, 0, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Extract1_Extract1_0_Extract1_0.geometry}
                material={materials.Extract1}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Extract3_1_Extract3_1_0_Extract3_1_0.geometry}
                material={materials.Extract3_1}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={
                  nodes
                    .MM634_BP51951_FMA4706_Coronary_sinus821_MM634_BP51951_FMA4706_Coronary_sinus821_0_MM634_BP51951_FMA4706_Coronary_sinus821_0
                    .geometry
                }
                material={materials.MM634_BP51951_FMA4706_Coronary_sinus821}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.VALVES_VALVES_0_VALVES_0.geometry}
                material={materials.VALVES}
              />
            </group>
          </group>
        </group>
      </group>
    )
  }

useGLTF.preload('/models/heart.glb')
