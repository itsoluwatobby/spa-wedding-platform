import { Calendar, Eye, Mail, MessageSquare, Phone, Trash2Icon, Users } from "lucide-react";
import { formatDate } from "../../../utils/helpers";
import { GetAttendingBadge, GetTraditionalWearBadge } from "./Components";
import { useState } from "react";


type TableBodyProps = {
  rsvp: RSVPProps;
  openModal: (rsvp: RSVPProps) => void;
  handleDelete: (id: string) => void;
  isDeleteLoading: boolean;
}

const TableBody: React.FC<TableBodyProps> = ({ rsvp, openModal, handleDelete, isDeleteLoading }) => {
  const [id, setId] = useState<string | null>(null);

  const deleteRSVP = async (id: string) => {
    setId(id);
    await handleDelete(id);
  }

  return (
    <tr className={`hover:bg-gray-50 transition-colors duration-150 cursor-default ${rsvp._id === id && isDeleteLoading ? "animate-pulse" : "animate-none"}`}>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-mono text-gray-900">#{rsvp.cardId}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-900">{formatDate(rsvp.date)}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{rsvp.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="space-y-1">
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="w-3 h-3 mr-1" />
            {rsvp.email}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="w-3 h-3 mr-1" />
            {rsvp.phone}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <GetAttendingBadge attending={rsvp.attending} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Users className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-sm font-medium text-gray-900">{rsvp.guests}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-mono text-gray-900 bg-gray-50 px-2 py-1 rounded">
          {rsvp.seats.join(",") || 'Not assigned'}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <GetTraditionalWearBadge value={rsvp.fila} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <GetTraditionalWearBadge value={rsvp.gele} />
      </td>
      <td className="px-6 py-4">
        <div className="max-w-xs">
          {rsvp.message ? (
            <div className="flex items-start">
              <MessageSquare className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-600 line-clamp-3">{rsvp.message}</span>
            </div>
          ) : (
            <span className="text-sm text-gray-400 italic">No message</span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
        <button
          onClick={() => openModal(rsvp)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
        >
          <Eye className="w-4 h-4 mr-1" />
          View
        </button>
        <button
          onClick={() => deleteRSVP(rsvp._id)}
          className="grid place-content-center px-3 py-2 border-none shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-red-600 hover:bg-red-500 focus:outline-none transition-colors duration-200 active:scale-[1.02]"
        >
          <Trash2Icon className="w-4 h-4 mr-1 text-white" />
        </button>
      </td>
    </tr>
  )
}
export default TableBody;
