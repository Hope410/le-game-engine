import ReactDOM from "react-dom";
import React from "react";
import { Canvas, MeshProps } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import _ from "lodash";
import VoxelShape from "./lib/components/voxel-geometry/models/VoxelShape";
import { VoxelGeometry } from "./lib/components/voxel-geometry/VoxelGeometry";
import { Vector3 } from "three";

function Map(props: MeshProps) {
  const width = 64;
  const height = 32;
  const length = 64;

  const shape = new VoxelShape({
    width,
    height,
    length,
  });


  for (let x = 0; x < width; ++x) {
    for (let y = 0; y < height; ++y) {
      for (let z = 0; z < length; ++z) {
        const maxY =
          (Math.sin((x / width) * Math.PI * 2) +
            Math.sin((z / length) * Math.PI * 3)) *
            (width / 6) +
          height / 2;

        if (y < maxY) {
          shape.setVoxel(new Vector3(x, y, z), 1);
        }
      }
    }
  }

  return (
    <mesh {...props}>
      <VoxelGeometry shape={shape} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}

const CAMERA_VIEW_FIELD_SCALE = 8;

function App() {
  return (
    <Canvas>
      <OrthographicCamera
        makeDefault
        position={[0, 0, 64]}
        zoom={40}
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
