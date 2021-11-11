import { BufferGeometryProps } from '@react-three/fiber';
import * as React from 'react';
import { BufferAttribute, BufferGeometry } from 'three';
import VoxelShape from './models/VoxelShape';

export interface IVoxelGeometryProps extends BufferGeometryProps {
  shape: VoxelShape;
}

export function VoxelGeometry (props: IVoxelGeometryProps) {
  const {positions, normals, indices} = props.shape.computeData();
  const geometry = new BufferGeometry();
  
  geometry.setAttribute(
      'position',
      new BufferAttribute(new Float32Array(positions), 3));
  geometry.setAttribute(
      'normal',
      new BufferAttribute(new Float32Array(normals), 3));
  geometry.setIndex(indices);

  return (
    <bufferGeometry {...geometry} {...props} />
  );
}
