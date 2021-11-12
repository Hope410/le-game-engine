import _ from 'lodash';
import React, { useEffect, useState } from 'react';

import { MeshProps } from '@react-three/fiber';
import {
  DoubleSide,
  Mesh,
  NearestFilter,
  Texture,
  TextureLoader,
  Vector3,
} from 'three';

import VoxelShape from '@/lib/components/voxel-geometry/models/VoxelShape';
import VoxelGeometry from '@/lib/components/voxel-geometry/VoxelGeometry';

import texturePack from '@/assets/texture-pack.png';

const loader = new TextureLoader();

const GameMap = React.forwardRef<Mesh>((props: MeshProps, ref) => {
  const [texture, setTexture] = useState<Texture>();
  const [shape, setShape] = useState<VoxelShape>();

  const buildVoxelShape = () => {
    const size = 64;
    const tileSize = 16;
    const tileTextureWidth = 256;
    const tileTextureHeight = 64;

    const newShape = new VoxelShape({
      size,
      tileSize,
      tileTextureWidth,
      tileTextureHeight,
    });

    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        for (let y = 0; y < size; y++) {
          if (y < Math.floor((x + z) / 2)) {
            newShape.setVoxel(new Vector3(x, y, z), 16);
          }
        }
      }
    }

    setShape(newShape);
  };

  useEffect(() => {
    const tex = loader.load(texturePack);

    tex.magFilter = NearestFilter;
    tex.minFilter = NearestFilter;

    setTexture(tex);
  }, []);

  useEffect(buildVoxelShape, [texture]);

  return _.isNil(shape) || _.isNil(texture) ? null : (
    <mesh ref={ref} {...props}>
      <VoxelGeometry shape={shape} />
      <meshStandardMaterial map={texture} side={DoubleSide} />
    </mesh>
  );
});

export default GameMap;
