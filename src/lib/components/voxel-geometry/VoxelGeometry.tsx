import * as React from 'react';

import { BufferGeometryProps } from '@react-three/fiber';
import { BufferAttribute, BufferGeometry } from 'three';

import VoxelShape from './models/VoxelShape';

export interface IVoxelGeometryProps extends BufferGeometryProps {
  shape: VoxelShape;
}

export default function VoxelGeometry(props: IVoxelGeometryProps) {
  const { positions, normals, indices, uvs } = props.shape.computeData();
  const geometry = new BufferGeometry();

  geometry.setAttribute(
    'position',
    new BufferAttribute(new Float32Array(positions), 3)
  );
  geometry.setAttribute(
    'normal',
    new BufferAttribute(new Float32Array(normals), 3)
  );
  geometry.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2));
  geometry.setIndex(indices);

  return <bufferGeometry {...geometry} {...props} />;
}
