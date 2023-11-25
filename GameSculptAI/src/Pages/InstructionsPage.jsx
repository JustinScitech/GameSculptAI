import { useState, useEffect } from "react";
import "./App.css";
import { motion } from "framer-motion";
import AnimatedText from "../Components/AnimatedText.jsx";
import { Link } from 'react-router-dom';

function InstructionsPage() {
  const container = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", damping: 10, stiffness: 120 },
    },
  };

  return (
    <>
      <main className="flex flex-col items-center gap-10 justify-center p-24">
        <div className="relative flex place-items-center flex-row z-[-1] before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          <h1 className="mb-3 text-4xl font-bold">
            <AnimatedText
              sentence="Getting Started"
              styling="bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent"
            />
          </h1>
        </div>
        
        <div class="mb-6">
        <container className="flex flex-col gap-y-8">
        <div 
        className="block text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none overflow-hidden"
        
      >

        
        <h1 className = "mb-3 text-4xl font-thin">
          Welcome to GameSculptAI! This is a tool that allows you to create a game package based on a prompt you provide.
        </h1>
        </div>
        
        <div 
        className="flex-row block text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none overflow-hidden"
        
      >

  
        
        <h1 className = "mb-3 text-4xl font-thin">
          To get started, go to the Creation page <span> </span>
          <Link to="/create">

     here.

        </Link>

        <span></span> 
        </h1>
        </div>
        <div 
        className="flex-row block text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none overflow-hidden"
        
      >
        <h1 className = "mb-3 text-4xl font-thin">
        After entering the creation page, enter the prompts you want to use to generate your game package and simply wait for the magic to happen!
        You can download your results on the Results page <span> </span> 
        <Link to="/results">
          here.
        </Link>
        </h1>
        
        </div>
        
        </container>
</div>

        <motion.div
          className="flex"
          variants={container}
          initial="hidden"
          animate="visible"
        >
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

export default InstructionsPage;
