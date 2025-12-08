import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-secondary/30 border-t border-white/5 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="inline-block mb-4">
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 hover:text-slate-700 transition-colors duration-300 flex items-center gap-1">
                                <span className="text-primary">✦</span> AalamStudio
                            </h2>
                        </Link>
                        <p className="text-muted-foreground leading-relaxed">
                            Capturing life's most precious moments with artistic excellence and cinematic storytelling.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-foreground">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                            <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
                            <li><Link to="/gallery" className="text-muted-foreground hover:text-primary transition-colors">Gallery</Link></li>
                            <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-foreground">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                                <a
                                    href="https://maps.app.goo.gl/YE21hm8exzXvV4o96"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors text-left"
                                >
                                    KPS COMPLEX, 59, Dindigul Rd, Anna Nagar, Palani, Tamil Nadu 624601
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <a href="tel:9894225111" className="hover:text-primary transition-colors">+91 98942 25111</a>
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <a href="mailto:aalamstudiopalani@gmail.com" className="hover:text-primary transition-colors truncate">aalamstudiopalani@gmail.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-foreground">Follow Us</h3>
                        <div className="flex gap-4">
                            <a
                                href="https://www.instagram.com/aalamstudiopalani?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="https://youtube.com/@aalamstudiopalani?si=A4FkZ-9H9WUxtOiw"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-foreground hover:bg-red-600 hover:text-white transition-all"
                            >
                                <Youtube size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center text-muted-foreground text-sm flex items-center justify-center gap-1">
                    <p>&copy; 2025 Aalam Studio. All rights reserved. Made with <span className="text-red-500">❤️</span> for Creators.</p>
                </div>
            </div>
        </footer>
    );
};
