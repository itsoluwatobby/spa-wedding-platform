import React from 'react';
import { Heart, Star, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const elementRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setIsVisible(true);
        setHasAnimated(true);
      }
    }, { threshold: 0.3, ...options });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return [elementRef, isVisible];
};

const Story = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = React.useState(true);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const [titleRef, titleVisible] = useIntersectionObserver();
  const [quoteRef, quoteVisible] = useIntersectionObserver();

  const milestones = [
    {
      icon: Star,
      date: "March 2018",
      title: "First Meeting",
      description: "We met at a cozy coffee shop downtown during a rainy afternoon. Little did we know it would be the beginning of our forever."
    },
    {
      icon: Heart,
      date: "December 2019",
      title: "First 'I Love You'",
      description: "Under the Christmas lights at the city park, we shared our first 'I love you' and knew this was something special."
    },
    {
      icon: Calendar,
      date: "August 2023",
      title: "The Proposal",
      description: "During our favorite hiking trail at sunset, Oluwaseun got down on one knee and asked Oluwapelumi to be his forever adventure partner."
    }
  ];

  // Duplicate milestones for infinite scroll effect
  const infiniteMilestones = [...milestones, ...milestones, ...milestones];

  React.useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % milestones.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoScrolling, milestones.length]);

  React.useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.clientWidth || 0;
      const gap = 32; // 2rem gap
      const scrollPosition = (cardWidth + gap) * (currentIndex + milestones.length);
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, milestones.length]);

  const handlePrevious = () => {
    setIsAutoScrolling(false);
    setCurrentIndex((prev) => (prev - 1 + milestones.length) % milestones.length);
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  const handleNext = () => {
    setIsAutoScrolling(false);
    setCurrentIndex((prev) => (prev + 1) % milestones.length);
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  return (
    <section id="story" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div ref={titleRef} className={`text-center mb-16 transition-all duration-1000 ${
          titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-5xl font-serif text-gray-800 mb-6">Our Love Story</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Every love story is beautiful, but ours is our favorite. Here's how our journey began
            and the moments that brought us to this special day.
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm text-gray-700 p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm text-gray-700 p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-hidden scroll-smooth snap-x snap-mandatory scrollbar-hide"
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
          >
            {infiniteMilestones.map((milestone, index) => {
              const IconComponent = milestone.icon;
              const originalIndex = index % milestones.length;
              const isActive = originalIndex === currentIndex;
              
              return (
                <div
                  key={`${originalIndex}-${Math.floor(index / milestones.length)}`}
                  className={`flex-shrink-0 w-full md:w-[640px] bg-white rounded-2xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-all duration-700 text-center group hover:-translate-y-2 transform snap-center ${
                    isActive ? 'ring-2 ring-yellow-400 scale-105' : ''
                  }`}
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-white" />
                  </div>
                  <div className="text-yellow-500 font-semibold text-base md:text-lg uppercase tracking-wide mb-4">
                    {milestone.date}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif text-gray-800 mb-6">
                    {milestone.title}
                  </h3>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto">
                    {milestone.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {milestones.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoScrolling(false);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAutoScrolling(true), 10000);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  currentIndex === index 
                    ? 'bg-yellow-400 scale-125' 
                    : 'bg-gray-300 hover:bg-yellow-300 hover:scale-110'
                }`}
              />
            ))}
          </div>
        </div>

        <div ref={quoteRef} className={`mt-16 text-center transition-all duration-1000 ${
          quoteVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-white rounded-3xl p-12 shadow-2xl max-w-4xl mx-auto border-2 border-yellow-300">
            <Heart className="w-12 h-12 text-yellow-400 mx-auto mb-6 animate-pulse" />
            <blockquote className="text-2xl font-serif text-gray-700 italic leading-relaxed mb-6">
              "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
            </blockquote>
            <cite className="text-gray-500">- Maya Angelou</cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;