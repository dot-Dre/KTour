import React from 'react';
import { Text } from '@react-three/drei';
import CanvasProps from '../canvasProps';

const CellOverlay = ({ position, moveNumber }) => {
  return (
    <Text
      position={[position[0], 0.51, position[2]]} 
      rotation={[-Math.PI / 2, 0, 0]} 
      color={CanvasProps.overlayColor}
      fontSize={0.8}
      anchorX="center"
      anchorY="middle"
    >
      {moveNumber}
    </Text>
  );
};

export default CellOverlay;