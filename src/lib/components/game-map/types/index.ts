import { Vector2Tuple } from 'three';

import { Direction } from '@/lib/types';

export interface GameMapConfig {
  width: number;
  height: number;
  topology: GameMapTopology;
  blocks: GameMapBlock[];
}

export type GameMapTopology =
  | 'plane'
  | 'horizontal-circle'
  | 'vertical-circle'
  | 'torus';

export enum GameMapLayerType {
  FLOOR,
  WALLS,
  FLOOR_ITEMS,
  CHARACTERS,
  CEIL_ITEMS,
}

export interface GameMapBlock {
  layerType: GameMapLayerType;
  position: Vector2Tuple;
  colliders: Direction[];
}
