import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import { Canvas, MeshProps } from "@react-three/fiber";
import {
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei";
import _ from "lodash";
import VoxelShape from "./lib/components/voxel-geometry/models/VoxelShape";
import { VoxelGeometry } from "./lib/components/voxel-geometry/VoxelGeometry";
import { DoubleSide, NearestFilter, Texture, TextureLoader, Vector3 } from "three";

const loader = new TextureLoader();

function Map(props: MeshProps) {
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
      tileTextureHeight
    });

    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        for (let y = 0; y < size; y++) {
          if (y < Math.floor((x + z) / 2)) {
            newShape.setVoxel(new Vector3(x, y, z), _.random(1, 17));
          }
        }
      }
    }

    setShape(newShape);
  }

  useEffect(() => {
    const tex = loader.load('https://threejsfundamentals.org/threejs/resources/images/minecraft/flourish-cc-by-nc-sa.png');
    
    tex.magFilter = NearestFilter;
    tex.minFilter = NearestFilter;

    setTexture(tex);
  }, [])

  useEffect(() => {
    buildVoxelShape();
  }, [texture])

  return _.isNil(shape) || _.isNil(texture) ? null : (
    <mesh {...props}>
      <VoxelGeometry shape={shape} />
      <meshStandardMaterial map={texture} side={DoubleSide} />
    </mesh>
  );
}

const CAMERA_VIEW_FIELD_SCALE = 8;

function App() {
  return (
    <Canvas>
      <PerspectiveCamera
        makeDefault
        position={[64, 64, 64]}
        near={0.1}
        far={3000}
      />
      <OrbitControls />
      <ambientLight />
      <pointLight position={[0, 1, 1]} />

      <Map />
    </Canvas>
  );
}

function main() {
  ReactDOM.render(<App />, document.getElementById("app"));
}

export default main;
