import { useState } from 'react';
import { Heart, Copy, QrCode, X, DollarSign } from 'lucide-react';

const Contributions = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'NGN'>('USD');
  const [customAmount, setCustomAmount] = useState('');
  const [showQRModal, setShowQRModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedInfo, setCopiedInfo] = useState(false);

  const zelleEmail = 'akinolaoluwaseun51@gmail.com';
  const recipientName = 'Akinola Oluwaseun Moses';

  const suggestedAmounts = {
    USD: [25, 50, 100, 200, 500],
    NGN: [10000, 25000, 50000, 100000, 200000]
  };

  const currencySymbol = selectedCurrency === 'USD' ? '$' : '₦';

  const copyToClipboard = (text: string, type: 'email' | 'info') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedInfo(true);
      setTimeout(() => setCopiedInfo(false), 2000);
    }
  };

  const copyZelleInfo = () => {
    const info = `Email: ${zelleEmail}\nRecipient: ${recipientName}`;
    copyToClipboard(info, 'info');
  };

  const handlePaystackPayment = () => {
    // Placeholder for Paystack integration
    alert(`Processing ${currencySymbol}${customAmount || '50'} payment via Paystack`);
  };

  return (
    <section id="gifts" className="py-20 bg-gradient-to-br from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <Heart className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Wedding Gifts</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a monetary gift, 
            we've made it easy and secure for you to do so.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Zelle Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Zelle</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={zelleEmail}
                    readOnly
                    className="flex-1 p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800"
                  />
                  <button
                    onClick={() => copyToClipboard(zelleEmail, 'email')}
                    className="px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center space-x-2"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Name</label>
                <div className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800">
                  {recipientName}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={copyZelleInfo}
                  className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedInfo ? 'Copied!' : 'Copy Info'}</span>
                </button>
                
                <button
                  onClick={() => setShowQRModal(true)}
                  className="flex-1 px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Show QR</span>
                </button>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                Use your banking app to send money via Zelle, or scan the QR code for quick access to payment information.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Bank Transfer Details</h3>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Bank Name</p>
                <p className="text-lg font-semibold text-gray-800">Your Bank Name</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Account Name</p>
                <p className="text-lg font-semibold text-gray-800">Your Account Name</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Account Number</p>
                <p className="text-lg font-semibold text-gray-800">Your Account Number</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Currency</p>
                <p className="text-lg font-semibold text-gray-800">NGN (₦)</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-6 text-center">
              Please make your payment to the account details above
            </p>
          </div>

          {/* Paystack Section */}
          <div className="bg-white hidden rounded-2xl shadow-lg p-8 border border-amber-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Paystack</h3>
            </div>

            {/* Currency Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Currency</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedCurrency('USD')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCurrency === 'USD'
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  USD ($)
                </button>
                <button
                  onClick={() => setSelectedCurrency('NGN')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCurrency === 'NGN'
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  NGN (₦)
                </button>
              </div>
            </div>

            {/* Suggested Amounts */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Suggested Amounts</label>
              <div className="grid grid-cols-3 gap-2">
                {suggestedAmounts[selectedCurrency].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setCustomAmount(amount.toString())}
                    className="p-3 border border-gray-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors text-center font-medium"
                  >
                    {currencySymbol}{amount.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Custom Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  {currencySymbol}
                </span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>

            <button
              onClick={handlePaystackPayment}
              disabled={!customAmount}
              className="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium text-lg"
            >
              Send Gift via Paystack ({currencySymbol}{customAmount || '0'})
            </button>

            <p className="text-sm text-gray-600 mt-4 text-center">
              Secure payment processing powered by Paystack
            </p>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 border border-amber-100">
          <Heart className="w-8 h-8 text-amber-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Thank You</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your love, support, and presence mean the world to us. Any contribution you make will help us start our new journey together. 
            We are truly grateful for your generosity and can't wait to celebrate with you!
          </p>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Scan QR Code</h3>
              
              {/* QR Code SVG */}
              <div className="bg-white rounded-lg border-2 border-gray-200 mb-6 inline-block">
                <img src="/images/zelle.png" alt="" className='object-cover w-full h-full' />
              </div>

              <div className="space-y-3 text-left">
                <div>
                  <p className="text-sm font-medium text-gray-700">Email:</p>
                  <p className="text-gray-900 font-mono text-sm">{zelleEmail}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Recipient:</p>
                  <p className="text-gray-900 text-sm">{recipientName}</p>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(zelleEmail, 'email')}
                className="mt-6 w-full px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Copy className="w-4 h-4" />
                <span>{copiedEmail ? 'Email Copied!' : 'Copy Email'}</span>
              </button>

              <p className="text-xs text-gray-500 mt-4">
                Scan with your banking app or copy the email address above
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contributions;