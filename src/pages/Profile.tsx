import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCars } from '../data';
import { useAuth } from '../context/AuthContext';
import { Car as CarType } from '../types';
import {
  User,
  Mail,
  Shield,
  Car,
  Calendar,
  Eye,
  Edit3,
  Package,
  TrendingUp,
} from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const [cars, setCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getCars();
        // Show user's cars (or all for admin)
        const filtered = user?.role === 'admin'
          ? data
          : data.filter((c) => c.sellerId === user?.id);
        setCars(filtered);
      } catch {
        // handle
      } finally {
        setLoading(false);
      }
    }
    if (user) load();
  }, [user]);

  if (!user) return null;

  const totalValue = cars.reduce((sum, c) => sum + c.price, 0);

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                {user.role === 'admin' && (
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-md uppercase">
                    Admin
                  </span>
                )}
                {user.role === 'user' && (
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-md uppercase">
                    User
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  {user.role === 'admin' ? 'Full Access' : 'Standard Access'}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              {user.role === 'admin' && (
                <Link
                  to="/dashboard"
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg border border-gray-700 transition-colors"
                >
                  Dashboard
                </Link>
              )}
              <Link
                to="/cars/create"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors"
              >
                + New Listing
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">My Listings</span>
              <Package className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">{cars.length}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Total Value</span>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Member Since</span>
              <Calendar className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">2024</p>
          </div>
        </div>

        {/* My Cars */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Car className="w-5 h-5 text-blue-400" />
            {user.role === 'admin' ? 'All Listings' : 'My Listings'}
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : cars.length === 0 ? (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
              <Car className="w-12 h-12 text-gray-700 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">No listings yet</h3>
              <p className="text-gray-400 mb-4">Start selling your car by creating a listing.</p>
              <Link
                to="/cars/create"
                className="inline-flex px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
              >
                Create Listing
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cars.map((car) => (
                <div
                  key={car.id}
                  className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden group hover:border-gray-700 transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-gray-800">
                    <img
                      src={car.image}
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-sm font-bold text-white">{car.make} {car.model}</h3>
                        <p className="text-xs text-gray-500">{car.year} · {car.mileage.toLocaleString()} mi</p>
                      </div>
                      <p className="text-sm font-bold text-blue-400">${car.price.toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Link
                        to={`/cars/${car.id}`}
                        className="flex-1 flex items-center justify-center gap-1 py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded-lg transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        View
                      </Link>
                      <Link
                        to={`/cars/${car.id}/edit`}
                        className="flex-1 flex items-center justify-center gap-1 py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded-lg transition-colors"
                      >
                        <Edit3 className="w-3 h-3" />
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
