import { BufferAttribute, BufferGeometry } from 'three';

import { VoxelShape } from './index';

export class VoxelGeometry extends BufferGeometry {
  type = 'VoxelGeometry';

  shape: VoxelShape;

  constructor(shape: VoxelShape) {
    super();

    this.shape = shape;

    const { positions, normals, indices, uvs } = shape.computeData();
    this.setAttribute(
      'position',
      new BufferAttribute(new Float32Array(positions), 3)
    );
    this.setAttribute(
      'normal',
      new BufferAttribute(new Float32Array(normals), 3)
    );
    this.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2));
    this.setIndex(indices);
  }
}
