import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCarById, deleteCar } from '../data';
import { useAuth } from '../context/AuthContext';
import { Car as CarType } from '../types';
import {
  ArrowLeft,
  Fuel,
  Gauge,
  Calendar,
  Palette,
  Settings2,
  Car,
  Trash2,
  Edit3,
  User,
  MapPin,
  Phone,
  Mail,
  AlertTriangle,
} from 'lucide-react';

export default function CarDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [car, setCar] = useState<CarType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        if (!id) return;
        setLoading(true);
        const data = await getCarById(id);
        if (!data) {
          setError('Car not found');
        } else {
          setCar(data);
        }
      } catch {
        setError('Failed to load car details');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    setDeleting(true);
    try {
      await deleteCar(id);
      navigate('/cars');
    } catch {
      setError('Failed to delete car');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">{error || 'Car not found'}</h2>
          <p className="text-gray-400 mb-6">The car you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/cars"
            className="inline-flex px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
          >
            Browse Cars
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === car.sellerId;
  const isAdmin = user?.role === 'admin';

  const specs = [
    { icon: Calendar, label: 'Year', value: car.year.toString() },
    { icon: Fuel, label: 'Fuel', value: car.fuelType },
    { icon: Settings2, label: 'Transmission', value: car.transmission },
    { icon: Gauge, label: 'Mileage', value: `${car.mileage.toLocaleString()} mi` },
    { icon: Palette, label: 'Color', value: car.color },
    { icon: Car, label: 'Body Type', value: car.bodyType },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Image */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl overflow-hidden bg-gray-800">
              <img
                src={car.image}
                alt={`${car.make} ${car.model}`}
                className="w-full aspect-[16/10] object-cover"
              />
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="text-xl font-bold text-white mb-3">Description</h2>
              <p className="text-gray-400 leading-relaxed">{car.description}</p>
            </div>

            {/* Specs */}
            <div className="mt-6">
              <h2 className="text-xl font-bold text-white mb-4">Specifications</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="p-4 bg-gray-900 border border-gray-800 rounded-xl"
                  >
                    <spec.icon className="w-5 h-5 text-blue-400 mb-2" />
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{spec.label}</p>
                    <p className="text-sm font-semibold text-white mt-1">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price Card */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h1 className="text-2xl font-bold text-white mb-1">
                {car.make} {car.model}
              </h1>
              <p className="text-gray-500 mb-4">{car.year} · {car.bodyType}</p>
              <p className="text-4xl font-extrabold text-blue-400 mb-6">
                ${car.price.toLocaleString()}
              </p>

              {/* Actions */}
              {isAuthenticated ? (
                <div className="space-y-3">
                  <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    Contact Seller
                  </button>
                  <button className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl border border-gray-700 transition-colors flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors text-center"
                >
                  Sign In to Contact
                </Link>
              )}

              {(isOwner || isAdmin) && (
                <div className="mt-4 pt-4 border-t border-gray-700 space-y-2">
                  <Link
                    to={`/cars/${car.id}/edit`}
                    className="w-full py-2.5 flex items-center justify-center gap-2 text-sm bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Listing
                  </Link>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full py-2.5 flex items-center justify-center gap-2 text-sm bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Listing
                  </button>
                </div>
              )}
            </div>

            {/* Seller Info */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
                Seller Information
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{car.sellerName}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <MapPin className="w-3 h-3" />
                    Verified Seller
                  </div>
                </div>
              </div>
            </div>

            {/* Posted */}
            <div className="text-sm text-gray-500">
              Posted on {new Date(car.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Delete Listing</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete this <strong className="text-white">{car.make} {car.model}</strong> listing? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-colors disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
