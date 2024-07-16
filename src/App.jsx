import * as React from "react";
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Typewriter from "typewriter-effect";
import Board from "./components/board";
import Piece from "./components/piece";
import KnightTourSolver from "./solver/solver";

const App = () => {
  const [positions, setPositions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextPosition, setNextPosition] = useState([4, 1]);
  const [startAnimation, setStartAnimation] = useState(false);
  const [startingCell, setStartingCell] = useState('');
  const [visitedPositions, setVisitedPositions] = useState([]);

  const handleSolve = () => {
    const solver = new KnightTourSolver();
    if (startingCell.length !== 2) {
      alert('Please enter a valid starting cell (e.g., "a1")');
      return;
    }

    const file = startingCell[0].toLowerCase();
    const rank = startingCell[1];

    if (!'abcdefgh'.includes(file) || !'12345678'.includes(rank)) {
      alert('Invalid cell. Please use format like "a1", "h8", etc.');
      return;
    }

    const [row, col] = solver.positionMapper.getPositionFromCell(file, rank);
    const boardSolution = solver.solve(row, col);
    const moves = solver.getTourMoves(boardSolution);
    
    const tour = moves.map(move => {
      const [file, rank] = move.split('');
      return solver.positionMapper.getPositionFromCell(file, rank);
    });

    setPositions(tour);
    setNextPosition(tour[0]);
    setCurrentIndex(0);
    setVisitedPositions([]);
  };

  useEffect(() => {
    if (startAnimation && currentIndex < positions.length) {
      setNextPosition(positions[currentIndex]);
    }
  }, [currentIndex, startAnimation, positions]);

  const handleAnimation = () => {
    handleSolve();
    setStartAnimation(true);
    setCurrentIndex(0);
  };

  const handlePositionReached = (newPosition) => {
    setCurrentIndex((prev) => prev + 1);
    setVisitedPositions((prev) => [...prev, newPosition]);
  };

  return (
    <section className="home-sec w-full h-screen flex flex-col justify-between">
      <div className="text-8xl pt-8 pl-6 font-bold text-black">
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("Knight's Tour ♞")
              .changeDelay(10)
              .pauseFor(2500)
              .start();
          }}
        />
      </div>
      <Canvas
        camera={{ position: [20, 20, 20], fov: 50 }}
        className="flex-grow"
      >
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight castShadow position={[10, 10, 40]} intensity={10} />
        <Board visitedPositions={visitedPositions} />
        <Piece position={nextPosition} onReached={handlePositionReached} />
      </Canvas>
      <div className="absolute bottom-0 inset-x-0 flex justify-start p-6 bg-transparent shadow-lg">
        <input
          type="text"
          placeholder="Enter starting cell"
          className="py-2 px-4 border border-gray-300 rounded-l focus:outline-none"
          value={startingCell}
          onChange={(e) => setStartingCell(e.target.value)}
        />
        <button
          onClick={handleAnimation}
          className="py-2 px-4 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none"
        >
          Solve
        </button>
      </div>
    </section>
  );
};

export default App;