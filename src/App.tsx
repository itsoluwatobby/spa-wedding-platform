import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Story from './components/Story';
import Gallery from './components/Gallery';
import Invitation from './components/Invitation';
import RSVP from './components/RSVP';
import Contributions from './components/Contributions';
import Footer from './components/Footer';
import { useState } from 'react';

function App() {
  const [config] = useState<AppConfig>(
    {
      date: "December 27, 2025",
      name: "Oluwapelumi & Oluwaseun",
      contacts: {
        phone: {},
        email: {}
      }
    },
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation name={config.name} />

      <main>
        <div id="home">
          <Hero config={config} />
        </div>
        <Story />
        <Gallery />
        <Invitation />
        <RSVP />
        <Contributions />
      </main>
      <Footer config={config} />
    </div>
  );
}

export default App;