import React, {  useState } from 'react';
import { Send, Heart, User, Phone, Users, MessageSquare, LoaderIcon, MailIcon } from 'lucide-react';
import { generateDeviceFingerprint, sanitizeEntries } from '../utils/helpers';
import { toast } from 'react-toastify';

const initAppState = { isLoading: false, error: '' };

const initFormData = {
  name: '',
  phone: '',
  email: '',
  guests: '1',
  message: '',
  attending: ''
};

const RSVP = () => {
  const [appState, setAppState] = useState<typeof initAppState>(initAppState);
  const [formData, setFormData] = useState(initFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading } = appState;

  const { message, email, phone, ...others } = formData;

  const anyOfPhoneOrEmail = [phone, email].some(Boolean)
  const canSubmit = [...Object.values(others), anyOfPhoneOrEmail].every(Boolean);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await fetch('https://audio-book-server.onrender.com/api/v1/sheet/fetch', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //       })
  //       const data = await res.json();
  //       console.log(data);
  //     } catch(err: any) {
  //       console.log(err.message)
  //     }
  //   })();
  // }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !canSubmit) return;

    setAppState(prev => ({ ...prev, isLoading: true }));
    try {
      const date = new Intl.DateTimeFormat('en-us', {
        dateStyle: 'medium'
      }).format(new Date())
      let newEntry = {
        date: date,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        attending: formData.attending,
        guests: formData.guests,
        message: formData.message,
        deviceFingerprint: generateDeviceFingerprint(),
      };

      newEntry = sanitizeEntries(newEntry);
      await fetch('https://audio-book-server.onrender.com/api/v1/sheet/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEntry),
      })

      const files = [
        '/images/invitation_card.png',
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
      toast.success('Response recorded, Please print your Invitation Card');
      setFormData(initFormData);
      setIsSubmitted(true);
    }
    catch (error: any) {
      console.log(error.message)
      setAppState(prev => ({ ...prev, error: '' }));
      toast.error('Fail to submit')
    }
    finally {
      setAppState(prev => ({ ...prev, isLoading: false }));
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <section id="rsvp" className="py-20 bg-gradient-to-br from-yellow-50 to-white w-full">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl border-2 border-yellow-300">
            <Heart className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-bounce" />
            <h2 className="text-4xl font-serif text-gray-800 mb-6">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-4">
              Your RSVP has been received successfully.
            </p>
            <p className="text-gray-600">
              We can't wait to celebrate with you on our special day!
            </p>
            <p className="text-gray-600 font-medium mt-4">
              Invitation and access cards have been downloaded to your device. If not found, please download from the sections above.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-8 text-yellow-500 hover:text-yellow-600 font-semibold"
            >
              Submit Another RSVP
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-20 bg-gradient-to-br from-yellow-50 to-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-gray-800 mb-6">RSVP</h2>
          <p className="text-xl max-xxs:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Please let us know if you'll be joining us for our special day. 
            Your response is greatly appreciated!
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 max-xxs:p-5 md:p-12 border-2 border-yellow-300">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Attendance Radio Buttons */}
            <div className="text-center">
              <h3 className="text-2xl max-xxs:text-xl font-serif text-gray-800 mb-6">Will you be attending?</h3>
              <div className="flex justify-center space-x-8">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="attending"
                    value="YES"
                    checked={formData.attending === 'YES'}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-yellow-500 focus:ring-yellow-400"
                    required
                  />
                  <span className="text-lg max-xxs:text-sm font-medium text-gray-700">Yes, I'll be there!</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="attending"
                    value="NO"
                    checked={formData.attending === 'NO'}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-yellow-500 focus:ring-yellow-400"
                    required
                  />
                  <span className="text-lg max-xxs:text-sm font-medium text-gray-700">Sorry, can't make it</span>
                </label>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="flex items-center space-x-2 text-gray-700 font-medium mb-3">
                  <User className="w-5 h-5 text-yellow-500" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-yellow-400 focus:outline-none transition-colors duration-200"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="flex items-center space-x-2 text-gray-700 font-medium mb-3">
                  <Phone className="w-5 h-5 text-yellow-500" />
                  <span>Phone Number *</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  // required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-yellow-400 focus:outline-none transition-colors duration-200"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="flex items-center space-x-2 text-gray-700 font-medium mb-3">
                <MailIcon className="w-5 h-5 text-yellow-500" />
                <span>Email *</span>
              </label>
              <input
                type="tel"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                // required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-yellow-400 focus:outline-none transition-colors duration-200"
                placeholder="johndoe@gmail.com"
              />
            </div>

            <div className='max-xxs:text-base'>
              <label htmlFor="guests" className="flex items-center space-x-2 text-gray-700 font-medium mb-3">
                <Users className="w-5 h-5 text-yellow-500" />
                <span>Number of Guests (including yourself) *</span>
              </label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-yellow-400 focus:outline-none transition-colors duration-200"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                {/* <option value="5">5 Guests</option>
                <option value="6">6+ Guests</option> */}
              </select>
            </div>

            <div className='max-xxs:text-base'>
              <label htmlFor="message" className="flex items-center space-x-2 text-gray-700 font-medium mb-3">
                <MessageSquare className="w-5 h-5 text-yellow-500" />
                <span>Special Message (Optional)</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-yellow-400 focus:outline-none transition-colors duration-200 resize-none"
                placeholder="Share your excitement, dietary restrictions, or any special notes..."
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={!canSubmit || isLoading}
                className="inline-flex items-center space-x-3 disabled:bg-yellow-800 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Send className="w-6 h-6" />
                <span>Send RSVP</span>
                {isLoading ? <LoaderIcon className='animate-spin duration-300 transition-all' /> : null}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RSVP;