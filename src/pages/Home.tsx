import { useState } from "react";
import { AppData } from "../data/app";
import { useHasSubmitted } from "../hooks/useHasSubmitted";
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Story from '../components/Story';
import Gallery from '../components/Gallery';
import Invitation from '../components/Invitation';
import RSVP from '../components/RSVP';
import Contributions from '../components/Contributions';
import AccessCards from '../components/AccessCards';
import Footer from '../components/Footer';

const HomePage = () => {
  const [config] = useState<AppConfig>(AppData);
  const { data, hasSubmitted, refetch } = useHasSubmitted();

  return (
    <div className="min-h-screen bg-white">
      <Navigation name={config.name} />
      <main className="w-full">
        <div id="home">
          <Hero config={config} />
        </div>
        <Story />
        <Gallery />
        <Invitation googleMapsLink={config.location.googleMapsLink}/>
        <RSVP 
          // data={data}
          refetch={refetch}
          hasSubmitted={hasSubmitted}
        />
        <Contributions />
        <AccessCards 
          data={data}
          hasSubmitted={hasSubmitted}
        />
      </main>
      <Footer config={config} />
    </div>
  );
};

export default HomePage;