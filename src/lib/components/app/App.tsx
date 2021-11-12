import React from 'react';

import { OrthographicCamera as OrthCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import GameMap from '@/lib/components/game-map/GameMap';

function App() {
  return (
    <Canvas>
      <OrthCamera
        makeDefault
        position={[64, 64, 64]}
        zoom={40}
        near={0.1}
        far={3000}
      />
      <ambientLight />
      <pointLight position={[0, 1, 1]} />
      <GameMap />
    </Canvas>
  );
}

export default App;
