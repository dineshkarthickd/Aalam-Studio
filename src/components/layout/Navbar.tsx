import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';
    // Force "scrolled" style (white background, dark text) on non-home pages
    // On home page, use actual scroll state
    const isScrolledState = !isHome || scrolled;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <>
            <nav
                className={clsx(
                    "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 pointer-events-none",
                    // Dynamic styles based on page/scroll - MOVED TO PARENT NAV for full width
                    isScrolledState
                        ? "bg-white/75 backdrop-blur-md border-b border-white/20 shadow-sm py-3"
                        : "bg-transparent py-4 md:py-6"
                )}
            >
                <div className={clsx(
                    "pointer-events-auto container max-w-7xl mx-auto px-4 flex items-center justify-between transition-all duration-300",
                    // Removed pill shape styles from inner div
                )}>
                    <Link to="/" className={clsx("text-xl font-bold tracking-tight flex items-center gap-2 transition-colors", isScrolledState ? "text-slate-900" : "text-white")}>
                        AalamStudio
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={clsx(
                                    "text-sm font-medium transition-colors hover:text-opacity-80",
                                    location.pathname === link.path
                                        ? (isScrolledState ? "text-slate-900 font-bold" : "text-white font-bold")
                                        : (isScrolledState ? "text-slate-600" : "text-white/90")
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link to="/contact" className="bg-slate-900 hover:bg-black text-white px-6 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all shadow-lg hover:shadow-slate-900/20 active:scale-95">
                            <span className="text-lg">📞</span> Book Now
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className={clsx("md:hidden p-2 rounded-full transition-colors", isScrolledState ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/20")}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu - Glass Drawer Slide-in - MOVED OUTSIDE NAV TO FIX STACKING CONTEXT */}
            <div
                className={clsx(
                    "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
            />

            <div
                className={clsx(
                    "fixed top-0 bottom-0 right-0 z-[60] w-[85%] max-w-sm !bg-white shadow-2xl transition-transform duration-500 ease-out md:hidden flex flex-col p-6 border-l border-slate-200 pointer-events-auto",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
                style={{ backgroundColor: '#ffffff' }}
            >
                <div className="flex justify-between items-center mb-10 border-b border-slate-100 pb-4">
                    <span className="text-xl font-bold text-slate-900">Menu</span>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-full bg-slate-100 text-slate-900 hover:bg-slate-200 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    {navLinks.map((link, idx) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={clsx(
                                "text-3xl font-bold tracking-tight py-3 px-4 rounded-xl transition-all duration-300",
                                location.pathname === link.path
                                    ? "text-slate-900 bg-slate-50 translate-x-2"
                                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 hover:translate-x-2"
                            )}
                            onClick={() => setIsOpen(false)}
                            style={{
                                transitionDelay: `${isOpen ? idx * 75 : 0}ms`,
                                opacity: isOpen ? 1 : 0,
                                transform: isOpen ? 'translateX(0)' : 'translateX(20px)'
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="mt-8 pt-8 border-t border-slate-100">
                        <Link
                            to="/contact"
                            className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white text-lg font-medium py-4 rounded-xl shadow-lg hover:bg-black active:scale-95 transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="text-xl">📞</span> Book Your Date
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
