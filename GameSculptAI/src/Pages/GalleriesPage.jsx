import { useState } from "react";
import "./App.css";
import { motion } from "framer-motion";
import AnimatedText from "../Components/AnimatedText.jsx";
import { Link } from 'react-router-dom';
import {useEffect} from 'react';
import axios from 'axios';
function GalleriesPage() {
  const container = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", damping: 10, stiffness: 120 },
    },
  };

  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState([{'_id':'', 'name': '', 'backstory': '', 'story': ''}, {'_id':'', 'name': '', 'backstory': '', 'story': ''}, {'_id':'', 'name': '', 'backstory': '', 'story': ''}]);

  useEffect(() => {
    setIsLoading(true); 
    const fetchPrompt = async () => {
       try {
         const response = await axios.get('http://127.0.0.1:3001/gallery');
         console.log(response.data); // Debugging: Log the response data
         if(Array.isArray(response.data) && response.data.length > 0) {
           setInfo(response.data);
         } else {
           console.error("Data is not an array or is empty: ", response.data);
         }
       } catch (error) {
         console.error('Error fetching data:', error);
       } finally {
         setIsLoading(false);
       }
    };
    fetchPrompt();
  }, []);
  

  return (
    <>

      <main className="flex flex-col items-center gap-10 justify-center p-24">
        <div className="text-content">
        <div className="relative flex place-items-center flex-col z-[-1] before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          <h1 className="mb-3 text-4xl font-bold">
            <AnimatedText
              sentence="Galleries Page"
              styling="bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent"
            />
                    
          </h1>
          </div>
        </div>
        <div>
        <motion.div
  className="flex button-container"
  variants={container}
  initial="hidden"
  animate="visible"
>
  
        </motion.div>
          </div>
        

        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
          

        <motion.div
            className="flex mb-7"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <div
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >

              <img src="https://s3.amazonaws.com/polymagical/6131b51a-d9e4-4a7e-ba95-93317c7738ae.gif" alt="Image of a generated character"></img>
              <div className="flex flex-col items-center">

          

              <p className ="text-1xl text-white font-thin text-center items-center">
  {info[0].name || "Name"}</p>
          
  

      <AnimatedText
            sentence={info[0].backstory || "Loading backstory..."}
            styling="text-1xl text-white font-thin"
          />

    <AnimatedText
            sentence={info[0].story || "Loading backstory..."}
            styling="text-1xl text-white font-thin"
          />
    </div>
            </div>
          </motion.div>
          <motion.div
            className="flex mb-7"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <div
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
              <img src="https://s3.amazonaws.com/polymagical/f6b9dddd-5ac1-4d8f-807e-e4bb64aa57a3.gif" alt="Image of a generated character"></img>
              <div className="flex flex-col items-center">

          

<p className ="text-1xl text-white font-thin text-center items-center">
  {info[1].name || "Name"}</p>
          
    
    
      <AnimatedText
            sentence={info[1].backstory || "Loading backstory..."}
            styling="text-1xl text-white font-thin text-center items-cente"
          />
 
    <AnimatedText
            sentence={info[1].story || "Loading backstory..."}
            styling="text-1xl text-white font-thin "
          />
    </div>
            </div>
          </motion.div>
          <motion.div
            className="flex mb-7"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <div
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
        
              <img src="https://s3.amazonaws.com/polymagical/e65c315c-5fd9-46a4-8773-81d5651344c5.gif" alt="Image of a generated character"></img>
       
              <div className="flex flex-col items-center">

          
              <p className ="text-1xl text-white font-thin text-center items-center">
  {info[2].name || "Name"}</p>
          
    
    
      
      <AnimatedText
            sentence={info[2].backstory || "Loading backstory..."}
            styling="text-1xl text-white font-thin"
          />
    
    <AnimatedText
            sentence={info[2].story || "Loading backstory..."}
            styling="text-1xl text-white font-thin"
          />
    </div>
            </div>
          </motion.div>
          
          
          
        </div>
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

export default GalleriesPage;
