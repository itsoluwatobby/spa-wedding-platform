import { Eye, EyeOff, Users } from "lucide-react";
import React, { useState } from "react";

type AdminPanelProps = {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ setIsAuthenticated }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };
  
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