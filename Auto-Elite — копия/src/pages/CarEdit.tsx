import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById, updateCar } from '../data';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Save, Loader2, AlertTriangle } from 'lucide-react';

const makes = ['Audi', 'BMW', 'Ford', 'Mercedes-Benz', 'Porsche', 'Range Rover', 'Tesla', 'Toyota', 'Volkswagen', 'Honda', 'Lexus', 'Jaguar'];
const bodyTypes = ['Sedan', 'Coupe', 'SUV', 'Hatchback', 'Truck', 'Convertible', 'Wagon'];
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
const transmissions = ['Automatic', 'Manual', 'CVT'];
const colors = ['Black', 'White', 'Silver', 'Red', 'Blue', 'Gray', 'Green', 'Brown', 'Orange', 'Yellow'];

export default function CarEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    color: '',
    fuelType: '',
    transmission: '',
    bodyType: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        const car = await getCarById(id);
        if (!car) {
          setError('Car not found');
          return;
        }
        if (car.sellerId !== user?.id && user?.role !== 'admin') {
          setError('You do not have permission to edit this listing');
          return;
        }
        setForm({
          make: car.make,
          model: car.model,
          year: car.year,
          price: car.price,
          mileage: car.mileage,
          color: car.color,
          fuelType: car.fuelType,
          transmission: car.transmission,
          bodyType: car.bodyType,
          description: car.description,
          image: car.image,
        });
      } catch {
        setError('Failed to load car');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, user]);

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setError(null);

    if (!form.make || !form.model || !form.fuelType || !form.transmission || !form.bodyType || !form.color) {
      setError('Please fill in all required fields.');
      return;
    }

    setSaving(true);
    try {
      await updateCar(id, form);
      navigate(`/cars/${id}`);
    } catch {
      setError('Failed to update listing. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors';
  const labelClass = 'block text-sm font-medium text-gray-300 mb-2';

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

  if (error && !form.make) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => navigate('/cars')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
          >
            Browse Cars
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h1 className="text-3xl font-bold text-white mb-2">Edit Car Listing</h1>
        <p className="text-gray-400 mb-8">
          Update the details for your {form.make} {form.model}.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Basic Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Make *</label>
                <select
                  value={form.make}
                  onChange={(e) => handleChange('make', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select make</option>
                  {makes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Model *</label>
                <input
                  type="text"
                  value={form.model}
                  onChange={(e) => handleChange('model', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Year *</label>
                <input
                  type="number"
                  min={1990}
                  max={2025}
                  value={form.year}
                  onChange={(e) => handleChange('year', parseInt(e.target.value))}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Body Type *</label>
                <select
                  value={form.bodyType}
                  onChange={(e) => handleChange('bodyType', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select body type</option>
                  {bodyTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Price & Specs */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Price & Specifications</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Price (USD) *</label>
                <input
                  type="number"
                  min={0}
                  step={100}
                  value={form.price || ''}
                  onChange={(e) => handleChange('price', parseInt(e.target.value) || 0)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Mileage (miles)</label>
                <input
                  type="number"
                  min={0}
                  value={form.mileage || ''}
                  onChange={(e) => handleChange('mileage', parseInt(e.target.value) || 0)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Fuel Type *</label>
                <select
                  value={form.fuelType}
                  onChange={(e) => handleChange('fuelType', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select fuel type</option>
                  {fuelTypes.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Transmission *</label>
                <select
                  value={form.transmission}
                  onChange={(e) => handleChange('transmission', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select transmission</option>
                  {transmissions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Color *</label>
                <select
                  value={form.color}
                  onChange={(e) => handleChange('color', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select color</option>
                  {colors.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Image URL</label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => handleChange('image', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Description</h2>
            <textarea
              rows={5}
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl border border-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
