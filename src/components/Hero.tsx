import React from 'react';
import { Heart, Calendar, MapPin } from 'lucide-react';

const Firework = ({ delay }: { delay: number }) => {
  return (
    <div 
      className="absolute pointer-events-none"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}ms`
      }}
    >
      <div className="relative">
        {/* Central burst */}
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
        {/* Sparks */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-pulse"
            style={{
              transform: `rotate(${i * 45}deg) translateY(-20px)`,
              animationDelay: `${delay + 200}ms`,
              animationDuration: '1s'
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

type HeroProps = {
  config: AppConfig;
}

const Hero = ({ config }: HeroProps) => {
  const [showFireworks, setShowFireworks] = React.useState(false);

  React.useEffect(() => {
    // Trigger fireworks after component mounts
    const timer = setTimeout(() => {
      setShowFireworks(true);
    }, 1000);

    // Hide fireworks after animation
    const hideTimer = setTimeout(() => {
      setShowFireworks(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Wedding Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Fireworks Effect */}
      {showFireworks && (
        <div className="absolute inset-0 z-5">
          {[...Array(12)].map((_, i) => (
            <Firework key={i} delay={i * 300} />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <Heart className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-bounce" />
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif text-white mb-4 animate-fade-in-up">
            {config.name}
          </h1>
          <p className="text-lg sm:text-2xl md:text-3xl text-white mb-6 sm:mb-8 font-light animate-fade-in-up animation-delay-300">
            are getting married
          </p>
        </div>

        <div className="bg-white bg-opacity-95 rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm shadow-2xl border-2 border-yellow-400 animate-fade-in-up animation-delay-600">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-3 sm:space-y-4 md:space-y-0 md:space-x-8 text-gray-800">
            <div className="flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-yellow-500" />
              <span className="text-base sm:text-lg font-medium">{config.date}</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-yellow-400"></div>
            <div className="flex items-center space-x-2">
              <a
                href={config.location.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 group cursor-pointer"
                title="View location on Google Maps"
              >
                <MapPin className="w-6 h-6 text-yellow-500" />
                <span className="text-base sm:text-lg font-medium text-center">{config.location.address}</span>
              </a>
            </div>
          </div>
          
          <div className="mt-6 sm:mt-8">
            <a
              href="#rsvp"
              className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg animate-pulse-slow"
            >
              RSVP Now
            </a>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-white animate-fade-in-up animation-delay-900 px-4">
          <p className="text-base sm:text-lg italic">
            "Two souls with but a single thought, two hearts that beat as one."
          </p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-400 rounded-full opacity-70 animate-float"></div>
      <div className="absolute bottom-32 right-16 w-6 h-6 bg-yellow-400 rounded-full opacity-60 animate-float-delayed"></div>
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-yellow-400 rounded-full opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-20 w-2 h-2 bg-yellow-400 rounded-full opacity-40 animate-float-delayed" style={{ animationDelay: '3s' }}></div>
    </section>
  );
};

export default Hero;