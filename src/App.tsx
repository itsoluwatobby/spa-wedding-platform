import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/Home';
import AdminPage from './pages/AdminPage';

function App() {
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


      <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>

      <ToastContainer />
    </div>
  );
}

export default App;