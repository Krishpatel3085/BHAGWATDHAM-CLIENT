import React, { useState } from 'react';
import { Search} from 'lucide-react';
import About2 from '../images/AboutUsImage/About2.jpg';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Image } from '../components/ui/Image';
import { motion } from 'framer-motion';


const wallpapers = [
  {
    id: 1,
    title: "Divine Krishna Portrait",
    image: "https://images.unsplash.com/photo-1600577916048-804c9191e36c?w=800&auto=format&fit=crop",
    category: "Portrait"
  },
  {
    id: 2,
    title: "Spiritual Essence",
    image: "https://images.unsplash.com/photo-1542124292-70177e239a3b?w=800&auto=format&fit=crop",
    category: "Nature"
  },
  {
    id: 3,
    title: "Divine Celebration",
    image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800&auto=format&fit=crop",
    category: "Festival"
  },
  {
    id: 4,
    title: "Sacred Moments",
    image: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=800&auto=format&fit=crop",
    category: "Devotional"
  },
  {
    id: 5,
    title: "Temple Architecture",
    image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800&auto=format&fit=crop",
    category: "Architecture"
  },
  {
    id: 6,
    title: "Spiritual Journey",
    image: "https://images.unsplash.com/photo-1518564747095-d2fbe2e49012?w=800&auto=format&fit=crop",
    category: "Nature"
  }
];

const categories = ["All", "Portrait", "Nature", "Festival", "Devotional", "Architecture"];

function ActivitiesDetailsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredWallpapers = wallpapers.filter(wallpaper => {
    const matchesSearch = wallpaper.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || wallpaper.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background ">
      {/* Header */}
      <Header/>

 {/* Hero Section with Breadcrumb */}
 <section className="relative h-[300px] overflow-hidden">
        <Image
          src={About2}
          alt="Activities Hero"
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
              <span>ACTIVITIES</span>
            </div>
            <h1 className="text-4xl font-bold">Our Activities</h1>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md w-full">
            <input
              type="text"
              placeholder="Search wallpapers..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                  ${selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Wallpaper Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWallpapers.map(wallpaper => (
            <div
              key={wallpaper.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-[1.02]"
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={wallpaper.image}
                  alt={wallpaper.title}
                  className="w-full h-full object-cover"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-lg mb-2">{wallpaper.title}</h3>
                   
                  </div>
                </div> */}
              </div>
              <div className="p-4">
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                name
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default ActivitiesDetailsPage;