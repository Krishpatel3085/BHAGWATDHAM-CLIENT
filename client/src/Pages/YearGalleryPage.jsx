import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useState, useEffect } from 'react';
import { APi_URL } from '../Utilis/Api';
import axios from 'axios';
import MainSection from '../components/MainSection';
import Masonry from 'react-masonry-css';

export default function YearGalleryPage() {
    const { year } = useParams();
    const [images, setImages] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`${APi_URL}GalleryPage/getGPa`);
                setUploadedImages(response.data.galleries);
            } catch (error) {
                console.error('Error fetching images', error);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    useEffect(() => {
        if (!loading) {
            const filteredImages = uploadedImages?.filter(img => img?.Imageyear?.toString() === year) || [];
            setImages(filteredImages);
        }
    }, [year, uploadedImages, loading]);

    // Responsive Breakpoints
    const breakpointColumnsObj = {
        default: 3,
        1024: 2,
        768: 1
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <MainSection />
            
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-secondary mb-6">Gallery {year}</h2>

                    {loading ? (
                        <div className="text-center text-xl font-bold text-gray-500">Loading Gallery Images...</div>
                    ) : (
                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className="flex gap-4"
                            columnClassName="masonry-column "
                        >
                            {images.map((image) => (
                                <motion.div
                                    key={image.id}
                                    className="overflow-hidden rounded-lg shadow-md p-3"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <img
                                        src={image.Img}
                                        alt={image.alt || "Gallery Image"}
                                        className="w-full h-full object-cover rounded-lg shadow-lg"
                                    />
                                </motion.div>
                            ))}
                        </Masonry>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
