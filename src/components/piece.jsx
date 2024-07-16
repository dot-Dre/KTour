import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import CanvasProps from "../canvasProps";

const Piece = ({ position, onReached }) => {
    const ref = useRef();
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
      <mesh ref={ref} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={0xff0000} metalness={0.5} roughness={0.5} />
      </mesh>
    );
  };
  
  export default Piece;