import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

type NotificationProps = {
  name: string;
}

const Navigation = ({ name}: NotificationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-black bg-opacity-20 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Heart className={`w-6 h-6 ${isScrolled ? 'text-yellow-500' : 'text-yellow-400'}`} />
            <span className={`font-serif text-xl font-semibold ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}>
              {name}
            </span>
          </div>

          <div className="hidden md:flex space-x-8">
            {[
              { label: 'Home', id: 'home' },
              { label: 'Our Story', id: 'story' },
              { label: 'Gallery', id: 'gallery' },
              { label: 'Invitation', id: 'invitation' },
              { label: 'RSVP', id: 'rsvp' },
              { label: 'Gifts', id: 'contributions' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-medium transition-colors duration-200 hover:text-yellow-500 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                } drop-shadow-sm`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;