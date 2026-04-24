import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCar } from '../data';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

const makes = ['Audi', 'BMW', 'Ford', 'Mercedes-Benz', 'Porsche', 'Range Rover', 'Tesla', 'Toyota', 'Volkswagen', 'Honda', 'Lexus', 'Jaguar'];
const bodyTypes = ['Sedan', 'Coupe', 'SUV', 'Hatchback', 'Truck', 'Convertible', 'Wagon'];
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
const transmissions = ['Automatic', 'Manual', 'CVT'];
const colors = ['Black', 'White', 'Silver', 'Red', 'Blue', 'Gray', 'Green', 'Brown', 'Orange', 'Yellow'];
const defaultImages: Record<string, string> = {
  Sedan: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
  Coupe: 'https://images.unsplash.com/photo-1584345604476-8ec5f82d661f?w=800&q=80',
  SUV: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&q=80',
  Hatchback: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
  Truck: 'https://images.unsplash.com/photo-1583267746897-2cf415887172?w=800&q=80',
  Convertible: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
  Wagon: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
};

export default function CarCreate() {
  const navigate = useNavigate();
  const { user } = useAuth();
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

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === 'bodyType' && typeof value === 'string') {
      setForm((prev) => ({ ...prev, bodyType: value, image: defaultImages[value] || prev.image }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.make || !form.model || !form.fuelType || !form.transmission || !form.bodyType || !form.color) {
      setError('Please fill in all required fields.');
      return;
    }

    if (form.price <= 0) {
      setError('Price must be greater than 0.');
      return;
    }

    setSaving(true);
    try {
      await createCar({
        ...form,
        sellerId: user!.id,
        sellerName: user!.name,
        image: form.image || defaultImages[form.bodyType] || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
      });
      navigate('/cars');
    } catch {
      setError('Failed to create listing. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors';
  const labelClass = 'block text-sm font-medium text-gray-300 mb-2';

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

        <h1 className="text-3xl font-bold text-white mb-2">Create Car Listing</h1>
        <p className="text-gray-400 mb-8">Fill in the details to list your car for sale.</p>

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
                  placeholder="e.g. M4 Competition"
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
                  placeholder="0"
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
                  placeholder="0"
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
                  placeholder="Auto-assigned if empty"
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
              placeholder="Describe your car in detail..."
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
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Create Listing
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
