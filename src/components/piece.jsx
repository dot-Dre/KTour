import React from "react";
import { useSpring, animated } from "@react-spring/three";
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import mapBoardPositionTo3D from "../util/helper";
import chessknight from "./chessknight.glb"

const Piece = ({ position }) => {
  const mappedPosition = mapBoardPositionTo3D(position);
  const { position: animatedPosition } = useSpring({
    to: { position: mappedPosition },
    config: { mass: 1, tension: 180, friction: 12 }
  });

  const gltf = useLoader(GLTFLoader, chessknight);

  return (
    <animated.mesh position={animatedPosition}>
      <primitive object={gltf.scene} scale={30} />
    </animated.mesh>
  );
};


export default Piece;