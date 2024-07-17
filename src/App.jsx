import * as React from "react";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Typewriter from "typewriter-effect";
import Board from "./components/board";
import KnightTourSolver from "./solver/solver";
import CellOverlay from "./components/cellOverlay";
import Piece from "./components/piece";
import mapBoardPositionTo3D from "./util/helper";

const App = () => {
  const [positions, setPositions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextPosition, setNextPosition] = useState([4, 1]); // Initializing with board coordinates
  const [startingCell, setStartingCell] = useState("");
  const [visitedPositions, setVisitedPositions] = useState([]);
  const [tourCalculated, setTourCalculated] = useState(false);
  const [isSolving, setIsSolving] = useState(false);

  const calculateTour = () => {
    setIsSolving(true);
    const solver = new KnightTourSolver();
    if (startingCell.length !== 2) {
      alert('Please enter a valid starting cell (e.g., "a1")');
      setIsSolving(false);
      return;
    }
    const file = startingCell[0].toLowerCase();
    const rank = startingCell[1];
    if (!"abcdefgh".includes(file) || !"12345678".includes(rank)) {
      alert('Invalid cell. Please use format like "a1", "h8", etc.');
      setIsSolving(false);
      return;
    }
    const [row, col] = solver.positionMapper.getPositionFromCell(file, rank);
    const boardSolution = solver.solve(row, col);
    const moves = solver.getTourMoves(boardSolution);
    const tour = moves.map((move) => {
      const [file, rank] = move.split("");
      return solver.positionMapper.getPositionFromCell(file, rank);
    });
    setPositions(tour);
    setNextPosition(tour[0]); // Setting next position in board coordinates
    setCurrentIndex(0);
    setVisitedPositions([]);
    setTourCalculated(true);
    setIsSolving(false);
  };

  const handleStep = () => {
    if (currentIndex < positions.length - 1) {
      const nextIndex = currentIndex + 1;
      const nextPos = positions[nextIndex];
      console.log("Next Position:", nextPos); // Debugging line
      setCurrentIndex(nextIndex);
      setNextPosition(nextPos); // Setting next position in board coordinates
      setVisitedPositions(prev => [...prev, positions[currentIndex]]);
    } else {
      alert("Tour completed!");
    }
  };

  return (
    <section className="home-sec bg-transparent w-full h-screen flex flex-col justify-between">
      <Canvas
        camera={{ position: [20, 20, 20], fov: 50 }}
        className="flex-grow"
      >
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight castShadow position={[10, 10, 40]} intensity={2} />
        <Board
          visitedPositions={visitedPositions}
          currentIndex={currentIndex}
        />
        <CellOverlay position={mapBoardPositionTo3D(nextPosition)} moveNumber={currentIndex} />
        <Piece position={nextPosition}/>
      </Canvas>
      <div className="absolute top-0 inset-x-0 flex justify-start text-8xl pt-8 pl-6 font-bold text-black bg-transparent">
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
      <div className="absolute bottom-0 inset-x-0 flex justify-start p-6 bg-transparent shadow-lg">
        <input
          type="text"
          placeholder="Enter starting cell"
          className="py-2 px-4 border border-gray-300 rounded-l focus:outline-none"
          value={startingCell}
          onChange={(e) => setStartingCell(e.target.value)}
          // disabled={isSolving || tourCalculated}
        />
        <button
          onClick={calculateTour}
          className="py-2 px-4 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none"
          // disabled={isSolving || tourCalculated}
        >
          {isSolving ? "Calculating..." : "Solve Tour"}
        </button>
        <button
          onClick={handleStep}
          className="py-2 px-4 bg-green-500 text-white rounded-r hover:bg-green-600 focus:outline-none ml-2"
          disabled={!tourCalculated}
        >
          Next Step
        </button>
      </div>
    </section>
  );
};

export default App;
