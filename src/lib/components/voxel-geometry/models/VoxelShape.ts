import { MathUtils, Vector3 } from 'three';

import { VOXEL_FACES } from '../const';

export class VoxelShape {
  public size: number;

  public tileSize: number;

  public tileTextureWidth: number;

  public tileTextureHeight: number;

  private shape: Uint8Array;

  constructor(options: {
    size: number;
    tileSize: number;
    tileTextureWidth: number;
    tileTextureHeight: number;
  }) {
    this.size = options.size;
    this.tileSize = options.tileSize;
    this.tileTextureWidth = options.tileTextureWidth;
    this.tileTextureHeight = options.tileTextureHeight;
    this.shape = new Uint8Array(this.size ** 3);
  }

  private computeVoxelOffset({ x, y, z }: Vector3) {
    const { size } = this;
    const voxelX = MathUtils.euclideanModulo(x, size) | 0;
    const voxelY = MathUtils.euclideanModulo(y, size) | 0;
    const voxelZ = MathUtils.euclideanModulo(z, size) | 0;

    return voxelY * size ** 2 + voxelZ * size + voxelX;
  }

  setVoxel(vector: Vector3, value: number) {
    const voxelOffset = this.computeVoxelOffset(vector);
    this.shape[voxelOffset] = value;
  }

  getVoxel(vector: Vector3): number | undefined {
    const voxelOffset = this.computeVoxelOffset(vector);
    return this.shape[voxelOffset];
  }

  computeData() {
    const { size, tileSize, tileTextureWidth, tileTextureHeight } = this;
    const positions: number[] = [];
    const normals: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        for (let z = 0; z < size; z++) {
          const voxel = this.getVoxel(new Vector3(x, y, z));

          if (!voxel) continue;

          const uvCell = voxel - 1;

          VOXEL_FACES.forEach(({ dir, corners, uvRow }) => {
            const neighbor = this.getVoxel(
              new Vector3(x + dir[0], y + dir[1], z + dir[2])
            );

            if (neighbor) return;

            const ndx = positions.length / 3; // position index

            for (const { pos, uv } of corners) {
              positions.push(pos[0] + x, pos[1] + y, pos[2] + z);
              normals.push(...dir);
              uvs.push(
                ((uvCell + uv[0]) * tileSize) / tileTextureWidth,
                1 - ((uvRow + 1 - uv[1]) * tileSize) / tileTextureHeight
              );
            }

            indices.push(ndx, ndx + 1, ndx + 2, ndx + 2, ndx + 1, ndx + 3);
          });
        }
      }
    }

    return {
      positions,
      normals,
      indices,
      uvs,
    };
  }
}
