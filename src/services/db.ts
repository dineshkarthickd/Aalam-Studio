import { db } from './firebase';
import { collection, getDocs, query, addDoc } from 'firebase/firestore';

export interface Booking {
    id: string;
    clientName: string;
    clientEmail?: string;
    phoneNumber: string;
    eventCategory: string | string[];
    eventType: string | string[];
    date: number; // Storing as timestamp for Web usage ease
    status: 'Pending' | 'Confirmed' | 'Cancelled';
    notes?: string;
}

const bookingsCollection = collection(db, 'bookings');

export const addBooking = async (booking: Omit<Booking, 'id'>) => {
    return await addDoc(bookingsCollection, booking);
};

export interface GalleryItem {
    id: string;
    url: string;
    type: 'photo' | 'video';
    title: string;
    category: string;
}

export const getGalleryItems = async (): Promise<GalleryItem[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, 'gallery'));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as GalleryItem));
    } catch (error) {
        console.error("Error fetching gallery items:", error);
        return [];
    }
};

export const getLatestGalleryItems = async (count: number = 6): Promise<GalleryItem[]> => {
    try {
        const items = await getGalleryItems();
        // Return only the last 'count' items (assuming newer added at end, or random)
        return items.slice(0, count);
    } catch (error) {
        console.error("Error fetching latest gallery items:", error);
        return [];
    }
};

// --- Home Hero Service ---
const homeHeroCollection = collection(db, 'home_hero');

export interface HomeHeroImage {
    id: string;
    url: string;
    title: string;
    createdAt: number;
}

export const getHomeHeroImages = async (): Promise<HomeHeroImage[]> => {
    try {
        const querySnapshot = await getDocs(homeHeroCollection);
        // Sort client-side if needed
        const items = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as HomeHeroImage));
        return items.sort((a, b) => b.createdAt - a.createdAt);
    } catch (error) {
        console.error("Error fetching home hero images:", error);
        return [];
    }
};

// --- Services Service ---
const servicesCollection = collection(db, 'services');

export interface ServiceItem {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    icon?: string;
    price?: string;
    features?: string[];
    isHighlight?: boolean;
    createdAt?: number;
}

export const getServices = async (): Promise<ServiceItem[]> => {
    try {
        const q = query(servicesCollection);
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as ServiceItem));
    } catch (error) {
        console.error("Error fetching services:", error);
        return [];
    }
};
