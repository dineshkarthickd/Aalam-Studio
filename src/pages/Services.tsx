import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { getServices, type ServiceItem } from '../services/db';
import { Skeleton } from '../components/ui/Skeleton';
import { ChevronRight } from 'lucide-react';

export const Services = () => {
    const [services, setServices] = useState<ServiceItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await getServices();
                setServices(data);
            } catch (error) {
                console.error("Failed to load services:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Our Services</h1>
                        <p className="text-xl text-slate-600">
                            Comprehensive photography and videography packages tailored to your needs.
                        </p>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="aspect-[3/4] w-full rounded-2xl" />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                            {services.map((service) => (
                                <Link
                                    key={service.id}
                                    to="/contact"
                                    state={{ selectedService: service.title }}
                                    className="group cursor-pointer block h-full"
                                >
                                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-panel border border-white/20 shadow-lg transition-transform duration-500 hover:-translate-y-1">
                                        {service.imageUrl ? (
                                            <img
                                                src={service.imageUrl}
                                                alt={service.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 select-none touch-none"
                                                style={{ WebkitUserSelect: 'none', WebkitTouchCallout: 'none' }}
                                                draggable={false}
                                                onContextMenu={(e) => e.preventDefault()}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-muted-foreground">No Image</div>
                                        )}

                                        <div className="absolute inset-x-0 bottom-0 p-4 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            <div className="glass-panel bg-white/80 backdrop-blur-md border border-white/40 p-3 rounded-xl shadow-sm">
                                                <h2 className="text-slate-900 text-lg font-bold mb-1 leading-tight line-clamp-1">{service.title}</h2>
                                                {service.price && <span className="text-slate-900 text-xs font-bold bg-white/50 border border-white/60 px-2 py-0.5 rounded-full inline-block mb-1">{service.price}</span>}
                                                <div className="flex items-center justify-between mt-1">
                                                    <span className="text-slate-700 text-xs font-bold">Book Now</span>
                                                    <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg">
                                                        <ChevronRight size={14} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Services;
