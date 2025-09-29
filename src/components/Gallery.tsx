import { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const photos = [
    {
      url: "/images/sunset2.png",
      caption: "Adventure",
      type: "image"
    },
    {
      url: "/images/sunset1.png",
      caption: "Adventure together",
      type: "image"
    },
    {
      url: "/video/lovely-moments.mp4",
      caption: "Lovely Moments",
      type: "video"
    },
    {
      url: "/images/groom2.jpg",
      caption: "Odugwu",
      type: "image"
    },
    {
      url: "/images/bride6.jpg",
      caption: "Odugwu's Madam",
      type: "image"
    },
    // {
    //   url: "https://images.pexels.com/photos/1024992/pexels-photo-1024992.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //   caption: "Celebrating love"
    // }
  ];

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % photos.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <section id="gallery" className="py-20 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl max-xxs:text-4xl font-serif text-gray-800 mb-6">Our Journey Together</h2>
          <p className="text-xl max-xxs:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A collection of beautiful moments we've shared together, capturing the essence of our love story.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Slideshow */}
          <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
            <div className="aspect-w-16 aspect-h-9 h-96 md:h-[500px]">
              {
                photos[currentSlide].type === "image" ?
                <img
                  src={photos[currentSlide].url}
                  alt={photos[currentSlide].caption}
                  className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                    isTransitioning ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
                  }`}
                />
                : 
                <video 
                src={photos[currentSlide].url}
                autoPlay
                controls
                // muted
                className='box-border h-full w-full objectcenter object-cove'
                ></video>
              }
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            <div className={`absolute bottom-0 left-0 right-0 p-8 transition-all duration-500 ${
              isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}>
              <p className="text-white text-xl font-medium text-center">
                {photos[currentSlide].caption}
              </p>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center mt-8 space-x-4 overflow-x-auto pb-4">
            {photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                  currentSlide === index 
                    ? 'border-yellow-400 scale-110 shadow-lg' 
                    : 'border-transparent hover:border-yellow-300 hover:scale-105'
                }`}
              >
                <img
                  src={photo.type === "image" ? photo.url : "/images/sunset2.png"}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  currentSlide === index 
                    ? 'bg-yellow-400 scale-125' 
                    : 'bg-gray-300 hover:bg-yellow-300 hover:scale-110'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Decorative Heart */}
        <div className="text-center mt-12">
          <Heart className="w-8 h-8 text-yellow-400 mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Gallery;