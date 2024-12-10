'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Image } from '../components/ui/Image'
import About2 from '../images/AboutUsImage/About2.jpg';
import Logo from '../images/lodermain.png';

// import { colors } from '../../utils/colors'

const galleries = [
    {
        year: 2024,
        image: Logo,
        count: 42
    },
    {
        year: 2023,
        image: Logo,
        count: 156
    },
    {
        year: 2022,
        image: Logo,
        count: 89
    }
]

export default function GalleryPage() {
    return (
        <div className='min-h-screen bg-background'>
            <Header />

            {/* Hero Section with Breadcrumb */}
            <section className="relative h-[300px] overflow-hidden">
                <Image
                    src={About2}
                    alt="Gallery Hero"
                    width={1920}
                    height={300}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-white text-center"
                    >
                        <div className="flex items-center justify-center space-x-2 text-sm mb-4">
                            <a
                                href="/"
                                className='hover:text-accent transition-colors'
                            >
                                HOME
                            </a>
                            <span>{'>'}</span>
                            <span>GALLERY</span>
                        </div>
                        <h1 className="text-4xl font-bold">Our Gallery</h1>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
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
                                                    <p className='text-text}] mt-1'>
                                                        {gallery.count} Photos
                                                    </p>
                                                </div>
                                                <motion.div
                                                    whileHover={{ x: 5 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <ArrowRight className='w-6 h-6 text-primary' />
                                                </motion.div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
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

