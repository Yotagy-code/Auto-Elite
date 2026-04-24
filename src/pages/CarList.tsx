import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getCars } from '../data';
import { Car as CarType } from '../types';
import { Search, SlidersHorizontal, Fuel, Gauge, Calendar, X } from 'lucide-react';

const bodyTypes = ['All', 'Sedan', 'Coupe', 'SUV', 'Hatchback', 'Truck'];
const fuelTypes = ['All', 'Petrol', 'Diesel', 'Electric', 'Hybrid'];
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'mileage-asc', label: 'Mileage: Low to High' },
];

export default function CarList() {
  const [cars, setCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [bodyType, setBodyType] = useState('All');
  const [fuelType, setFuelType] = useState('All');
  const [sort, setSort] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getCars();
        setCars(data);
      } catch {
        setError('Failed to load cars. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    let result = [...cars];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.make.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q) ||
          c.color.toLowerCase().includes(q) ||
          c.year.toString().includes(q)
      );
    }

    if (bodyType !== 'All') {
      result = result.filter((c) => c.bodyType === bodyType);
    }

    if (fuelType !== 'All') {
      result = result.filter((c) => c.fuelType === fuelType);
    }

    switch (sort) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'mileage-asc':
        result.sort((a, b) => a.mileage - b.mileage);
        break;
    }

    return result;
  }, [cars, search, bodyType, fuelType, sort]);

  const activeFilters = [bodyType !== 'All' ? bodyType : '', fuelType !== 'All' ? fuelType : ''].filter(Boolean);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading cars...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-white mb-2">Browse Cars</h1>
          <p className="text-gray-400">
            {filtered.length} car{filtered.length !== 1 ? 's' : ''} available
          </p>

          {/* Search & Filter Bar */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search by make, model, color, year..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl border transition-colors ${
                showFilters
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
              {activeFilters.length > 0 && (
                <span className="w-5 h-5 bg-blue-500 rounded-full text-xs flex items-center justify-center">
                  {activeFilters.length}
                </span>
              )}
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Body Type</label>
                  <div className="flex flex-wrap gap-2">
                    {bodyTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setBodyType(type)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          bodyType === type
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Fuel Type</label>
                  <div className="flex flex-wrap gap-2">
                    {fuelTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setFuelType(type)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          fuelType === type
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {activeFilters.length > 0 && (
                <button
                  onClick={() => {
                    setBodyType('All');
                    setFuelType('All');
                  }}
                  className="mt-4 text-sm text-blue-400 hover:text-blue-300"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Car Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No cars found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search or filter criteria.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setBodyType('All');
                setFuelType('All');
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((car) => (
              <Link
                key={car.id}
                to={`/cars/${car.id}`}
                className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden bg-gray-800">
                  <img
                    src={car.image}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        {car.make} {car.model}
                      </h3>
                      <p className="text-sm text-gray-500">{car.year}</p>
                    </div>
                    <p className="text-xl font-bold text-blue-400">
                      ${car.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-800 rounded-md text-xs text-gray-400">
                      <Fuel className="w-3 h-3" />
                      {car.fuelType}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-800 rounded-md text-xs text-gray-400">
                      <Gauge className="w-3 h-3" />
                      {car.mileage.toLocaleString()} mi
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-800 rounded-md text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {car.bodyType}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{car.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
