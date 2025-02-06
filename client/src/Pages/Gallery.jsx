import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Image } from '../components/ui/Image';
import Logo from '../images/lodermain.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { APi_URL } from '../Utilis/Api';
import MainSection from '../components/MainSection';

export default function GalleryPage() {
    const navigate = useNavigate()
    const [galleries, setGalleries] = useState([]) 
    const [loading, setLoading] = useState(true) 

    // Fetch gallery data from API
    useEffect(() => {
        const fetchGalleryData = async () => {
            try {
                const response = await axios.get(`${APi_URL}GalleryPage/getGPa`);
                const galleryData = response.data.galleries || [];

                const yearsMap = new Map();

                galleryData.forEach(img => {
                    const year = img.Imageyear?.toString();
                    if (year) {
                        if (!yearsMap.has(year)) {
                            yearsMap.set(year, { 
                                year: Number(year), 
                                image: Logo, 
                                count: 0 
                            });
                        }
                        yearsMap.get(year).count += 1;
                    }
                });

                const sortedYears = Array.from(yearsMap.values()).sort((a, b) => b.year - a.year);

                setGalleries(sortedYears);
            } catch (error) {
                console.error('Error fetching gallery data:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchGalleryData();
    }, []);

    const handleYearClick = (year) => {
        navigate(`/year/${year}`); 
    };

    return (
        <div className='min-h-screen bg-background'>
            <Header />

            <MainSection/>

            {/* Gallery Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <p className="text-center text-xl text-gray-500">Loading...</p>
                    ) : galleries.length === 0 ? (
                        <p className="text-center text-xl text-gray-500">No galleries available</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {galleries.map((gallery, index) => (
                                <motion.div
                                    key={gallery.year}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    <Card
                                        className='group hover:shadow-lg transition-all duration-300 bg-background border-primary overflow-hidden'
                                    >
                                        <CardContent className="p-0">
                                            <div className="relative">
                                                <Image
                                                    src={gallery.image}
                                                    alt={`Gallery ${gallery.year}`}
                                                    width={400}
                                                    height={400}
                                                    className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                                <div className={`absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300`} />
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <Button
                                                        onClick={() => handleYearClick(gallery.year)}
                                                        className='bg-accent text-text hover:bg-primary hover:text-white'
                                                    >
                                                        View Gallery
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h2 className='text-2xl font-bold text-secondary'>
                                                            GALLERY {gallery.year}
                                                        </h2>
                                                        <p className='text-text mt-1'>
                                                            {gallery.count} Photos
                                                        </p>
                                                    </div>
                                                    <motion.div
                                                        whileHover={{ x: 5 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <ArrowRight
                                                            onClick={() => handleYearClick(gallery.year)}
                                                            className='w-6 h-6 text-primary' />
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Call to Action */}
            <section className='py-16 bg-secondary'>
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto"
                    >
                        <h2 className="text-3xl font-bold text-white mb-6">
                            Capture the Divine Moments
                        </h2>
                        <p className="text-white/90 mb-8">
                            Browse through our collection of sacred moments, festivals, and community gatherings.
                        </p>
                        <Button
                            className='bg-accent text-text hover:bg-primary hover:text-white transition-colors'
                            size="lg"
                        >
                            View All Galleries
                        </Button>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    )
}