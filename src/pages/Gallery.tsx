import { useEffect, useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Play } from 'lucide-react';
import { getGalleryItems, type GalleryItem } from '../services/db';
import { Skeleton } from '../components/ui/Skeleton';

const Gallery = () => {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await getGalleryItems();
                setItems(data);
            } catch (error) {
                console.error("Failed to load gallery items:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const photos = items.filter(item => item.type === 'photo');
    const videos = items.filter(item => item.type === 'video');

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Our Collection</h1>
                        <p className="text-xl text-slate-600">
                            A curated collection of our finest moments captured through the lens.
                        </p>
                    </div>

                    {loading ? (
                        <div className="space-y-12">
                            {/* Videos Skeleton */}
                            <div className="space-y-6">
                                <Skeleton className="h-8 w-48" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <Skeleton className="aspect-video rounded-2xl w-full" />
                                    <Skeleton className="aspect-video rounded-2xl w-full" />
                                </div>
                            </div>
                            {/* Photos Skeleton */}
                            <div className="space-y-6">
                                <Skeleton className="h-8 w-48" />
                                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                        <Skeleton key={i} className="h-64 w-full rounded-xl" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Videos Section */}
                            {videos.length > 0 && (
                                <div className="mb-20">
                                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-slate-900">
                                        <Play className="w-6 h-6 text-slate-900" /> Cinematic Films
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {videos.map((video) => (
                                            <div key={video.id} className="glass-panel p-2 group relative rounded-3xl overflow-hidden cursor-pointer bg-white/40 border-white/50">
                                                <div className="aspect-video rounded-2xl overflow-hidden relative">
                                                    <video
                                                        src={video.url}
                                                        className="w-full h-full object-cover"
                                                        muted
                                                        loop
                                                        playsInline
                                                        controls
                                                        controlsList="nodownload"
                                                        onContextMenu={(e) => e.preventDefault()}
                                                    />
                                                    <div className="absolute inset-0 pointer-events-none bg-black/10 group-hover:bg-transparent transition-colors" />
                                                    <div className="absolute bottom-6 left-6">
                                                        <div className="glass-panel bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl">
                                                            <h3 className="text-slate-900 text-lg font-bold">{video.title}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Photos Grid */}
                            {photos.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-8 text-slate-900">Latest Captures</h2>
                                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                                        {photos.map((photo) => (
                                            <div key={photo.id} className="break-inside-avoid rounded-2xl overflow-hidden group relative shadow-lg hover:shadow-xl transition-all duration-500">
                                                <img
                                                    src={photo.url}
                                                    alt={photo.title}
                                                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                                                    loading="lazy"
                                                    onContextMenu={(e) => e.preventDefault()}
                                                />
                                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors pointer-events-none" />
                                                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="glass-panel bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-sm">
                                                        <p className="text-slate-900 text-sm font-bold text-center">{photo.title}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {videos.length === 0 && photos.length === 0 && (
                                <div className="text-center py-20 text-slate-500 glass-panel">
                                    <p>No items found in the gallery yet.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Gallery;
