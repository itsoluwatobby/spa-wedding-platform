import { Heart, Calendar, MapPin, Phone, Mail } from 'lucide-react';

type FooterProps = {
  config: AppConfig;
}

const Footer = ({ config }: FooterProps) => {
  return (
    <footer className="bg-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <div className="mb-8">
            <Heart className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-3xl font-serif mb-4">{config.name}</h3>
            <p className="text-gray-300 text-lg mb-6">
              Thank you for being part of our love story
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12 mb-8">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-yellow-400" />
              <span>{config.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-yellow-400" />
              <span>Sunset Gardens, California</span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h4 className="text-xl font-serif mb-4 text-yellow-400">Need Help? Contact Us</h4>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-yellow-400" />
                <a href="tel:+1234567890" className="hover:text-yellow-400 transition-colors duration-200">
                  (123) 456-7890
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-yellow-400" />
                <a href="mailto:oluwapelumi.oluwaseun.wedding@email.com" className="hover:text-yellow-400 transition-colors duration-200">
                  oluwapelumi.oluwaseun.wedding@email.com
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-400">
              © 2025 {config.name}'s Wedding. Made with love for our special day.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;