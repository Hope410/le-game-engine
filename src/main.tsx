import ReactDOM from 'react-dom'
import React, { useRef, useState } from 'react'
import { Canvas, MeshProps, useFrame } from '@react-three/fiber'

function Box(props: MeshProps) {
  const ref = useRef<THREE.Mesh>()
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  useFrame((state, delta) => ref.current && (ref.current.rotation.x += 0.01))

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function main() {
    ReactDOM.render(
        <Canvas orthographic camera={{ zoom: 100, position: [0, 0, 100] }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1, 0, 0]} />
          <Box position={[1, 0, 0]} />
        </Canvas>,
        document.getElementById('app'),
      )
}

export default main;