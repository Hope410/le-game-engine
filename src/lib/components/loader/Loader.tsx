import * as React from 'react';

import { Html, useProgress } from '@react-three/drei';

export interface ILoaderProps {}

export function Loader(props: ILoaderProps) {
  const { progress } = useProgress();

  return <Html center>{progress} % loaded</Html>;
}
