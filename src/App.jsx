import Tour from "./components/tour";
import Typewriter from "typewriter-effect";

const App = () => {
  return (
    <section className="home-sec bg-transparent w-full h-screen flex flex-col justify-between">
      <Tour />
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
      <div
        className="absolute top-20 inset-x-0 flex justify-start text-xl pt-20 pl-8 font-bold text-gray-700 bg-transparent"
        style={{ whiteSpace: "pre-wrap" }}
      >
        A 3D Visualization of the{" "}
        <a
          href="https://en.wikipedia.org/wiki/Knight%27s_tour"
          target="_blank"
          className="text-blue-600"
        >
          Knight's Tour
        </a>
        . The solving algorithm uses{" "}
        <a
          href="https://en.wikipedia.org/wiki/Knight%27s_tour#Warnsdorf's_rule"
          target="_blank"
          className="text-blue-600"
        >
          Warnsdorf's heuristic
        </a>
        .
      </div>
    </section>
  );
};

export default App;
