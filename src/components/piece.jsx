import React from "react";
import { useSpring, animated } from "@react-spring/three";
import mapBoardPositionTo3D from "../util/helper";

const Piece = ({ position }) => {
  const mappedPosition = mapBoardPositionTo3D(position);
  const { position: animatedPosition } = useSpring({
    to: { position: mappedPosition },
    config: { mass: 1, tension: 180, friction: 12 }
  });

  return (
    <animated.mesh position={animatedPosition}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="gold" />
    </animated.mesh>
  );
};

export default Piece;