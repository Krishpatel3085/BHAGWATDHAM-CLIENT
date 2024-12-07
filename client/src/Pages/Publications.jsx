'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/Select"
import { Input } from "../components/ui/Input"
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Image } from '../components/ui/Image'
import About2 from '../images/AboutUsImage/About2.jpg';


const categories = [
    { id: 'kirtan', label: 'KIRTAN' },
    { id: 'katha', label: 'KATHA' },
    { id: 'video', label: 'VIDEO' },
    { id: 'book', label: 'BOOK' },
    { id: 'wallpaper', label: 'WALLPAPER' },
]

const publications = [
    {
        id: 1,
        name: "Bhagavad Gita",
        image: "/placeholder.svg?height=400&width=400&text=Bhagavad+Gita",
        category: "book"
    },
    {
        id: 2,
        name: "Morning Prayers",
        image: "/placeholder.svg?height=400&width=400&text=Morning+Prayers",
        category: "kirtan"
    },
    {
        id: 3,
        name: "Spiritual Discourse",
        image: "/placeholder.svg?height=400&width=400&text=Spiritual+Discourse",
        category: "katha"
    },
    {
        id: 4,
        name: "Temple Wallpaper",
        image: "/placeholder.svg?height=400&width=400&text=Temple+Wallpaper",
        category: "wallpaper"
    },
    {
        id: 5,
        name: "Devotional Songs",
        image: "/placeholder.svg?height=400&width=400&text=Devotional+Songs",
        category: "video"
    },
    {
        id: 6,
        name: "Sacred Texts",
        image: "/placeholder.svg?height=400&width=400&text=Sacred+Texts",
        category: "book"
    },
]

export default function PublicationsPage() {
    const [activeCategory, setActiveCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedSort, setSelectedSort] = useState('All')

    const filteredPublications = publications.filter(pub => {
        const matchesCategory = activeCategory === 'all' || pub.category === activeCategory
        const matchesSearch = pub.name.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className='min-h-screen bg-background'>
            <Header />

            {/* Hero Section with Breadcrumb */}
            <section className="relative h-[300px] overflow-hidden">
                <Image
                    src={About2}
                    alt="Publications Hero"
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
                                className="hover:text-accent transition-colors"
                            >
                                HOME
                            </a>
                            <span>{'>'}</span>
                            <span>PUBLICATION</span>
                        </div>
                        <h1 className="text-4xl font-bold">Our Publications</h1>
                    </motion.div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-8 border-b">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <Button
                                    key={category.id}
                                    variant={activeCategory === category.id ? "default" : "outline"}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={
                                        activeCategory === category.id
                                            ? 'bg-primary text-white'
                                            : 'hover:bg-primary hover:text-white'
                                    }
                                >
                                    {category.label}
                                </Button>
                            ))}
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <Select
                                value={selectedSort}
                                onValueChange={setSelectedSort}
                            >
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="ALL" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">ALL</SelectItem>
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="oldest">Oldest</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="relative flex-1 md:w-[200px]">
                                <Input
                                    type="search"
                                    placeholder="Search publications..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Publications Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {filteredPublications.map((publication) => (
                                <motion.div
                                    key={publication.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card className='group hover:shadow-lg transition-shadow duration-300 bg-background border-primary'>
                                        <CardContent className="p-0">
                                            <div className="relative overflow-hidden">
                                                <Image
                                                    src={publication.image}
                                                    alt={publication.name}
                                                    width={400}
                                                    height={400}
                                                    className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                                <div className={`absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                                            </div>
                                            <div className="p-6 text-center">
                                                <h3 className='text-xl font-bold text-secondary mb-4'>
                                                    {publication.name}
                                                </h3>
                                                <Button
                                                    variant="outline"
                                                    className='hover:bg-primary hover:text-white transition-colors'
                                                >
                                                    VIEW DETAILS
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

