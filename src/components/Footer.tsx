import { Heart, Calendar, MapPin, Phone, Mail } from 'lucide-react';

type FooterProps = {
  config: AppConfig;
}

const Footer = ({ config }: FooterProps) => {
  return (
    <footer className="bg-gray-800 text-white py-16 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <div className="mb-8">
            <Heart className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-3xl max-xxs:text-2xl font-serif mb-4">{config.name}</h3>
            <p className="text-gray-300 text-lg max-xxs:text-sm mb-6">
              Thank you for being part of our love story
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12 mb-8">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-yellow-400" />
              <span>{config.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <a
                href={config.location.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 group cursor-pointer"
                title="View location on Google Maps"
              >
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span className='max-xxs:text-base'>{config.location.address}</span>
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h4 className="text-xl max-xxs:text-lg font-serif mb-4 text-yellow-400">Need Help? Contact Us</h4>
            <div className="flex flex-col max-xxs:text-sm md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-8">
              <a href={`tel:${config.contacts.phone.first[1]}`} className="hover:text-yellow-50 transition-colors duration-200 flex items-center space-x-2">
                <span>{config.contacts.phone.first[0]}</span>
                <Phone className="w-4 h-4 text-yellow-400" />
                <span>{config.contacts.phone.first[1]}</span>
              </a>
              <div className="hidden md:block w-px h-8 bg-yellow-400"></div>
              <a href={`tel:${config.contacts.phone.second[1]}`} className="hover:text-yellow-50 transition-colors duration-200 flex items-center space-x-2">
                <span>{config.contacts.phone.second[0]}</span>
                <Phone className="w-4 h-4 text-yellow-400" />
                <span>{config.contacts.phone.second[1]}</span>
              </a>

              <div className="hidden flexitems-center space-x-2">
                <Mail className="w-4 h-4 text-yellow-400" />
                <a href="mailto:oluwapelumi.oluwaseun.wedding@email.com" className="hover:text-yellow-400 transition-colors duration-200">
                  oluwapelumi.oluwaseun.wedding@email.com
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-400 max-xxs:text-sm">
              © 2025 {config.name}'s Wedding. Made with love for our special day.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;