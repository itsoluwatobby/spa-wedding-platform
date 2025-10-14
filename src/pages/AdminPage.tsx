import { useState, useEffect } from 'react';
import { Search, ArrowUpDown, ArrowUp, ArrowDown, Users, LoaderIcon } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { initState } from '../utils/constants';
import TableHead from '../components/Admin/table/TableHead';
import PreviewModal from '../components/Admin/table/PreviewModal';
import { AdminPanel } from '../components/Admin/table/AdminPanel';
import { Heading } from '../components/Admin/Heading';
import TableBody from '../components/Admin/table/Tablebody';
import { toast } from 'react-toastify';


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
   const [appStateDelete, setAppStateDelete] = useState(initState);

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
          const data = await res.json() as SuccessResponse<{ docs: RSVPProps[] }>;
          if (data.data) {
            setRsvps(data.data.docs);
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
      rsvp.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      rsvp.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      rsvp.phone.toString().includes(debouncedSearchTerm) ||
      rsvp.cardId.toString().includes(debouncedSearchTerm)
    );

    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'cardId':
          aValue = a.cardId;
          bValue = b.cardId;
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'guests':
          aValue = +a.guests;
          bValue = +b.guests;
          break;
        default:
          aValue = a.cardId;
          bValue = b.cardId;
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
  
  const { isLoading: isDeleteLoading } = appStateDelete;

  const handleDelete = async (id: string) => {
    if (isDeleteLoading || !id) return;

    setAppStateDelete((prev) => ({ ...prev, isLoading: true }));
    try {
      await fetch(`${import.meta.env.VITE_BASE_URL}/delete/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const others = filteredRsvps.filter((rsvp) => rsvp._id !== id);
      setFilteredRsvps(others);

    } catch(err: any) {
      setAppStateDelete((prev) => ({ ...prev, error: err.Message }));
      toast.error(err.message);
    } finally {
      setAppStateDelete((prev) => ({ ...prev, isLoading: false }));
    }
  };

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
                  <TableBody 
                    key={rsvp.cardId}
                    rsvp={rsvp}
                    openModal={openModal}
                    handleDelete={handleDelete}
                    isDeleteLoading={isDeleteLoading}
                  />
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