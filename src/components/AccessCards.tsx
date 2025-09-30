import { CreditCard, Download, QrCode } from 'lucide-react';

const AccessCards = () => {
  const handleDownload = (cardType: string) => {
    // Create a canvas to generate the access card
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    canvas.width = 800;
    canvas.height = 500;
    
    // Card background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    if (cardType === 'vip') {
      gradient.addColorStop(0, '#D4AF37');
      gradient.addColorStop(1, '#B8860B');
    } else {
      gradient.addColorStop(0, '#4F46E5');
      gradient.addColorStop(1, '#3730A3');
    }
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Card details
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 32px sans-serif';
    ctx.fillText(cardType === 'vip' ? 'VIP ACCESS CARD' : 'GUEST ACCESS CARD', 50, 80);
    
    ctx.font = '24px sans-serif';
    ctx.fillText('Oluwapelumi & Oluwaseun Wedding', 50, 150);
    ctx.fillText('June 15, 2025 • Sunset Gardens', 50, 190);
    
    ctx.font = '20px sans-serif';
    ctx.fillText(cardType === 'vip' ? 'Premium seating • Priority service' : 'General admission', 50, 250);
    
    // Download the image
    const link = document.createElement('a');
    link.download = `${cardType}-access-card.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <section id="access-cards" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <CreditCard className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-6">Access Cards</h2>
          <p className="hidden text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Download your personalized access cards for our special day. Present these at the venue for entry.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* VIP Access Card */}
          <div className="group perspective-1000">
            <div className="relative w-full h-64 transform-style-preserve-3d transition-transform duration-700 group-hover:rotate-y-12">
              {/* Card Front */}
              <div className="absolute inset-0 w-full h-full backface-hidden">
                <div className="w-full h-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 border-2 border-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white rounded-full"></div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <CreditCard className="w-8 h-8 text-white" />
                        <QrCode className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">VIP ACCESS</h3>
                      <p className="text-white/90 text-sm">Premium Experience</p>
                    </div>
                    
                    <div>
                      <div className="mb-3">
                        <p className="text-white/80 text-xs uppercase tracking-wider">Wedding Event</p>
                        <p className="text-white font-semibold">Oluwapelumi & Oluwaseun</p>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-white/80 text-xs">Valid Until</p>
                          <p className="text-white font-mono">06/15/25</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/80 text-xs">Card Type</p>
                          <p className="text-white font-bold">GOLD</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chip */}
                  <div className="absolute top-16 left-6 w-12 h-8 bg-white/20 rounded-md border border-white/30"></div>
                </div>
              </div>
            </div>
            
            {/* Card Details */}
            <div className="mt-6 text-center hidden">
              <h4 className="text-xl font-bold text-gray-800 mb-2">VIP Access Card</h4>
              <p className="text-gray-600 mb-4">Premium seating, priority service, and exclusive access</p>
              <button
                onClick={() => handleDownload('vip')}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-full hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Download VIP Card
              </button>
            </div>
          </div>

          {/* Guest Access Card */}
          <div className="group perspective-1000">
            <div className="relative w-full h-64 transform-style-preserve-3d transition-transform duration-700 group-hover:rotate-y-12">
              {/* Card Front */}
              <div className="absolute inset-0 w-full h-full backface-hidden">
                <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 border-2 border-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white rounded-full"></div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <CreditCard className="w-8 h-8 text-white" />
                        <QrCode className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">GUEST ACCESS</h3>
                      <p className="text-white/90 text-sm">General Admission</p>
                    </div>
                    
                    <div>
                      <div className="mb-3">
                        <p className="text-white/80 text-xs uppercase tracking-wider">Wedding Event</p>
                        <p className="text-white font-semibold">Oluwapelumi & Oluwaseun</p>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-white/80 text-xs">Valid Until</p>
                          <p className="text-white font-mono">06/15/25</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/80 text-xs">Card Type</p>
                          <p className="text-white font-bold">STANDARD</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chip */}
                  <div className="absolute top-16 left-6 w-12 h-8 bg-white/20 rounded-md border border-white/30"></div>
                </div>
              </div>
            </div>
            
            {/* Card Details */}
            <div className="mt-6 text-center hidden">
              <h4 className="text-xl font-bold text-gray-800 mb-2">Guest Access Card</h4>
              <p className="text-gray-600 mb-4">General admission with full access to the celebration</p>
              <button
                onClick={() => handleDownload('guest')}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold rounded-full hover:from-indigo-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Guest Card
              </button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-16 text-center bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">How to Use Your Access Card</h3>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-600 font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Download</h4>
                <p className="text-gray-600 text-sm">Click the download button to save your access card to your device.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-600 font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Present</h4>
                <p className="text-gray-600 text-sm">Show your digital or printed card at the venue entrance.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-600 font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Enjoy</h4>
                <p className="text-gray-600 text-sm">Enter the venue and enjoy our special celebration!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccessCards;