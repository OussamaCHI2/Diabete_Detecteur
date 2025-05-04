import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';

import { myProjects } from '../constants/index.js';
import CanvasLoader from '../components/Loading.jsx';
import DemoComputer from '../components/DemoComputer.jsx';
import '../css/project.css';
import React, { useEffect } from 'react';




import { Activity, AlertCircle, CheckCircle } from 'lucide-react';



const projectCount = myProjects.length;

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [modelId, setSelectedModel] = useState(null);
  const [formData, setFormData] = useState({
    Pregnancies: '',
    Glucose: '',
    BloodPressure: '',
    SkinThickness: '',
    Insulin: '',
    BMI: '',
    DiabetesPedigreeFunction: '',
    Age: ''
  });
  const currentProject = myProjects[selectedProjectIndex];
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  
  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === 'previous') {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  const handleModelSelection = (modelId) => {
    setSelectedModel(modelId);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmitModelData = async (e) => {
    e.preventDefault();
     console.log('Form data:', formData);
    console.log('Model ID:', modelId);
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...formData, model_id: modelId }), // Include selected model ID
      });

      const result = await response.json();
      
      setPredictionResult(result.prediction);

      setShowResultPopup(true);
     // Hide the form popup if needed
     setShowPopup(false);
     console.log("pred: ", result.prediction)
    } catch (error) {
      console.error('Error sending data to Flask:', error);
    }
  };

  useGSAP(() => {
    gsap.fromTo(`.animatedText`, { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.inOut' });
  }, [selectedProjectIndex]);

   const DiabetesPredictionDisplay = ( {prediction} ) => {
    const [showAnimation, setShowAnimation] = useState(true);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 100);
      
      return () => clearTimeout(timer);
    }, []);
    
    return (showResultPopup && ( 
<div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-3xl border border-blue-100 dark:border-blue-900 max-h-[90vh] overflow-y-auto animate-scale-up">
        <div className="flex items-center justify-between mb-4 border-b pb-3 border-gray-200 dark:border-gray-700">
          <button 
            onClick={() => setShowResultPopup(false)} 
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        <div className={`transition-all duration-500 ${showAnimation ? 'scale-95 opacity-70' : 'scale-100 opacity-100'}`}>
          <div className={`p-6 rounded-lg shadow-lg ${prediction === 1 ? 'bg-gradient-to-br from-red-900 to-red-800' : 'bg-gradient-to-br from-green-900 to-green-800'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Activity className="text-white mr-2" size={24}/>
                <h2 className="text-xl font-bold text-white">Diabetes Assessment </h2>
              </div>
              {prediction === 1 ? (
                <AlertCircle className="text-red-300" size={28} />
              ) : (
                <CheckCircle className="text-green-300" size={28} />
              )}
            </div>
            
            <div className="bg-black bg-opacity-20 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Prediction Result:</span>
                <span className={`font-bold text-lg ${prediction === 1 ? 'text-red-300' : 'text-green-300'}`}>
                  {prediction === 1 ? 'Diabetic' : 'Not Diabetic'}
                </span>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${prediction === 1 ? 'bg-red-500' : 'bg-green-500'}`}
                  style={{ width: `${prediction === 1 ? '75%' : '25%'}` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-green-300">Low Risk</span>
                <span className="text-xs text-red-300">High Risk</span>
              </div>
            </div>
            
            {prediction === 1 ? (
              <div className="mt-4 p-3 bg-red-950 bg-opacity-50 rounded border border-red-700 text-sm text-white">
                <p>Consider further testing and consulting with a healthcare professional for proper diagnosis and management options.</p>
              </div>
            ) : (
              <div className="mt-4 p-3 bg-green-950 bg-opacity-50 rounded border border-green-700 text-sm text-white">
                <p>Results suggest low diabetes risk. Continue maintaining healthy lifestyle habits for ongoing prevention.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ));
};
  

  return (
    <section className="c-space my-20" id='models'>
      <p className="head-text">Les modeles Utiliser</p>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
          <div className="absolute top-0 right-0">
            <img src={currentProject.spotlight} alt="spotlight" className="w-full h-96 object-cover rounded-xl" />
          </div>

          <div className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg" style={currentProject.logoStyle}>
            <img className="w-10 h-10 shadow-sm" src={currentProject.logo} alt="logo" />
          </div>

          <div className="flex flex-col gap-5 text-white-600 my-5">
            <p className="text-white text-2xl font-semibold animatedText">{currentProject.id}. {currentProject.title}</p>

            <p className="animatedText">{currentProject.desc}</p>
            <p className="animatedText">{currentProject.subdesc}</p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo">
                  <img src={tag.path} alt={tag.name} />
                </div>
              ))}
            </div>
          </div>

          {/* Form a Remplire pour prediction */}
          {showPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 p-4 animate-fade-in">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-3xl border border-blue-100 dark:border-blue-900 max-h-[90vh] overflow-y-auto animate-scale-up">
      <div className="flex items-center justify-between mb-4 border-b pb-3 border-gray-200 dark:border-gray-700">
       
        <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center animate-slide-in">
          <span className="mr-2">📋</span> 
           {currentProject.title} Model
        </h3>
        <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-300 text-sm font-medium animate-bounce-in">
          Health Data
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm animate-fade-in-up delay-100">
        Please enter your health metrics below to generate a diabetes risk assessment.
      </p>

      <form onSubmit={handleSubmitModelData} >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Column */}
          <div className="animate-fade-in-left delay-200">
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <span className="mr-1">👶</span> Pregnancies
              </label>
              <input 
                type="number" 
                name="Pregnancies" 
                value={formData.Pregnancies} 
                onChange={handleInputChange} 
                placeholder="Example: 0-15" 
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm transform transition-all duration-300 hover:shadow-md" 
                required 
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Number of times pregnant</p>
            </div>
            
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <span className="mr-1">🍬</span> Glucose
              </label>
              <input 
                type="number" 
                name="Glucose" 
                value={formData.Glucose} 
                onChange={handleInputChange} 
                placeholder="Example: 70-180 mg/dL" 
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm transform transition-all duration-300 hover:shadow-md" 
                required 
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Plasma glucose concentration</p>
            </div>
            
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <span className="mr-1">❤️</span> Blood Pressure
              </label>
              <input 
                type="number" 
                name="BloodPressure" 
                value={formData.BloodPressure} 
                onChange={handleInputChange} 
                placeholder="Example: 60-120 mm Hg" 
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm transform transition-all duration-300 hover:shadow-md" 
                required 
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Diastolic blood pressure</p>
            </div>
            
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <span className="mr-1">📏</span> Skin Thickness
              </label>
              <input 
                type="number" 
                name="SkinThickness" 
                value={formData.SkinThickness} 
                onChange={handleInputChange} 
                placeholder="Example: 10-50 mm" 
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm transform transition-all duration-300 hover:shadow-md" 
                required 
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Triceps skin fold thickness</p>
            </div>
          </div>

          {/* Second Column */}
          <div className="animate-fade-in-right delay-300">
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <span className="mr-1">💉</span> Insulin
              </label>
              <input 
                type="number" 
                name="Insulin" 
                value={formData.Insulin} 
                onChange={handleInputChange} 
                placeholder="Example: 0-846 μU/ml" 
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm transform transition-all duration-300 hover:shadow-md" 
                required 
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">2-Hour serum insulin</p>
            </div>
            
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <span className="mr-1">⚖️</span> BMI
              </label>
              <input 
                type="number" 
                name="BMI" 
                value={formData.BMI} 
                onChange={handleInputChange} 
                placeholder="Example: 18.5-40 kg/m²" 
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm transform transition-all duration-300 hover:shadow-md" 
                required 
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Body mass index</p>
            </div>
            
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <span className="mr-1">👪</span> Diabetes Pedigree
              </label>
              <input 
                type="number" 
                name="DiabetesPedigreeFunction" 
                value={formData.DiabetesPedigreeFunction} 
                onChange={handleInputChange} 
                placeholder="Example: 0.08-2.42" 
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm transform transition-all duration-300 hover:shadow-md" 
                required 
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Genetic influence score</p>
            </div>
            
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <span className="mr-1">📆</span> Age
              </label>
              <input 
                type="number" 
                name="Age" 
                value={formData.Age} 
                onChange={handleInputChange} 
                placeholder="Example: 21-81 years" 
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm transform transition-all duration-300 hover:shadow-md" 
                required 
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Age in years</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-gray-200 dark:border-gray-700 animate-fade-in-up delay-400">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0 h-6 w-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-blue-600 dark:text-blue-300 text-xs">🔒</span>
            </div>
            <p className="ml-2 text-xs text-gray-500 dark:text-gray-400">
              Your health data is processed securely and confidentially
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <button
              type="submit"
              onClick={DiabetesPredictionDisplay}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 hover:shadow-lg hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:translate-y-[1px] active:shadow-sm transition-all duration-300 ease-out flex items-center justify-center order-1 sm:order-2 group animate-pulse-subtle"
            >
              <span className="mr-2 group-hover:mr-3 transition-all duration-300">Predict</span>
              <span className="transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">📊</span>
            </button>

            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="px-4 py-2 rounded-lg text-gray-700 font-medium border border-gray-300 hover:border-gray-400 hover:bg-gray-50 hover:shadow focus:outline-none focus:ring-2 focus:ring-gray-300 active:bg-gray-100 transition-all duration-300 ease-out dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-500 mb-2 sm:mb-0 order-2 sm:order-1 relative overflow-hidden group"
            >
              <span className="relative z-10">Cancel</span>
              <span className="absolute inset-0 bg-gray-200 dark:bg-gray-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out opacity-30"></span>
            </button>
          </div>
        </div>
      </form>   
    </div>
  </div>
)}
    <DiabetesPredictionDisplay 
     prediction={predictionResult} 
     isOpen={showResultPopup} 
     onClose={() => setShowResultPopup(false)}
     patientData={formData}
     />

          <div className="flex justify-between items-center mt-7">
            <button className="arrow-btn" onClick={() => handleNavigation('previous')}>
              <img src="/assets/left-arrow.png" alt="left arrow" />
            </button>
  {/* Button de Choisir le model et Affiche le pop up*/}
              <button 
                className="flex items-center gap-2 cursor-pointer text-white-700 bg-red-600 rounded-lg"
                onClick={() => { handleModelSelection(currentProject.id); setShowPopup(true);}}
              >
              <img src="/assets/arrow-up.png" alt="arrow" className="w-3 h-3" />
              <p>Tester Votre Diabete Par Le Model {currentProject.id}</p>
              </button>



            <button className="arrow-btn" onClick={() => handleNavigation('next')}>
              <img src="/assets/right-arrow.png" alt="right arrow" className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full">
          <Canvas>
            <ambientLight intensity={Math.PI} />
            <directionalLight position={[10, 10, 5]} />
            <Center>
              <Suspense fallback={<CanvasLoader />}>
                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                  <DemoComputer texture={currentProject.texture} />
                </group>
              </Suspense>
            </Center>
            <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
          </Canvas>
        </div>
      </div>
      
    </section>
    
  );
};

export default Projects;
