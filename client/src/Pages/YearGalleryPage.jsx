import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/Card';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Image } from '../components/ui/Image';
import { useState, useEffect } from 'react';
import { APi_URL } from '../Utilis/Api';
import axios from 'axios';
import MainSection from '../components/MainSection';

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
                console.log(response) 
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

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!images.length) return <p className="text-center mt-10">No images found for {year}</p>;

    return (
        <div className="min-h-screen bg-background">
            <Header />

            
            <MainSection/>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-secondary mb-6">Gallery {year}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {images.map((image) => (
                            <motion.div
                                key={image.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card className="group hover:shadow-lg transition-all duration-300 bg-background border-primary overflow-hidden">
                                    <CardContent className="p-0">
                                        <div className="relative">
                                            <Image
                                                src={image.Img}
                                                alt={image.alt}
                                                width={400}
                                                height={400}
                                                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}