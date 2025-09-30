import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Story from './components/Story';
import Gallery from './components/Gallery';
import Invitation from './components/Invitation';
import RSVP from './components/RSVP';
import Contributions from './components/Contributions';
import AccessCards from './components/AccessCards';
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

  const ogDetails = {
    title: "Oluwapelumi&Oluwaseun'25",
    description: "Our wedding is on December 27, 2025. Come, celebrate with us",
    url: "https://oluwapelumi-et-oluwaseun.onrender.com",
    image: "https://qcjfdelqtoswtmaetidu.supabase.co/storage/v1/object/public/persnal/together1.jpg",
    image_secure_url: "https://qcjfdelqtoswtmaetidu.supabase.co/storage/v1/object/public/persnal/together1.jpg",
    image_alt: "oluwapelumi&oluwaseun",
    site: "@oluwapelumi&oluwaseun",
    site_name: "oluwapelumi&oluwaseun",
    image_width: "1200",
    image_height: "600",
    image_type: "image/png",
    twitter_card: "summary_large_image",
    type: "website"
  };

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <Helmet>
        {/* FACEBOOK OG-graph */}
        <meta property="og:title" data-n-head="ssr" data-hid="og:title" content={ogDetails.title} />
        <meta property="og:description" data-n-head="ssr" data-hid="og:description" content={ogDetails.description} />
        <meta property="og:image" data-n-head="ssr" data-hid="og:image" content={ogDetails.image} />
        <meta property="og:image:secure_url" data-n-head="ssr" data-hid="og:image:secure_url" content={ogDetails.image_secure_url} />
        <meta property="og:url" data-n-head="ssr" data-hid="og:url" content={ogDetails.url} />
        <meta property="og:type" data-n-head="ssr" data-hid="og:type" content={ogDetails.type} />
        <meta property="og:image:type" data-n-head="ssr" data-hid="og:image:type" content={ogDetails.image_type} />
        <meta property="og:image:width" data-n-head="ssr" data-hid="og:image:width" content={ogDetails.image_width} />
        <meta property="og:image:height" data-n-head="ssr" data-hid="og:image:height" content={ogDetails.image_height} />
        <meta property="og:site:name" data-n-head="ssr" content={ogDetails.site_name} />
        {/* TWITTER CARD */}
        <meta property="og:twitter:card" data-n-head="ssr" data-hid="og:twitter:card" content={ogDetails.twitter_card} />
        <meta property="og:twitter:title" data-n-head="ssr" data-hid="og:twitter:title" content={ogDetails.title} />
        <meta property="og:twitter:description" data-n-head="ssr" data-hid="og:twitter:description" content={ogDetails.description} />
        <meta property="og:twitter:image" data-n-head="ssr" data-hid="og:twitter:image" content={ogDetails.image} />
        <meta property="og:twitter:image:alt" data-n-head="ssr" data-hid="og:twitter:image:alt" content={ogDetails.image_alt} />
        <meta property="og:twitter:site" data-n-head="ssr" data-hid="og:twitter:site" content={ogDetails.site} />
      </Helmet>

      <Navigation name={config.name} />

      <main className="w-full">
        <div id="home">
          <Hero config={config} />
        </div>
        <Story />
        <Gallery />
        <Invitation googleMapsLink={config.location.googleMapsLink}/>
        {/* <AccessCards /> */}
        <RSVP />
        <Contributions />
      </main>
      <Footer config={config} />

      <ToastContainer />
    </div>
  );
}

export default App;