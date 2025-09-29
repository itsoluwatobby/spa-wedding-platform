import React from 'react';
import { Download, Heart } from 'lucide-react';

type InvitationProps = {
  googleMapsLink: string;
}
const Invitation: React.FC<InvitationProps> = ({ googleMapsLink }) => {

  return (
    <section id="invitation" className="py-20 bg-gradient-to-br from-white to-amber-50 w-full">
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

        <div className="max-w-2xl mx-auto flex flex-col gap-10">
          <div className="bg-white rounded-2xl shadow-2xl p-2 py-4 md:p-3 border-4 border-amber-400 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-yellow-400"></div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-yellow-400"></div>
            <a
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 group cursor-pointer"
                title="View location on Google Maps"
              >
                <img src="/images/invitation_card.png" alt="oluwapelumi&oluwaseun IV" 
                  className='object-cover h-full w-full rounded-2xl'
                  />
              </a>
          </div>
          <a
            download
            href='/images/invitation_card.png'
            className="self-center inline-flex justify-center items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold rounded-full hover:from-amber-600 hover:to-yellow-600 transform max-sm:w-[70%] hover:scale-105 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Invitation
          </a>
        </div>
      </div>
    </section>
  );
};

export default Invitation;