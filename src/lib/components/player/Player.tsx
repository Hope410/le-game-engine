import * as React from 'react';

import { MeshProps, useFrame, useThree } from '@react-three/fiber';

export interface IPlayerProps extends MeshProps {}

export function Player(props: IPlayerProps) {
  const scene = useThree((ctx) => ctx.scene);
  console.log(scene);
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}
