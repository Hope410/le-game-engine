import * as React from 'react';

import { useFrame, useThree } from '@react-three/fiber';
import { EventDispatcher } from 'three';

interface ICameraControlsProps {}

export const CameraControls = (props: ICameraControlsProps) => {
  const state = useThree();

  useFrame((ctx) => {
    ctx.camera.lookAt(0, 0, 0);
  });

  // React.useEffect(() => {
  //   if (!state.controls) {
  //     state.set({
  //       controls: new EventDispatcher(),
  //     });
  //   } else {
  //     state.controls.addEventListener('');
  //   }
  // }, []);
  return null;
};
