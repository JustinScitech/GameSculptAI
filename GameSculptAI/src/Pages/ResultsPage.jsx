import { useState, useEffect } from "react";
import "./App.css";
import { motion } from "framer-motion";
import AnimatedText from "../Components/AnimatedText.jsx";
import { Link } from 'react-router-dom';
import axios from 'axios';

function ResultsPage() {
  const container = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", damping: 10, stiffness: 120 },
    },
  };

  

  const [imageSrc, setImageSrc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState({'name': '', 'backstory': '', 'story': ''});

  useEffect(() => {
    setIsLoading(true); // Set loading to true when the data fetch begins
    const fetchPrompt = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3001/post');
        setInfo(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Set loading to false when the data fetch is complete
      }
    };
    fetchPrompt();
  }, []);


  const [backStory, setBackStory] = useState("Backstory");

  if (isLoading) {
    return (
      <div>Loading...</div> 
    );
  }

  
  
  return (
      
    <>
      <main className="flex flex-col items-center gap-5 justify-center p-24">
        <div className="relative flex place-items-center flex-row z-[-1] before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          <h1 className="mb-3 text-4xl font-bold">
            <AnimatedText
              sentence="See Your Results"
              styling="bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent"
            />
          </h1>
        </div>
        <div className="mb-1 flex flex-col items-center">
        <AnimatedText
              sentence="Backstory"
              styling="text-3xl text-white font-thin"
            />
          <AnimatedText
            sentence={info.backstory || "Loading backstory..."}
            styling="text-1xl text-white font-thin"
          />
          
        </div>

          <div className="mb-3 flex flex-col items-center">
          <AnimatedText
              sentence="Main Story"
              styling="text-3xl text-white font-thin"
            />
          <AnimatedText
            sentence={info.story || "Loading story..."}
            styling="text-1xl text-white font-thin"
          />
          
          </div>
            <div className="mb-3">
            <div className="mb-3">
          {imageSrc && (
            <img src={imageSrc} alt="Generated character" />
          )}
        </div>
            </div>
            <motion.div
  className="flex button-container"
  variants={container}
  initial="hidden"
  animate="visible"
>
          <Link to="/create">
        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
  Download Package
        </button>
        </Link>
        </motion.div>
        <motion.div
            className="flex"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <Link to="/">
            <button
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Return home{" "}
                <span className="inline-block transition-transform group-hover:translate-x-2 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Go back home 
              </p>
            </button>
            </Link>
          </motion.div>
      </main>
    </>
  );
}

export default ResultsPage;
