import { useEffect, useState } from "react";
import { Search, ArrowRight, ArrowLeft } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import MainSection from "../components/MainSection";
import { APi_URL } from "../Utilis/Api";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";

function ActivitiesDetailsPage() {
  const { activitie } = useParams();
  const [activities, setActivities] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // fetch activities
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`${APi_URL}Activities/FetchAllActivities`);
        setActivities(response.data.activities);
        console.log("Activities data fetched:", response.data.activities);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  useEffect(() => {
    if (!loading) {
      const filteredImages = activities.filter(
        (img) =>
          img?.ActivitiesSubject === activitie &&
          img.ActivitiesName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setImages(filteredImages);
    }
  }, [activitie, activities, searchTerm, loading]);

  const handleFlip = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MainSection />
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar and Title */}
        <div className="flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
            {activitie} Activities
          </h2>
          <div className="relative flex items-center w-full sm:w-80 md:w-96">
            <Search className="absolute left-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="w-full h-80 bg-gray-300 animate-pulse rounded-xl"></div>
            ))}
          </div>
        )}

        {!loading && images.length === 0 && (
          <div className="text-center text-gray-500 text-xl mt-6">No activities found....</div>
        )}

        {!loading && images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {images.map((wallpaper) => (
              <motion.div
                key={wallpaper._id}
                className="relative w-full h-80 cursor-pointer perspective-1000"
              >
                <motion.div
                  className="w-full h-full relative"
                  initial={false}
                  animate={{ rotateY: flipped[wallpaper._id] ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front Side */}
                <div
                className="absolute w-full h-full flex flex-col bg-white shadow-lg rounded-xl backface-hidden transition-all duration-300"
                style={{ backfaceVisibility: "hidden" }}
              >
           
                <div className="w-full h-3/4 overflow-hidden rounded-lg">
                  <img
                    src={wallpaper.Img}
                    alt={wallpaper.ActivitiesName}
                    className="w-full h-full object-cover cursor-default transition-transform duration-300 p-2 rounded-lg"
                  />
                </div>

                <div className="p-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold cursor-default transition-colors duration-300 group-hover:text-orange-500">
                    {wallpaper.ActivitiesName}
                  </h3>
                  <Button
                    onClick={() => handleFlip(wallpaper._id)}
                    className="text-black px-4 py-2 transition-all duration-300  hover:bg-orange-500 hover:text-white flex items-center gap-2"
                  >
                    Learn More <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>

                  {/* Back Side */}
                  <div
                    className="absolute w-full h-full flex flex-col justify-between bg-white text-black p-6 rounded-xl shadow-lg cursor-default"
                    style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                  >
                    <div className="p-3 ">
                      <h3 className="text-lg font-bold">{wallpaper.ActivitiesName}</h3>
                      <p className="text-sm mt-2">{wallpaper.ActivitiesDescription}</p>
                    </div>

                    <div className="w-full p-4 rounded-b-xl flex justify-start">
                      <Button
                        onClick={() => handleFlip(wallpaper._id)}
                        className="bg-white text-gray-900 px-4 py-2 rounded-lg  hover:text-gray-800 hover:bg-gray-300 flex items-center gap-2"
                      >
                        <ArrowLeft className="w-5 h-5" /> Close
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ActivitiesDetailsPage;
