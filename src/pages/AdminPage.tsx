import React, { useState, useEffect } from 'react';
import { Search, ArrowUpDown, ArrowUp, ArrowDown, Users, Calendar, Phone, Mail, MessageSquare, Eye, EyeOff } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { initState } from '../utils/constants';


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
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const ADMIN_PASSWORD = 'wedding2025'; // In production, this should be more secure

  const [appState, setAppState] = useState(initState);

  const { isLoading, reload } = appState;

  // const refetch = () => setAppState((prev) => ({ ...prev, reload: prev.reload + 1 }));

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAttendingBadge = (attending: string) => {
    if (attending === 'yes') {
      return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Attending</span>;
    } else {
      return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Not Attending</span>;
    }
  };

  const getTraditionalWearBadge = (value: string, type: 'fila' | 'gele') => {
    if (!value) return <span className="text-gray-400 text-xs">Not specified</span>;
    
    const colors = {
      yes: 'bg-blue-100 text-blue-800',
      no: 'bg-gray-100 text-gray-800',
      maybe: 'bg-yellow-100 text-yellow-800'
    };

    const labels = {
      yes: type === 'fila' ? 'Will wear fila' : 'Will wear gele',
      no: type === 'fila' ? 'No fila' : 'No gele',
      maybe: 'Maybe'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[value as keyof typeof colors]}`}>
        {labels[value as keyof typeof labels]}
      </span>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-yellow-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Access</h1>
            <p className="text-gray-600">Enter password to view RSVP data</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors duration-200 pr-12"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-3 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 transform hover:scale-105"
            >
              Access Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
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
            <button
              onClick={() => setIsAuthenticated(false)}
              className="mt-4 md:mt-0 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

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
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Card ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fila</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gele</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRsvps.map((rsvp) => (
                  <tr key={rsvp.CardId} className="hover:bg-gray-50 transition-colors duration-150">
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
                      {getAttendingBadge(rsvp.Attending)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{rsvp.Guests}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getTraditionalWearBadge(rsvp.Fila, 'fila')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getTraditionalWearBadge(rsvp.Gele, 'gele')}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRsvps.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No RSVPs found</h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try adjusting your search terms.' : 'No RSVPs have been submitted yet.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;