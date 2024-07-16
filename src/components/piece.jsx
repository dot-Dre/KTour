import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import CanvasProps from "../canvasProps";
import gltfFile from "./chessknight.glb";

const Piece = ({ position, onReached }) => {
  const ref = useRef();
  const { nodes, materials } = useGLTF(gltfFile);
  const [currentPos, setCurrentPos] = useState(position);

  useEffect(() => {
    setCurrentPos(position);
  }, [position]);

  useFrame(() => {
    if (ref.current) {
      const targetPosition = {
        x: currentPos[1] * CanvasProps.squareSize + CanvasProps.boardOrigin.x,
        y: 1,
        z: currentPos[0] * CanvasProps.squareSize + CanvasProps.boardOrigin.z,
      };
      ref.current.position.lerp(targetPosition, CanvasProps.animationSpeed);
      const distance = ref.current.position.distanceTo(targetPosition);
      if (distance < 0.1) {
        onReached(currentPos);
      }
    }
  });

  return (
    <mesh
      ref={ref}
      castShadow
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
      geometry={nodes.Cylinder__0.geometry}
      material={materials["Scene_-_Root"]}
    />
  );
};

export default Piece;
