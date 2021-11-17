import { Texture } from 'three';

export interface GameMapLayer {
  name: string;
  blocks: GameMapBlock[];
}

export interface GameMapBlock {
  type: string;
  index: number;
  texture: Texture;
}

export interface TextMapOptions {
  layers: GameMapLayer[];
  symbols: {
    [symbol: string]: GameMapBlock;
  };
}
