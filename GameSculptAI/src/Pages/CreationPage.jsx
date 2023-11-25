import { useState, useEffect } from "react";
import "./App.css";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AnimatedText from "../Components/AnimatedText.jsx";
import { Link } from 'react-router-dom';

function CreationPage() {

  const [formData, setFormData] = useState({
    characterName: "",
    species: "",
    gender: "",
    characterDescription: "",
    themes: "",
    location: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:3001/post', formData);
      navigate('/results');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  


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
              sentence="Enter a Prompt"
              styling="bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent"
            />
          </h1>
        </div>
        <div className="mb-6">
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2" htmlFor="character-name">
                Character Name
              </label>
              <input
  onChange={handleChange}
  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
  id="character-name"
  type="text"
  placeholder="Enter Character Name"
  maxLength="50"
  name="characterName"
  value={formData.characterName}
/>
 </div>
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2" htmlFor="species">
                Species
              </label>
              <input
  onChange={handleChange}
  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
  id="species"
  type="text"
  placeholder="Species"
  maxLength="50"
  name="species"
  value={formData.species}
/>
 </div>
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2" htmlFor="gender">
                Gender
              </label>
              <input
  onChange={handleChange}
  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
  id="gender"
  type="text"
  placeholder="Gender"
  maxLength="50"
  name="gender"
  value={formData.gender}
/>
  </div>
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2" htmlFor="character-description">
                Character Description
              </label>
              <textarea
  onChange={handleChange}
  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
  id="character-description"
  name="characterDescription"
  placeholder="Character Description"
  maxLength="50"
  value={formData.characterDescription}></textarea>
            </div>
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2" htmlFor="theme-description">
                Story/Game Themes
              </label>
              <textarea onChange={handleChange} value={formData.themes} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="Themes"   name="themes" placeholder="Themes" maxLength="50"></textarea>
            </div>
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2" htmlFor="theme-description">
                Location/Events
              </label>
              <textarea onChange={handleChange} value={formData.location} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="location" name="location" placeholder="Location/Event Description" maxLength="50"></textarea>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <button className="bg-blue-500 hover:bg-blue-700 text-gray font-bold py-2 px-4 rounded" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
</div>
        <motion.div
          className="flex"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <h1></h1>
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

export default CreationPage;
