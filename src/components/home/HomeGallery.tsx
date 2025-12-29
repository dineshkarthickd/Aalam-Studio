import { useEffect, useState } from 'react';
import { getLatestGalleryItems, type GalleryItem } from '../../services/db';
import { Skeleton } from '../ui/Skeleton';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

export const HomeGallery = () => {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await getLatestGalleryItems(6);
                setItems(data);
            } catch (error) {
                console.error("Failed to load gallery:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const videos = items.filter(item => item.type === 'video');
    const photos = items.filter(item => item.type === 'photo');


    if (loading) {
        return (
            <section id="gallery" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4 text-black">Our Portfolio</h2>
                        <p className="text-gray-600">A curated collection of our finest moments captured through the lens.</p>
                    </div>
                    {[1, 2].map((i) => (
                        <Skeleton key={i} className="h-64 w-full rounded-2xl mb-6" />
                    ))}
                </div>
            </section>
        );
    }
    if (items.length === 0) {
        return null;
    }

    return (
        <section id="gallery" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 tracking-tight">Our Collection</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        A curated collection of our finest moments captured through the lens.
                    </p>
                </div>

                {/* Videos Section */}
                {videos.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center gap-2 mb-6">
                            <Play className="fill-slate-900 text-slate-900 w-5 h-5" />
                            <h3 className="text-xl font-bold text-slate-900">Cinematic Films</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {videos.map((item) => (
                                <div key={item.id} className="relative rounded-2xl overflow-hidden aspect-video group cursor-pointer shadow-lg brightness-95 hover:brightness-100 transition-all">
                                    <video
                                        src={item.url}
                                        className="w-full h-full object-cover"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        controlsList="nodownload nofullscreen noremoteplayback"
                                        disablePictureInPicture
                                        draggable={false}
                                        onContextMenu={(e) => e.preventDefault()}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform shadow-xl">
                                            <Play className="fill-white text-white w-4 h-4 ml-1" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Photos Section */}
                {photos.length > 0 && (
                    <div className="mb-12">
                        <h3 className="text-xl font-bold text-slate-900 mb-6">Latest Captures</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {photos.slice(0, 8).map((item) => (
                                <div key={item.id} className="relative rounded-xl overflow-hidden aspect-[3/4] group cursor-pointer shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                                    <img
                                        src={item.url}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 select-none touch-none"
                                        style={{ WebkitUserSelect: 'none', WebkitTouchCallout: 'none' }}
                                        loading="lazy"
                                        draggable={false}
                                        onContextMenu={(e) => e.preventDefault()}
                                    />
                                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-white/90 via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                                        <span className="text-slate-900 text-xs font-bold drop-shadow-sm">{item.title}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Photos Section Fallback or Link */}
                <div className="text-center mt-12">
                    <Link to="/gallery" className="inline-block px-8 py-3 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                        View Full Collection
                    </Link>
                </div>
            </div>
        </section>
    );
};
