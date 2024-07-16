import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Typewriter from "typewriter-effect";
import Board from "./components/board";

const App = () => {
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
        <directionalLight position={[10, 10, 40]} intensity={10} />
        <Board />
      </Canvas>
      <div className="absolute bottom-0 inset-x-0 flex justify-start p-6 bg-transparent shadow-lg">
        <input
          type="text"
          placeholder="Enter starting cell"
          className="py-2 px-4 border border-gray-300 rounded-l focus:outline-none"
        />
        <button className="py-2 px-4 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none">
          Solve
        </button>
      </div>
    </section>
  );
};

export default App;
