import React from 'react';
import CellOverlay from './cellOverlay';

const squareSize = 2;
const boardOrigin = { x: -7, z: -7 };

const Board = ({ visitedPositions, currentIndex }) => {
  const rows = 8;
  const cols = 8;
  const squares = [];
  const overlays = [];

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
          <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} />
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
    }
  }

  return (
    <>
      {squares}
      {overlays}
    </>
  );
};

export default Board;