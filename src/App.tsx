import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Story from './components/Story';
import Gallery from './components/Gallery';
import Invitation from './components/Invitation';
import RSVP from './components/RSVP';
import Contributions from './components/Contributions';
import Footer from './components/Footer';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const [config] = useState<AppConfig>(
    {
      date: "December 27, 2025",
      name: "Oluwapelumi & Oluwaseun",
      contacts: {
        phone: {
          first: ["Mr. Segun", "+2348024210466"],
          second: ["Mr. Temitope", "+2348055571094"],
        },
        email: {}
      },
      location: {
        address: "Crown Plaza Event Center, @ 157 Ijesha Rd, Itire, Lagos",
        googleMapsLink: "https://maps.app.goo.gl/pgUJRnHL68xtNi2h6"
      }
    },
  );

  return (
    <div className="min-h-screen bg-white w-full">
      <Helmet>
        {/* FACEBOOK OG-graph */}
        <meta property="og:title" content={"Oluwapelumi&Oluwaseun'25"} />
        <meta property="og:description" content={"Our wedding is on December 27, 2025"} />
        <meta property="og:url" content={"https://oluwapelumi-et-oluwaseun.onrender.com"} />
        <meta property="og:image" content={"https://qcjfdelqtoswtmaetidu.supabase.co/storage/v1/object/public/persnal/together1.jpg"} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="oluwapelumi&oluwaseun" />

        {/* TWITTER CARD */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={"Oluwapelumi&Oluwaseun'25"} />
        <meta name="twitter:description" content={"Our wedding is on December 27, 2025"} />
        <meta name="twitter:url" content={"https://oluwapelumi-et-oluwaseun.onrender.com"} />
        <meta name="twitter:image" content={"https://qcjfdelqtoswtmaetidu.supabase.co/storage/v1/object/public/persnal/together1.jpg"} />
      </Helmet>

      <Navigation name={config.name} />

      <main className="w-full">
        <div id="home">
          <Hero config={config} />
        </div>
        <Story />
        <Gallery />
        <Invitation googleMapsLink={config.location.googleMapsLink}/>
        <RSVP />
        <Contributions />
      </main>
      <Footer config={config} />

      <ToastContainer />
    </div>
  );
}

export default App;