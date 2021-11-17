import React, { Suspense } from 'react';

import { OrthographicCamera as OrthCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { CameraControls, GameMap, Player } from '@/lib/components';

import { Loader } from '../loader/Loader';

export function App() {
  return (
    <Canvas>
      <Suspense fallback={<Loader />}>
        <OrthCamera
          makeDefault
          position={[64, 64, 64]}
          zoom={40}
          near={0.1}
          far={3000}
        />
        <CameraControls />
        <ambientLight />
        <pointLight position={[0, 1, 1]} />
        <Player />
      </Suspense>
    </Canvas>
  );
}
