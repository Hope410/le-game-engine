import { Vector3Tuple, MathUtils, Vector3 } from "three";
import { VOXEL_FACES } from "../const";

export default class VoxelShape {
  public width: number;

  public height: number;

  public length: number;

  private shape: Uint8Array;

  constructor(options: { width: number; height: number; length: number }) {
    this.width = options.width;
    this.height = options.height;
    this.length = options.length;

    this.shape = new Uint8Array(
      options.width * options.height * options.length
    );
  }

  computeVoxelOffset({x, y, z}: Vector3) {
    const { width, height, length } = this;
    const voxelX = MathUtils.euclideanModulo(x, width) || 0;
    const voxelY = MathUtils.euclideanModulo(y, height) || 0;
    const voxelZ = MathUtils.euclideanModulo(z, length) || 0;

    return voxelY * width * height + voxelZ * length + voxelX;
  }

  computeVector(offset: number): Vector3 {
    const { width, height, length } = this;
    const x = Math.floor((offset % (width * height)) % length);
    const y = Math.floor(offset / (width * height));
    const z = Math.floor((offset % (width * height)) / length);

    return new Vector3(x, y, z);
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
    const positions: number[] = [];
    const normals: number[] = [];
    const indices: number[] = [];

    [...this.shape.keys()].forEach((index) => {
      const {x, y, z} = this.computeVector(index);

      const voxel = this.getVoxel(new Vector3(x, y, z));

      if (!voxel) return;

      VOXEL_FACES.forEach(({ dir, corners }) => {
        const neighbor = this.getVoxel(new Vector3(x + dir[0], y + dir[1], z + dir[2]));

        if (neighbor) return;

        const ndx = positions.length / 3; // position index

        for (const pos of corners) {
          positions.push(pos[0] + x, pos[1] + y, pos[2] + z);
          normals.push(...dir);
        }

        indices.push(ndx, ndx + 1, ndx + 2, ndx + 2, ndx + 1, ndx + 3);
      })
    });

    return {
      positions,
      normals,
      indices,
    };
  }
}
