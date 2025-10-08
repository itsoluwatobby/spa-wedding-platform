import { Calendar, MessageSquare, User, Users, X } from "lucide-react";
import { formatDate } from "../../../utils/helpers";
import { GetAttendingBadge, GetTraditionalWearBadge } from "./Components";

type PreviewModalProps = {
  selectedRsvp: RSVPProps;
  closeModal: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ selectedRsvp, closeModal }) => {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">RSVP Details</h2>
            <p className="text-sm text-gray-500">Card ID: #{selectedRsvp.CardId}</p>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-yellow-500" />
              Basic Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <p className="text-gray-900 font-medium">{selectedRsvp.Name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <p className="text-gray-900">{selectedRsvp.Email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <p className="text-gray-900">{selectedRsvp.Phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Submission Date</label>
                <p className="text-gray-900">{formatDate(selectedRsvp.Date)}</p>
              </div>
            </div>
          </div>

          {/* Attendance Information */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-yellow-500" />
              Attendance Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attendance Status</label>
                <GetAttendingBadge attending={selectedRsvp.Attending} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-900 font-medium">{selectedRsvp.Guests}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Traditional Wear */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-5 h-5 mr-2 text-yellow-500">👔</span>
              Traditional Wear Preferences
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fila (Traditional Cap)</label>
                <GetTraditionalWearBadge value={selectedRsvp.Fila} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gele (Head Wrap)</label>
                <GetTraditionalWearBadge value={selectedRsvp.Fila} />
              </div>
            </div>
          </div>

          {/* Message */}
          {selectedRsvp.Message && (
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-yellow-500" />
                Special Message
              </h3>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-gray-700 leading-relaxed">{selectedRsvp.Message}</p>
              </div>
            </div>
          )}

          {/* Technical Information */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-5 h-5 mr-2 text-yellow-500">🔧</span>
              Technical Information
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Device Fingerprint</label>
              <p className="text-gray-900 font-mono text-sm bg-white px-3 py-2 rounded border">
                {selectedRsvp.DeviceFingerprint}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={closeModal}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default PreviewModal;