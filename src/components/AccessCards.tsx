import { CreditCard, Download } from 'lucide-react';

const AccessCards = () => {
  const handleDownload = () => {
    const files = [
      '/images/access_card_front.png',
      '/images/access_card_back.png'
    ];

    files.forEach(file => {
      if (file) {
        const anchor = document.createElement('a');
        anchor.href = file;
        anchor.download = file.split('/').pop() ?? "";
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      }
    });
  };

  return (
    <section id="access-cards" className="transition-all py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <CreditCard className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-6">Access Cards</h2>
          <p className="text-xl max-xxs:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Download the access card for our special day. Present these at the venue for entry.
          </p>
        </div>

        <div className='flex flex-col gap-8 w-full itemscenter'>
          <div className="grid md:grid-cols-2 gap-8 max-w4xl w-full place-items-center">
            <img
              src="/images/access_card_front.png"
              alt="Wedding Background"
              className="w-full h-full object-cover max-md:w-[50vw] max-xs:w-[85%]"
            />
            
            <img
              src="/images/access_card_back.png"
              alt="Wedding Background"
              className="w-full h-full object-cover max-md:w-[50vw] max-xs:w-[85%]"
            />
            
          </div>
  
          <div className="mt-6 text-center ">
            <h4 className="text-xl font-bold text-gray-800 mb-2">Access Card</h4>
            <p className="text-gray-600 mb-4">Access card need to be presented to gain entry</p>
            <button
              onClick={handleDownload}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-full hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Card
            </button>
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