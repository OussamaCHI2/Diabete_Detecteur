import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Developer from '../components/Developer.jsx';
import CanvasLoader from '../components/Loading.jsx';
import { ArrowRight, Info, CheckCircle, BookOpen, ChevronUp, ChevronDown, Utensils, Activity, PlusCircle, Heart } from 'lucide-react';
import Doctor from '../components/doc.jsx';

const DiabetesAdvice=()=> {
  const [currentAdviceIndex, setCurrentAdviceIndex] = useState(0);
  const [openSection, setOpenSection] = useState("general");
  
  const diabetesAdvice = [
    {
      title: "Surveillance de la glycémie",
      content: "Mesurez régulièrement votre glycémie selon les recommandations de votre médecin. Tenez un journal pour suivre les fluctuations.",
      icon: <Info className="text-purple-400" />
    },
    {
      title: "Alimentation équilibrée",
      content: "Privilégiez les aliments à faible index glycémique et répartissez les glucides tout au long de la journée.",
      icon: <CheckCircle className="text-green-400" />
    },
    {
      title: "Activité physique",
      content: "Pratiquez une activité physique régulière pour améliorer votre sensibilité à l'insuline et contrôler votre glycémie.",
      icon: <CheckCircle className="text-green-400" />
    },
    {
      title: "Gestion du stress",
      content: "Le stress peut affecter votre glycémie. Pratiquez des techniques de relaxation comme la méditation ou la respiration profonde.",
      icon: <Info className="text-purple-400" />
    }
  ];

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "" : section);
  };

  const nextAdvice = () => {
    setCurrentAdviceIndex((prevIndex) => 
      prevIndex === diabetesAdvice.length - 1 ? 0 : prevIndex + 1
    );
  };

  const advice = diabetesAdvice[currentAdviceIndex];

  return (
    <div className="w-full mx-auto p-4">
      <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden text-white">
        <div className="flex flex-col md:flex-row">
         
          {/* Conseils pour le diabète */}
          <div className="w-full md:w-2/3 p-6">
            <h2 className="text-3xl font-bold text-purple-400 mb-4 text-center">Conseils pour la gestion du diabète</h2>
            
            {/* Carte conseil rapide */}
            <div className="bg-gray-800 rounded-lg p-5 mb-6 border border-gray-700">
              <div className="flex items-start mb-3">
                {advice.icon}
                <h3 className="text-xl font-semibold ml-2 text-white">{advice.title}</h3>
              </div>
              <p className="text-gray-300 ml-8 text-lg mb-4">{advice.content}</p>
              
              <button 
                onClick={nextAdvice}
                className="flex items-center justify-center px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition-colors w-full"
              >
                Conseil suivant <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              
              <div className="flex justify-center mt-4">
                {diabetesAdvice.map((_, index) => (
                  <div 
                    key={index} 
                    className={`h-2 w-2 rounded-full mx-1 ${index === currentAdviceIndex ? 'bg-purple-500' : 'bg-gray-600'}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Sections détaillées en accordéon */}
            <div className="space-y-4">
              {/* Section générale */}
              <div className="border border-gray-700 rounded-lg overflow-hidden">
                <button 
                  onClick={() => toggleSection("general")}
                  className="w-full flex items-center justify-between p-4 bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center">
                    <BookOpen className="mr-3 text-purple-400" size={24} />
                    <span className="font-semibold text-lg">Comprendre le Diabète</span>
                  </div>
                  {openSection === "general" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSection === "general" && (
                  <div className="p-4 bg-gray-800 border-t border-gray-700">
                    <p className="mb-3 text-gray-300">Le diabète est une maladie chronique qui survient lorsque le pancréas ne produit pas suffisamment d'insuline ou lorsque l'organisme n'utilise pas correctement l'insuline qu'il produit.</p>
                    <p className="mb-3 text-gray-300">Il existe deux types principaux de diabète :</p>
                    <ul className="list-disc pl-6 mb-3 text-gray-300">
                      <li className="mb-2"><span className="font-semibold text-purple-300">Type 1</span> - Le corps ne produit pas d'insuline (maladie auto-immune)</li>
                      <li className="mb-2"><span className="font-semibold text-purple-300">Type 2</span> - Le corps développe une résistance à l'insuline ou ne produit pas assez d'insuline</li>
                    </ul>
                    <p className="text-gray-300">Le suivi médical régulier est essentiel pour prévenir les complications.</p>
                  </div>
                )}
              </div>

              {/* Section alimentation */}
              <div className="border border-gray-700 rounded-lg overflow-hidden">
                <button 
                  onClick={() => toggleSection("nutrition")}
                  className="w-full flex items-center justify-between p-4 bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center">
                    <Utensils className="mr-3 text-purple-400" size={24} />
                    <span className="font-semibold text-lg">Alimentation</span>
                  </div>
                  {openSection === "nutrition" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSection === "nutrition" && (
                  <div className="p-4 bg-gray-800 border-t border-gray-700">
                    <p className="mb-3 text-gray-300">Une alimentation équilibrée est fondamentale pour gérer le diabète :</p>
                    <ul className="list-disc pl-6 mb-4 text-gray-300">
                      <li className="mb-2">Privilégiez les aliments à faible indice glycémique</li>
                      <li className="mb-2">Limitez les sucres simples et les glucides raffinés</li>
                      <li className="mb-2">Mangez des légumes en abondance</li>
                      <li className="mb-2">Consommez des protéines maigres et des graisses saines</li>
                      <li className="mb-2">Respectez des horaires réguliers pour les repas</li>
                    </ul>
                    <p className="text-purple-300 italic">Conseil : Tenez un journal alimentaire pour identifier les aliments qui affectent votre glycémie.</p>
                  </div>
                )}
              </div>

              {/* Section activité physique */}
              <div className="border border-gray-700 rounded-lg overflow-hidden">
                <button 
                  onClick={() => toggleSection("activity")}
                  className="w-full flex items-center justify-between p-4 bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center">
                    <Activity className="mr-3 text-purple-400" size={24} />
                    <span className="font-semibold text-lg">Activité Physique</span>
                  </div>
                  {openSection === "activity" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSection === "activity" && (
                  <div className="p-4 bg-gray-800 border-t border-gray-700">
                    <p className="mb-3 text-gray-300">L'exercice aide à contrôler la glycémie et améliore la sensibilité à l'insuline :</p>
                    <ul className="list-disc pl-6 mb-4 text-gray-300">
                      <li className="mb-2">Visez 150 minutes d'activité modérée par semaine</li>
                      <li className="mb-2">Incluez des exercices d'aérobic et de renforcement musculaire</li>
                      <li className="mb-2">Commencez doucement et augmentez progressivement l'intensité</li>
                      <li className="mb-2">Mesurez votre glycémie avant, pendant et après l'exercice</li>
                    </ul>
                    <p className="text-purple-300 italic">Important : Ayez toujours une collation sucrée à portée de main en cas d'hypoglycémie.</p>
                  </div>
                )}
              </div>

              {/* Section surveillance */}
              <div className="border border-gray-700 rounded-lg overflow-hidden">
                <button 
                  onClick={() => toggleSection("monitoring")}
                  className="w-full flex items-center justify-between p-4 bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center">
                    <PlusCircle className="mr-3 text-purple-400" size={24} />
                    <span className="font-semibold text-lg">Surveillance et Médicaments</span>
                  </div>
                  {openSection === "monitoring" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSection === "monitoring" && (
                  <div className="p-4 bg-gray-800 border-t border-gray-700">
                    <p className="mb-3 text-gray-300">Une surveillance régulière est essentielle :</p>
                    <ul className="list-disc pl-6 mb-4 text-gray-300">
                      <li className="mb-2">Mesurez votre glycémie selon les recommandations de votre médecin</li>
                      <li className="mb-2">Prenez vos médicaments ou votre insuline exactement comme prescrit</li>
                      <li className="mb-2">Consultez régulièrement votre équipe médicale</li>
                      <li className="mb-2">Faites vérifier votre HbA1c tous les 3-6 mois</li>
                    </ul>
                    <p className="text-red-400 font-semibold">N'ajustez jamais votre traitement sans consulter votre médecin.</p>
                  </div>
                )}
              </div>

              {/* Section mode de vie */}
              <div className="border border-gray-700 rounded-lg overflow-hidden">
                <button 
                  onClick={() => toggleSection("lifestyle")}
                  className="w-full flex items-center justify-between p-4 bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center">
                    <Heart className="mr-3 text-purple-400" size={24} />
                    <span className="font-semibold text-lg">Mode de Vie</span>
                  </div>
                  {openSection === "lifestyle" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSection === "lifestyle" && (
                  <div className="p-4 bg-gray-800 border-t border-gray-700">
                    <p className="mb-3 text-gray-300">Adoptez des habitudes saines pour mieux gérer votre diabète :</p>
                    <ul className="list-disc pl-6 mb-4 text-gray-300">
                      <li className="mb-2">Gérez votre stress par la méditation, le yoga ou la respiration profonde</li>
                      <li className="mb-2">Dormez suffisamment (7-8 heures par nuit)</li>
                      <li className="mb-2">Évitez le tabac et limitez l'alcool</li>
                      <li className="mb-2">Prenez soin de vos pieds avec des examens quotidiens</li>
                      <li className="mb-2">Rejoignez un groupe de soutien pour diabétiques</li>
                    </ul>
                    <p className="text-purple-300 italic">Rappel : Chaque petit changement positif compte dans la gestion du diabète.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-800 border-l-4 border-yellow-500 rounded">
              <p className="font-semibold text-yellow-400">Avertissement :</p>
              <p className="text-gray-300">Ces informations sont à titre éducatif uniquement et ne remplacent pas les conseils d'un professionnel de santé. Consultez toujours votre médecin pour des recommandations personnalisées.</p>
            </div>
            
          </div>
          <div className="w-full md:w-1/3 bg-gray-800 flex items-center justify-center p-6" style={{ minHeight: '600px' }}>
            <div className="text-center p-4 border-2 border-dashed border-gray-600 rounded-lg w-full h-full flex items-center justify-center">
            <Canvas>
              <ambientLight intensity={4} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <directionalLight position={[10, 10, 10]} intensity={0.5} />
              <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2}  />

              <Suspense fallback={<CanvasLoader />}>
              <Doctor position-y={2} scale={1.5}/>
              </Suspense>
            </Canvas>
          
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DiabetesAdvice;