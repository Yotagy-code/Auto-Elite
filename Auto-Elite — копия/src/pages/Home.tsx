import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Users, Star, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getCarById } from '../data';

const features = [
  {
    icon: Shield,
    title: 'Verified Sellers',
    desc: 'Every seller is verified to ensure safe and trustworthy transactions.',
  },
  {
    icon: Zap,
    title: 'Instant Listings',
    desc: 'Post your car for sale in minutes with our streamlined process.',
  },
  {
    icon: Users,
    title: 'Community',
    desc: 'Join thousands of car enthusiasts buying and selling every day.',
  },
  {
    icon: Star,
    title: 'Premium Selection',
    desc: 'Curated collection of the finest vehicles from top brands.',
  },
];

const heroCarIds = ['1', '2', '3', '4'];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroCars, setHeroCars] = useState<{ make: string; model: string; image: string }[]>([]);

  useEffect(() => {
    async function load() {
      const cars = await Promise.all(heroCarIds.map((id) => getCarById(id)));
      setHeroCars(
        cars.filter(Boolean).map((c) => ({
          make: c!.make,
          model: c!.model,
          image: c!.image,
        }))
      );
    }
    load();
  }, []);

  useEffect(() => {
    if (heroCars.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroCars.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroCars.length]);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {heroCars.length > 0 && (
            <img
              src={heroCars[currentSlide]?.image}
              alt=""
              className="w-full h-full object-cover opacity-20 transition-opacity duration-1000"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/60 via-gray-950/80 to-gray-950" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-sm text-blue-400 font-medium">Premium Car Marketplace</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
              Find Your
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Dream Car
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl">
              Experience the pinnacle of automotive excellence. Browse our exclusive
              collection of high-performance vehicles and luxury cruisers.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/cars"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/25"
              >
                Browse Cars
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl border border-gray-700 transition-all"
              >
                Get Started
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Slide indicators */}
          {heroCars.length > 0 && (
            <div className="flex gap-2 mt-12">
              {heroCars.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentSlide ? 'w-8 bg-blue-500' : 'w-4 bg-gray-700'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-800 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Cars Listed' },
              { value: '1,200+', label: 'Happy Buyers' },
              { value: '98%', label: 'Satisfaction' },
              { value: '24/7', label: 'Support' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why AutoElite?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We provide the best experience for buying and selling premium vehicles online.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 bg-gray-900 border border-gray-800 rounded-2xl hover:border-gray-700 hover:bg-gray-800/50 transition-all group"
            >
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                <f.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 sm:p-12 lg:p-16">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Sell Your Car?
            </h2>
            <p className="text-blue-100 mb-8 max-w-lg">
              List your vehicle in minutes and reach thousands of potential buyers. It's free and
              easy to get started.
            </p>
            <Link
              to="/cars/create"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all"
            >
              Create Listing
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2024 AutoElite. All rights reserved.
            </p>
            <div className="flex gap-6">
              <span className="text-sm text-gray-500 hover:text-gray-400 cursor-pointer">Privacy</span>
              <span className="text-sm text-gray-500 hover:text-gray-400 cursor-pointer">Terms</span>
              <span className="text-sm text-gray-500 hover:text-gray-400 cursor-pointer">Contact</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
