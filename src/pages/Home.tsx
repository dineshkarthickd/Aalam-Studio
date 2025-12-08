import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HomeGallery } from '../components/home/HomeGallery';
import { getHomeHeroImages, getServices, type HomeHeroImage, type ServiceItem } from '../services/db';
import { Skeleton } from '../components/ui/Skeleton';

export const Home = () => {
    const [heroImages, setHeroImages] = useState<HomeHeroImage[]>([]);
    const [services, setServices] = useState<ServiceItem[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [heroes, serviceData] = await Promise.all([
                    getHomeHeroImages(),
                    getServices()
                ]);
                setHeroImages(heroes);
                setServices(serviceData); // Show all services
            } catch (error) {
                console.error("Error fetching home data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (heroImages.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % heroImages.length);
        }, 8000); // 8s interval
        return () => clearInterval(interval);
    }, [heroImages.length]);

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-[100dvh] md:h-screen flex items-center justify-center overflow-hidden py-24 md:py-0">
                {/* Slideshow */}
                <div className="absolute inset-0 bg-black">
                    <AnimatePresence mode="wait">
                        {heroImages.length > 0 ? (
                            <motion.img
                                key={currentSlide}
                                src={heroImages[currentSlide].url}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 0.6, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 2 }}
                                className="w-full h-full object-cover absolute inset-0"
                            />
                        ) : (
                            // Default Fallback Image (Matching user's preference for "internet background")
                            <motion.img
                                key="default-hero"
                                src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.6 }}
                                className="w-full h-full object-cover absolute inset-0"
                                alt="Default Hero"
                            />
                        )}
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Content */}
                <div className="relative container mx-auto px-4 text-center z-10 flex flex-col h-full justify-center">
                    <div className="flex flex-col gap-12 md:gap-20 items-center justify-center h-full pt-12 md:pt-0">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="w-full"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-white font-medium mb-6 md:mb-8 shadow-lg text-sm md:text-base">
                                <span className="text-yellow-400">★</span> Top Rated Studio in Palani
                            </div>

                            <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 tracking-tight text-white drop-shadow-lg leading-tight">
                                Capturing Life's <br />
                                <span className="bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-300 bg-clip-text text-transparent drop-shadow-sm">
                                    Masterpieces
                                </span>
                            </h1>
                            <p className="text-white/90 text-base md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed font-normal drop-shadow-md px-2">
                                We don't just take photos; we craft timeless visual legacies.<br className="hidden md:block" />
                                Specializing in premium Wedding, Event, and Candid photography.
                            </p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                                <Link to="/contact" className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-medium transition-all hover:scale-105 flex items-center gap-2 justify-center w-full md:w-auto shadow-xl">
                                    Book Your Date <ChevronRight size={20} />
                                </Link>
                                <Link to="/gallery" className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/40 px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-medium transition-all hover:scale-105 w-full md:w-auto shadow-lg">
                                    View Gallery
                                </Link>
                            </div>
                        </motion.div>

                        {/* Stats / Trust - Floating within Hero using White Glass */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 max-w-5xl mx-auto w-full"
                        >
                            <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-4 md:p-6 text-center transform hover:-translate-y-1 transition-transform shadow-lg">
                                <h4 className="text-2xl md:text-3xl font-bold text-white mb-1">30+</h4>
                                <p className="text-white/90 text-xs md:text-sm font-medium">Years Experience</p>
                            </div>
                            <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-4 md:p-6 text-center transform hover:-translate-y-1 transition-transform shadow-lg">
                                <h4 className="text-2xl md:text-3xl font-bold text-white mb-1">500+</h4>
                                <p className="text-white/90 text-xs md:text-sm font-medium">Events Covered</p>
                            </div>
                            <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-4 md:p-6 text-center transform hover:-translate-y-1 transition-transform shadow-lg">
                                <h4 className="text-2xl md:text-3xl font-bold text-white mb-1">100%</h4>
                                <p className="text-white/90 text-xs md:text-sm font-medium">Happy Clients</p>
                            </div>
                            <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-4 md:p-6 text-center transform hover:-translate-y-1 transition-transform shadow-lg">
                                <h4 className="text-2xl md:text-3xl font-bold text-white mb-1">4K</h4>
                                <p className="text-white/90 text-xs md:text-sm font-medium">Premium Quality</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Preview - Portrait Glass Cards */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Our Services</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">We offer a wide range of professional services tailored to capture your best moments.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {loading ? (
                            [1, 2, 3, 4].map(i => <Skeleton key={i} className="aspect-[3/4] w-full rounded-2xl" />)
                        ) : (
                            services.map((service) => (
                                <Link to="/services" key={service.id} className="group cursor-pointer block h-full">
                                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-panel border border-white/20 shadow-lg transition-transform duration-500 hover:-translate-y-1">
                                        {service.imageUrl ? (
                                            <img
                                                src={service.imageUrl}
                                                alt={service.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">No Image</div>
                                        )}

                                        <div className="absolute inset-x-0 bottom-0 p-4 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            <div className="glass-panel bg-white/80 backdrop-blur-md border border-white/40 p-3 rounded-xl shadow-sm">
                                                <h3 className="text-slate-900 text-lg font-bold mb-1 leading-tight line-clamp-1">
                                                    {service.title}
                                                </h3>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-slate-700 text-xs font-bold line-clamp-1">View Details</span>
                                                    <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg">
                                                        <ChevronRight size={14} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>

                    <div className="text-center mt-16">
                        <Link to="/services" className="glass-button text-slate-900 px-8 hover:bg-white">
                            View All Services <ArrowRight size={16} className="ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Gallery Preview */}
            <HomeGallery />

            {/* CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/40" />
                <div className="container mx-auto px-4 relative text-center z-10 glass-panel max-w-4xl p-12 mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Ready to create magic?</h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
                        Let's discuss your upcoming event and how we can help capture it perfectly.
                    </p>
                    <Link to="/contact" className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-medium transition-all hover:scale-105 shadow-xl">
                        Book A Consultation
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};
