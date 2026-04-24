import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Car,
  Menu,
  X,
  LogOut,
  User,
  Plus,
  LayoutDashboard,
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/');
  };

  const isActive = (path: string) =>
    location.pathname === path
      ? 'text-blue-400 font-semibold'
      : 'text-gray-300 hover:text-white';

  return (
    <nav className="bg-gray-900/95 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Auto<span className="text-blue-400">Elite</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${isActive('/')}`}
            >
              Home
            </Link>
            <Link
              to="/cars"
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${isActive('/cars')}`}
            >
              Browse Cars
            </Link>
            {isAuthenticated && (
              <Link
                to="/cars/create"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors ${isActive('/cars/create')}`}
              >
                <Plus className="w-4 h-4" />
                Sell Car
              </Link>
            )}
            {isAuthenticated && user?.role === 'admin' && (
              <Link
                to="/dashboard"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors ${isActive('/dashboard')}`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            )}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {user?.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span>{user?.name}</span>
                  {user?.role === 'admin' && (
                    <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-400 text-[10px] font-bold rounded uppercase">
                      Admin
                    </span>
                  )}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {profileOpen && (
                  <>
                    <div
                      className="fixed inset-0"
                      onClick={() => setProfileOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-xl border border-gray-700 shadow-xl overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-700">
                        <p className="text-sm font-medium text-white">{user?.name}</p>
                        <p className="text-xs text-gray-400">{user?.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          <User className="w-4 h-4" />
                          My Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-3 space-y-1">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-gray-800"
            >
              Home
            </Link>
            <Link
              to="/cars"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-gray-800"
            >
              Browse Cars
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/cars/create"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  Sell Car
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  My Profile
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-gray-800"
                >
                  Sign Out
                </button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm text-blue-400 hover:bg-gray-800"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
