import { useState, useEffect } from 'react';
import { Search, ArrowUpDown, ArrowUp, ArrowDown, Users, Calendar, Phone, Mail, MessageSquare, Eye, LoaderIcon } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { initState } from '../utils/constants';
import TableHead from '../components/Admin/table/TableHead';
import { formatDate } from '../utils/helpers';
import { GetAttendingBadge, GetTraditionalWearBadge } from '../components/Admin/table/Components';
import PreviewModal from '../components/Admin/table/PreviewModal';
import { AdminPanel } from '../components/Admin/table/AdminPanel';
import { Heading } from '../components/Admin/Heading';


type SortField = 'cardId' | 'name' | 'guests';
type SortDirection = 'asc' | 'desc';

const AdminPage = () => {
  const [rsvps, setRsvps] = useState<RSVPProps[]>([]);
  const [filteredRsvps, setFilteredRsvps] = useState<RSVPProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [sortField, setSortField] = useState<SortField>('cardId');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedRsvp, setSelectedRsvp] = useState<RSVPProps | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [appState, setAppState] = useState(initState);

  const { isLoading, reload } = appState;

  const refetch = () => setAppState((prev) => ({ ...prev, reload: prev.reload + 1 }));

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        setAppState((prev) => ({ ...prev, isLoading: true }));
        try {
          const res = await fetch(`${import.meta.env.VITE_BASE_URL}/fetch`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          })
          const data = await res.json() as SuccessResponse<RSVPProps[]>;
          if (data.data) {
            console.log(data.data)
            setRsvps(data.data);
          }
        } catch(err: any) {
          console.log(err.Message);
          setAppState((prev) => ({ ...prev, error: err.Message }));
        } finally {
          setAppState((prev) => ({ ...prev, isLoading: false }));
        }
      })();
    }
  }, [isAuthenticated, reload]);

  useEffect(() => {
    filterAndSortRSVPs();
  }, [rsvps, debouncedSearchTerm, sortField, sortDirection]);

  const filterAndSortRSVPs = () => {
    let filtered = rsvps.filter(rsvp =>
      rsvp.Name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      rsvp.Email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      rsvp.Phone.toString().includes(debouncedSearchTerm) ||
      rsvp.CardId.toString().includes(debouncedSearchTerm)
    );

    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'cardId':
          aValue = a.CardId;
          bValue = b.CardId;
          break;
        case 'name':
          aValue = a.Name.toLowerCase();
          bValue = b.Name.toLowerCase();
          break;
        case 'guests':
          aValue = +a.Guests;
          bValue = +b.Guests;
          break;
        default:
          aValue = a.CardId;
          bValue = b.CardId;
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredRsvps(filtered);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4" />;
    }
    return sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />;
  };

  const openModal = (rsvp: RSVPProps) => {
    setSelectedRsvp(rsvp);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedRsvp(null);
    setShowModal(false);
  };

  if (!isAuthenticated) {
    return (
      <AdminPanel 
        setIsAuthenticated={setIsAuthenticated}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <Heading 
          isLoading={isLoading}
          rsvps={rsvps}
          refresh={refetch}
          setIsAuthenticated={setIsAuthenticated} 
        />

        {/* Search and Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone, or card ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors duration-200"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleSort('cardId')}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl border-2 transition-colors duration-200 ${
                  sortField === 'cardId' 
                    ? 'border-yellow-400 bg-yellow-50 text-yellow-700' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span>Card ID</span>
                {getSortIcon('cardId')}
              </button>
              <button
                onClick={() => handleSort('name')}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl border-2 transition-colors duration-200 ${
                  sortField === 'name' 
                    ? 'border-yellow-400 bg-yellow-50 text-yellow-700' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span>Name</span>
                {getSortIcon('name')}
              </button>
              <button
                onClick={() => handleSort('guests')}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl border-2 transition-colors duration-200 ${
                  sortField === 'guests' 
                    ? 'border-yellow-400 bg-yellow-50 text-yellow-700' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span>Guests</span>
                {getSortIcon('guests')}
              </button>
            </div>
          </div>
        </div>

        {/* RSVP Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              
              <TableHead />

              <tbody className="bg-white divide-y divide-gray-200">
                {!isLoading && filteredRsvps?.map((rsvp) => (
                  <tr key={rsvp.CardId} className="hover:bg-gray-50 transition-colors duration-150 cursor-default">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono text-gray-900">#{rsvp.CardId}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{formatDate(rsvp.Date)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{rsvp.Name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-3 h-3 mr-1" />
                          {rsvp.Email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-3 h-3 mr-1" />
                          {rsvp.Phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <GetAttendingBadge attending={rsvp.Attending} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{rsvp.Guests}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <GetTraditionalWearBadge value={rsvp.Fila} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <GetTraditionalWearBadge value={rsvp.Gele} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        {rsvp.Message ? (
                          <div className="flex items-start">
                            <MessageSquare className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600 line-clamp-3">{rsvp.Message}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400 italic">No message</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => openModal(rsvp)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {
            isLoading ?
            <div className='text-center py-12'>
              <div className='w-12 h-12 text-gray-500 mx-auto mb-4'>
                <LoaderIcon size={32} className='animate-spin duration-500' />
              </div>
            </div>
            : filteredRsvps.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No RSVPs found</h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try adjusting your search terms.' : 'No RSVPs have been submitted yet.'}
              </p>
            </div>
          ) : null}
        </div>
      </div>
      {
        showModal && selectedRsvp 
          ? <PreviewModal selectedRsvp={selectedRsvp} closeModal={closeModal} /> 
          : null
      }
    </div>
  );
};

export default AdminPage;