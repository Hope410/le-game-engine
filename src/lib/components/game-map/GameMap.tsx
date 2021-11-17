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

import { VoxelGeometry, VoxelShape } from '@/lib/components/voxel-geometry';
import { ObjectType } from '@/lib/types';

import texturePack from '@/assets/texture-pack.png';

const loader = new TextureLoader();

export interface IGameMapProps extends MeshProps {
  shape: VoxelShape;
}

export const GameMap = React.forwardRef<Mesh, IGameMapProps>((props, ref) => {
  const [texture, setTexture] = useState<Texture>();

  useEffect(() => {
    const tex = loader.load(texturePack);

    tex.magFilter = NearestFilter;
    tex.minFilter = NearestFilter;

    setTexture(tex);
  }, []);

  return _.isNil(texture) ? null : (
    <mesh type={ObjectType.GAME_MAP} ref={ref} {...props}>
      <VoxelGeometry shape={props.shape} />
      <meshStandardMaterial map={texture} side={DoubleSide} />
    </mesh>
  );
});
