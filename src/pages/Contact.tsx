import { useState, useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { addBooking, getServices, type ServiceItem } from '../services/db';
import { MapPin, Phone, Mail, Send, Loader2, Check } from 'lucide-react';

export const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [services, setServices] = useState<ServiceItem[]>([]);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        eventCategory: 'Wedding', // Was eventType
        selectedServices: [] as string[], // Will map to eventType (Backend)
        message: ''
    });

    // Categories from Admin Project
    const categories = [
        "Wedding", "Engagement", "Ear Piercing", "Model", "Portrait", "Other", "Reception", "Birthday", "Corporate", "Maternity", "Baby Shower"
    ];

    useEffect(() => {
        const fetchServices = async () => {
            const data = await getServices();
            setServices(data);
        };
        fetchServices();
    }, []);

    const toggleService = (serviceTitle: string) => {
        setFormData(prev => {
            const current = prev.selectedServices;
            const updated = current.includes(serviceTitle)
                ? current.filter(s => s !== serviceTitle)
                : [...current, serviceTitle];
            return { ...prev, selectedServices: updated };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addBooking({
                clientName: formData.name,
                clientEmail: formData.email,
                phoneNumber: formData.phone,
                date: new Date(formData.date).getTime(),
                eventCategory: formData.eventCategory, // Correctly mapped to Category (Wedding etc)
                eventType: formData.selectedServices,  // Correctly mapped to Type/Services (Photography etc)
                status: 'Pending',
                notes: formData.message
            });
            setSuccess(true);
            setFormData({
                name: '', email: '', phone: '', date: '',
                eventCategory: 'Wedding', selectedServices: [], message: ''
            });
        } catch (error) {
            console.error("Booking error:", error);
            alert("Something went wrong. Please try again or call us directly.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
                        <p className="text-xl text-muted-foreground">
                            We'd love to hear from you. Fill out the form below to get in touch.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="glass-panel p-8 bg-white/40 border-white/60">
                                <h3 className="text-2xl font-bold mb-6 text-slate-900">Get in Touch</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-white/50 rounded-xl text-slate-900 shadow-sm">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-1 text-slate-900">Visit Us</h4>
                                            <a
                                                href="https://maps.app.goo.gl/YE21hm8exzXvV4o96"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-slate-600 hover:text-slate-900 transition-colors block"
                                            >
                                                KPS COMPLEX, 59, Dindigul Rd,<br />Anna Nagar, Palani, Tamil Nadu 624601
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-white/50 rounded-xl text-slate-900 shadow-sm">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-1 text-slate-900">Call Us</h4>
                                            <p className="text-slate-600">+91 98942 25111</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-white/50 rounded-xl text-slate-900 shadow-sm">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-1 text-slate-900">Email Us</h4>
                                            <p className="text-slate-600">aalamstudiopalani@gmail.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map */}
                            <div className="glass-panel p-2 h-[300px] overflow-hidden border-white/60">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15707.95475225129!2d77.510000!3d10.450000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9bf5c1e5717ad%3A0x768f14227914619d!2sPalani%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    className="rounded-xl transition-all duration-500"
                                />
                            </div>
                        </div>

                        {/* Form */}
                        <div className="glass-panel p-8 bg-white/40 border-white/60">
                            {success ? (
                                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                    <div className="w-16 h-16 bg-green-500/20 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                        <Check size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 text-slate-900">Message Sent!</h3>
                                    <p className="text-slate-600 mb-6">Thank you for contacting us. We will get back to you shortly.</p>
                                    <button onClick={() => setSuccess(false)} className="glass-button bg-slate-900 text-white hover:bg-black">
                                        Send Another
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <h3 className="text-2xl font-bold mb-2 text-slate-900">Book a Session</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">Your Name</label>
                                            <input
                                                required
                                                type="text"
                                                className="glass-input bg-white/60 border-slate-200 focus:border-slate-400 focus:ring-slate-200 text-slate-900 placeholder:text-slate-400"
                                                placeholder="Your Name"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">Your Email</label>
                                            <input
                                                type="email"
                                                className="glass-input bg-white/60 border-slate-200 focus:border-slate-400 focus:ring-slate-200 text-slate-900 placeholder:text-slate-400"
                                                placeholder="Youremail@example.com"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                                            <input
                                                required
                                                type="tel"
                                                className="glass-input bg-white/60 border-slate-200 focus:border-slate-400 focus:ring-slate-200 text-slate-900 placeholder:text-slate-400"
                                                placeholder="+91 00000 00000"
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">Event Date</label>
                                            <input
                                                required
                                                type="date"
                                                className="glass-input bg-white/60 border-slate-200 focus:border-slate-400 focus:ring-slate-200 text-slate-900 placeholder:text-slate-400"
                                                value={formData.date}
                                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Event Category</label>
                                        <select
                                            className="glass-input bg-white/60 border-slate-200 focus:border-slate-400 focus:ring-slate-200 text-slate-900"
                                            value={formData.eventCategory}
                                            onChange={e => setFormData({ ...formData, eventCategory: e.target.value })}
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat} className="bg-white">{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Services Needed</label>
                                        <div className="glass-input min-h-[60px] h-auto flex flex-wrap gap-2 bg-white/60 border-slate-200 py-3">
                                            {services.length > 0 ? (
                                                services.map(service => {
                                                    const isSelected = formData.selectedServices.includes(service.title);
                                                    return (
                                                        <button
                                                            key={service.id}
                                                            type="button"
                                                            onClick={() => toggleService(service.title)}
                                                            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${isSelected
                                                                ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                                                                : 'bg-white/50 text-slate-600 border-slate-200 hover:bg-white hover:border-slate-400'
                                                                }`}
                                                        >
                                                            {service.title}
                                                        </button>
                                                    );
                                                })
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">Loading services...</span>
                                            )}
                                        </div>
                                        {formData.selectedServices.length === 0 && (
                                            <p className="text-xs text-amber-600 ml-1">* Please select at least one service</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Message (Optional)</label>
                                        <textarea
                                            className="glass-input min-h-[120px] bg-white/60 border-slate-200 focus:border-slate-400 focus:ring-slate-200 text-slate-900 placeholder:text-slate-400"
                                            placeholder="Tell us more about your requirements..."
                                            value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading || formData.selectedServices.length === 0}
                                        className="w-full glass-button bg-slate-900 text-white py-3 hover:bg-black shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} className="mr-2" /> Send Message</>}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
