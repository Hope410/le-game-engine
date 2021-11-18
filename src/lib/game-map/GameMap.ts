/**
 *
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
  useEffect(buildVoxelShape, [texture]);
 */

export class GameMap {
  static fromText(textMap: string) {}
}
