import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Footer from './sections/Footer.jsx';
import Navbar from './sections/Navbar.jsx';
import Contact from './sections/Contact.jsx';
import Projects from './sections/Projects.jsx';
import Diabetetimeline from './sections/Diabetetimeline.jsx';
import DiabetesAdvice from './sections/Conseil.jsx';


const App = () => {
  return (
    <main className="max-w-7xl mx-auto relative">
      <Navbar />
      <Hero />
      <Diabetetimeline />
      <About />
      <Projects />
      <DiabetesAdvice/>
      <Contact />
      <Footer />
    </main>
  );
};

export default App;
