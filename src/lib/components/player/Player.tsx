import * as React from 'react';

import { MeshProps, useFrame, useThree } from '@react-three/fiber';

import { ObjectType } from '@/lib/types';

export interface IPlayerProps extends MeshProps {}

export function Player(props: IPlayerProps) {
  return (
    <mesh type={ObjectType.PLAYER} {...props}>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}
