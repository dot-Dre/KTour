import React from 'react';
import { Text } from '@react-three/drei';
import CellOverlay from './cellOverlay';

const squareSize = 2;
const boardOrigin = { x: -7, z: -7 };

const Board = ({ visitedPositions, currentIndex }) => {
  const rows = 8;
  const cols = 8;
  const squares = [];
  const overlays = [];
  const labels = [];

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  files.reverse();
  ranks.reverse();

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const color = (row + col) % 2 === 0 ? 0xffffff : 0x808080;
      const position = [
        col * squareSize + boardOrigin.x,
        0,
        row * squareSize + boardOrigin.z,
      ];
      squares.push(
        <mesh key={`${row}-${col}`} position={position}>
          <boxGeometry args={[squareSize, 1, squareSize]} />
          {/* <meshStandardMaterial color={color} metalness={0.0} roughness={1} />
           */}
           {/* <meshPhongMaterial color={color}/> */}
           <meshToonMaterial color={color}/>
        </mesh>
      );

      const moveIndex = visitedPositions.findIndex(
        pos => pos[0] === row && pos[1] === col
      );
      if (moveIndex !== -1 && moveIndex < currentIndex) {
        overlays.push(
          <CellOverlay
            key={`overlay-${row}-${col}`}
            position={position}
            moveNumber={moveIndex + 1}
          />
        );
      }

      if (row === 7) {
        labels.push(
          <Text
            key={`file-${col}`}
            position={[position[0], 0, position[2] + squareSize / 2 + 0.5]}
            rotation={[-Math.PI / 2, 0, 0]}
            color="black"
            fontWeight={1}
            fontSize={0.8}
            anchorX="center"
            anchorY="middle"
          >
            {files[col]}
          </Text>
        );
      }

      if (col === 0) {
        labels.push(
          <Text
            key={`rank-${row}`}
            position={[position[0] - squareSize / 2 - 0.5, 0, position[2]]}
            rotation={[-Math.PI / 2, 0, 0]}
            color="black"
            fontWeight={1}
            fontSize={0.8}
            anchorX="center"
            anchorY="middle"
          >
            {ranks[row]}
          </Text>
        );
      }
    }
  }

  return (
    <>
      {squares}
      {overlays}
      {labels}
    </>
  );
};

export default Board;