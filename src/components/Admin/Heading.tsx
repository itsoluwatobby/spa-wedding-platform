import { RefreshCw } from "lucide-react";

type HeadingProps = {
  isLoading: boolean;
  rsvps: RSVPProps[];
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: () => void;
}
export const Heading: React.FC<HeadingProps> = (
  { isLoading, rsvps, refresh, setIsAuthenticated }
) => {

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">RSVP Management</h1>
          <p className="text-gray-600">
            Total RSVPs: <span className="font-semibold">{rsvps.length}</span> | 
            Attending: <span className="font-semibold text-green-600">
              {rsvps.filter(r => r.Attending === "YES").length}
            </span> | 
            Not Attending: <span className="font-semibold text-red-600">
              {rsvps.filter(r => r.Attending === "NO").length}
            </span>
          </p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <button
            onClick={refresh}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className={`${isLoading ? 'animate-spin' : 'animate-none'} duration-500 w-4 h-4`} />
            <span>Reload</span>
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}