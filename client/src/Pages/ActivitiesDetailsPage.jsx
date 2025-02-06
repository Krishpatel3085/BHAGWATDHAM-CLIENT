import { useEffect, useState } from "react";
import { Search,ArrowRight, ArrowLeft } from "lucide-react";
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

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`${APi_URL}Activities/FetchAllActivities`);
        setActivities(response.data.activities);
        console.log("Activities data fetch", response.data.activities);
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
      console.log("Activite", activitie);
      const filteredImages = activities?.filter(img => img?.ActivitiesSubject === activitie) || [];
      setImages(filteredImages);
    }
  }, [activitie, activities, loading]);


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
        <h2 className="text-3xl font-bold mb-4">{activitie} Activities</h2>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md w-full mb-6">
          <input
            type="text"
            placeholder="Search activities..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>

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

                <div
                  className="absolute w-full h-full flex flex-col bg-white shadow-lg rounded-xl backface-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img
                    src={wallpaper.Img}
                    alt={wallpaper.ActivitiesName}
                    className="w-full h-3/4 object-cover rounded-t-xl "
                  />
                  <div className="p-4 flex justify-between items-center">
                    <h3 className="text-lg font-bold group-hover:text-secondary">{wallpaper.ActivitiesName}</h3>
                    <Button
                      onClick={() => handleFlip(wallpaper._id)}
                      className="text-black px-4 py-2 rounded-lg group-hover:bg-secondary flex items-center gap-2"
                    >
                      Learn More <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <div
                  className="absolute w-full h-full flex flex-col justify-between bg-white text-black p-6 rounded-xl shadow-lg"
                  style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                >
                  <div className="p-3">
                    <h3 className="text-lg font-bold">{wallpaper.ActivitiesName}</h3>
                    <p className="text-sm mt-2 ">{wallpaper.ActivitiesDescription}</p>
                  </div>

                  <div className="w-full p-4 rounded-b-xl flex justify-start">
                    <Button
                      onClick={() => handleFlip(wallpaper._id)}
                      className="bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center gap-2"
                    >
                      <ArrowLeft className="w-5 h-5" /> Close
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>


      </div>

      <Footer />
    </div>
  );
}

export default ActivitiesDetailsPage;
