import React from "react";
import CanvasProps from "../canvasProps";

const Board = () => {
  const rows = 8;
  const cols = 8;

  const squares = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const color = (row + col) % 2 === 0 ? 0xffffff : 0x808080;
      const position = [
        col * CanvasProps.squareSize + CanvasProps.boardOrigin.x,
        0,
        row * CanvasProps.squareSize + CanvasProps.boardOrigin.z,
      ];
      squares.push(
        <mesh key={`${row}-${col}`} position={position}>
          <boxGeometry args={[CanvasProps.squareSize, 1, CanvasProps.squareSize]} />
          <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} />
        </mesh>
      );
    }
  }

  return <>{squares}</>;
};

export default Board;
