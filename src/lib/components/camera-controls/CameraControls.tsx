import * as React from 'react';

import { useThree } from '@react-three/fiber';

interface ICameraControlsProps {}

const CAMERA_TARGET_DISTANSE = 64;
const ROTATE_СLOCKWISE_KEY = 'e';
const ROTATE_ANTI_СLOCKWISE_KEY = 'q';

const MAX_ANGLE = Math.PI * 2;

export const CameraControls = (props: ICameraControlsProps) => {
  const [rotationAngle, setRotationAngle] = React.useState(0);
  const ctx = useThree();

  const cameraRotate = (radAngle: number) => {
    const angle = (radAngle + rotationAngle) % MAX_ANGLE;
    setRotationAngle(angle);

    ctx.camera.position.set(
      Math.sin(angle) * CAMERA_TARGET_DISTANSE,
      ctx.camera.position.y,
      Math.cos(angle) * CAMERA_TARGET_DISTANSE
    );
    ctx.camera.lookAt(0, 0, 0);
  };

  const onKeyup = (ev: KeyboardEvent) => {
    switch (ev.key) {
      case ROTATE_СLOCKWISE_KEY:
        cameraRotate(Math.PI / 4);
        break;
      case ROTATE_ANTI_СLOCKWISE_KEY:
        cameraRotate(-Math.PI / 4);
        break;
    }
  };

  React.useEffect(() => {
    window.addEventListener('keyup', onKeyup);

    return () => window.removeEventListener('keyup', onKeyup);
  }, [rotationAngle]);
  return null;
};
