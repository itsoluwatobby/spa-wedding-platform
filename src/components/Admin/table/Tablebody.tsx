import { Calendar, Download, Eye, Loader2Icon, Mail, MessageSquare, Phone, Trash2Icon, Users } from "lucide-react";
import { formatDate } from "../../../utils/helpers";
import { GetAttendingBadge, GetTraditionalWearBadge } from "./Components";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import AccessCards from "../../AccessCards";


type TableBodyProps = {
  rsvp: RSVPProps;
  openModal: (rsvp: RSVPProps) => void;
  handleDelete: (id: string) => void;
  isDeleteLoading: boolean;
}

const TableBody: React.FC<TableBodyProps> = ({ rsvp, openModal, handleDelete, isDeleteLoading }) => {
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const hiddenCardRef = useRef<HTMLDivElement>(null);

  const deleteRSVP = async (id: string) => {
    setId(id);
    await handleDelete(id);
  }

  const downloadAccessCard = async () => {
    setLoading(true);
    if (!hiddenCardRef.current) return;

    try {
      const canvas = await html2canvas(hiddenCardRef.current);
      const image = canvas.toDataURL('image/png');
      // Use the image (e.g., download or display)
      const link = document.createElement('a');
      link.href = image;
      link.download = `${rsvp.name.replace(/\s+/g, "_")}_access_card.png`;
      link.click();
    } catch (err: any) {
      console.error("Failed to generate access card:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
        <td className="p-4 whitespace-nowrap">
          <div className="text-sm font-mono text-gray-900 bg-gray-50 px-2 py-1 rounded">
            {rsvp.seats.join(" | ") || 'Not assigned'}
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
          {/* <div className="">
            <AccessCards data={rsvp} hasSubmitted={true} />
          </div> */}
        </td>
        <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
          <button
            onClick={downloadAccessCard}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
          >
            {
              loading ?
              <Loader2Icon size={10} />
              : <Download className="w-4 h-4 mr-1" />
            }
            Card
          </button>
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

    {/* Hidden Access Card for downloading - rendered off-screen */}
      <div
        className="max-w-6xl"
        ref={hiddenCardRef}
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          // width: "400px", // Set desired card width
          padding: "20px",
          background: "lightgray",
        }}
      >
        <AccessCards data={rsvp} hasSubmitted={true} show={false} />
      </div>
    </>
  )
}
export default TableBody;
