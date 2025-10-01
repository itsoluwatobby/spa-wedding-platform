import { useEffect, useRef, useState } from 'react';
import { Heart, Copy, QrCode, X, DollarSign, Building2 } from 'lucide-react';
import { AccountDetails } from '../utils/constants';

const Contributions = () => {
  const [showQRModal, setShowQRModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedInfo, setCopiedInfo] = useState(false);
  const [copiedBank1, setCopiedBank1] = useState(false);
  const [copiedBank2, setCopiedBank2] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null)

  const zelleEmail = 'akinolaoluwaseun51@gmail.com';
  const recipientName = 'Akinola Oluwaseun Moses';

  useEffect(() => {
    const handleModalToggleOff = (event: any) => {
      if (!modalRef.current) return;
      if (!modalRef.current.contains(event.target)) {
        setShowQRModal(false);
      }
    }
    document.addEventListener('mousedown', handleModalToggleOff);

    return () => {
      document.removeEventListener('mousedown', handleModalToggleOff);
    }
  }, [modalRef])

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

  const copyBankDetails = async (bankKey: 'bank1' | 'bank2') => {
    const bank = AccountDetails[bankKey];
    const details = `Bank: ${bank.bankName}\nAccount Name: ${bank.accountName}\nAccount Number: ${bank.accountNumber}`;
    await navigator.clipboard.writeText(details);
    
    if (bankKey === 'bank1') {
      setCopiedBank1(true);
      setTimeout(() => setCopiedBank1(false), 2000);
    } else {
      setCopiedBank2(true);
      setTimeout(() => setCopiedBank2(false), 2000);
    }
  };

  const copyZelleInfo = () => {
    const info = `Email: ${zelleEmail}\nRecipient: ${recipientName}`;
    copyToClipboard(info, 'info');
  };

  return (
    <section id="gifts" className="py-20 bg-gradient-to-br from-amber-50 to-white">
      <div className="md:max-w-6xl mx-auto px-4 flex w-full flex-col gap-16 items-center">
        <div className="text-center flex flex-col gap-y-4 items-center">
          <Heart className="w-12 h-12 text-amber-600 mx-auto" />
          <h2 className="text-4xl font-bold text-gray-800">Wedding Gifts</h2>
          <p className="text-lg max-xxs:text-base text-gray-600 max-w-2xl mx-auto">
            Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a monetary gift, 
            we've made it easy and secure for you to do so.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 max-xxs:place-items-center">
          {/* Zelle Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 max-xxs:p-5 border border-amber-100 w-full max-xxs:w-[95%]">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Zelle</h3>
            </div>
            
            <div className="space-y-4 w-full">
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
                    onClick={copyZelleInfo}
                    className="px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center space-x-2"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copiedInfo ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Name</label>
                <div className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800">
                  {recipientName}
                </div>
              </div>

              <button
                onClick={() => setShowQRModal(true)}
                className="flex-1 w-full px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center space-x-2"
              >
                <QrCode className="w-4 h-4" />
                <span>Show QR</span>
              </button>

              <p className="text-sm text-gray-600 mt-4">
                Use your banking app to send money via Zelle, or scan the QR code for quick access to payment information.
              </p>
            </div>
          </div>

          {/* Bank Details Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-amber-100 w-full max-xxs:w-[95%]">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800">Nigerian Bank</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                <div className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 text-sm lg:text-base">
                  {AccountDetails.bank1.bankName}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                <div className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 text-sm lg:text-base">
                  {AccountDetails.bank1.accountName}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                <div className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 text-sm lg:text-base font-mono">
                  {AccountDetails.bank1.accountNumber}
                </div>
              </div>
            </div>

            <button
              onClick={() => copyBankDetails('bank1')}
              className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <Copy className="w-4 h-4" />
              <span>{copiedBank1 ? 'Copied!' : 'Copy Bank Details'}</span>
            </button>

            <p className="text-xs sm:text-sm text-gray-600 mt-4 text-center">
              Use these details for bank transfers within Nigeria
            </p>
          </div>

          {/* Bank Details 2 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-amber-100 w-full max-xxs:w-[95%]">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800">Alternative Bank</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                <div className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 text-sm lg:text-base">
                  {AccountDetails.bank2.bankName}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                <div className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 text-sm lg:text-base">
                  {AccountDetails.bank2.accountName}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                <div className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 text-sm lg:text-base font-mono">
                  {AccountDetails.bank2.accountNumber}
                </div>
              </div>
            </div>

            <button
              onClick={() => copyBankDetails('bank2')}
              className="w-full mt-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <Copy className="w-4 h-4" />
              <span>{copiedBank2 ? 'Copied!' : 'Copy Bank Details'}</span>
            </button>

            <p className="text-xs sm:text-sm text-gray-600 mt-4 text-center">
              Alternative bank option for your convenience
            </p>
          </div>

        </div>

        {/* Thank You Message */}
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 border border-amber-100">
          <Heart className="w-8 h-8 text-amber-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Thank You</h3>
          <p className="text-gray-600 max-w-2xl max-xxs:max-w-3xl mx-auto">
            Your love, support, and presence mean the world to us. Any contribution you make will help us start our new journey together. 
            We are truly grateful for your generosity and can't wait to celebrate with you!
          </p>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRModal ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 w-full">
          <div 
          ref={modalRef}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
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
      ) : null}
    </section>
  );
};

export default Contributions;