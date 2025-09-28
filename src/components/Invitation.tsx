import React from 'react';
import { Download, Heart } from 'lucide-react';

const Invitation: React.FC = () => {
  const handleDownload = () => {
    // Create a canvas to generate the invitation
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    canvas.width = 800;
    canvas.height = 1000;
    
    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Gold border
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 8;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
    
    // Title
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 48px serif';
    ctx.textAlign = 'center';
    ctx.fillText('You\'re Invited', canvas.width / 2, 150);
    
    // Names
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 36px serif';
    ctx.fillText('Oluwapelumi & Oluwaseun', canvas.width / 2, 220);
    
    // Event details
    ctx.font = '24px sans-serif';
    ctx.fillText('Saturday, June 15th, 2024', canvas.width / 2, 300);
    ctx.fillText('4:00 PM', canvas.width / 2, 340);
    ctx.fillText('Grand Ballroom', canvas.width / 2, 380);
    ctx.fillText('123 Wedding Lane, City, State', canvas.width / 2, 420);
    
    // Message
    ctx.font = '20px serif';
    ctx.fillStyle = '#666666';
    ctx.fillText('Join us as we celebrate our love', canvas.width / 2, 500);
    ctx.fillText('and begin our journey together', canvas.width / 2, 530);
    
    // RSVP
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('RSVP by May 15th, 2024', canvas.width / 2, 600);
    
    // Download the image
    const link = document.createElement('a');
    link.download = 'wedding-invitation.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <section id="invitation" className="py-20 bg-gradient-to-br from-white to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Heart className="w-12 h-12 text-amber-600 mx-auto mb-4 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
            Our Invitation
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Download and share our beautiful wedding invitation
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-4 border-amber-400 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-yellow-400"></div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-yellow-400"></div>
            
            <div className="text-center">
              {/* Header */}
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-serif text-amber-600 mb-2">
                  You're Invited
                </h3>
                <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
              </div>

              {/* Couple Names */}
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-2">
                  Oluwapelumi & Oluwaseun
                </h2>
              </div>

              {/* Event Details */}
              <div className="space-y-6 mb-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">Date & Time</h4>
                  <p className="text-lg text-gray-600">Saturday, June 15th, 2024</p>
                  <p className="text-lg text-gray-600">4:00 PM</p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">Venue</h4>
                  <p className="text-lg text-gray-600">Grand Ballroom</p>
                  <p className="text-lg text-gray-600">123 Wedding Lane, City, State</p>
                </div>
              </div>

              {/* Message */}
              <div className="mb-8">
                <p className="text-lg text-gray-600 font-serif italic">
                  "Join us as we celebrate our love and begin our journey together"
                </p>
              </div>

              {/* RSVP Notice */}
              <div className="mb-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-amber-800 font-semibold">
                  RSVP by May 15th, 2024
                </p>
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold rounded-full hover:from-amber-600 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Invitation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Invitation;