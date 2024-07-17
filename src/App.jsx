import Tour from "./components/tour";
import Typewriter from "typewriter-effect";

const App = () => {
  return (
    <section className="home-sec bg-transparent w-full h-screen flex flex-col justify-between">
      <Tour/>
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
    </section>
  );
}

export default App;