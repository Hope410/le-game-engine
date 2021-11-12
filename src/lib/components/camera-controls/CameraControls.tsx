import * as React from 'react';

import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

import { ROTATE_CAMERA_LEFT_BUTTON, ROTATE_CAMERA_RIGHT_BUTTON } from './const';

interface ICameraControlsProps {}

const INITIAL_CAMERA_DIRECTION = Object.freeze(new Vector3(0, 0, 0));

const CAMERA_MAX_DISTANCE = 64;
const CAMERA_ROTATION_ANGLE = Math.PI / 4;

export const CameraControls = (props: ICameraControlsProps) => {
  const [cameraAngle, setCameraAngle] = React.useState(0);
  const ctx = useThree();

  const rotateCamera = (value: number) => {
    setCameraAngle((cameraAngle + value) % 360);
  };

  const onKeyUp = (ev: KeyboardEvent) => {
    switch (ev.key) {
      case ROTATE_CAMERA_LEFT_BUTTON:
        rotateCamera(-CAMERA_ROTATION_ANGLE);
        break;
      case ROTATE_CAMERA_RIGHT_BUTTON:
        rotateCamera(CAMERA_ROTATION_ANGLE);
        break;
    }
  };

  React.useEffect(() => {
    const angleSin = Math.sin(cameraAngle);
    const angleCos = Math.cos(cameraAngle);

    ctx.camera.position.set(
      angleSin * CAMERA_MAX_DISTANCE,
      CAMERA_MAX_DISTANCE,
      angleCos * CAMERA_MAX_DISTANCE
    );
    ctx.camera.lookAt(INITIAL_CAMERA_DIRECTION);
  }, [cameraAngle]);

  React.useEffect(() => {
    ctx.camera.lookAt(INITIAL_CAMERA_DIRECTION);

    window.addEventListener('keyup', onKeyUp);

    return () => window.removeEventListener('keyup', onKeyUp);
  }, [cameraAngle]);

  return null;
};
