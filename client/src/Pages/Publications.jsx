import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Image } from "../components/ui/Image";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import MainSection from "../components/MainSection";
import axios from "axios";
import { APi_URL } from "../Utilis/Api";
import { SkeletonCard } from "../Utilis/SkeletonCard"; 

const categories = [
  { id: "kirtan", label: "KIRTAN" },
  { id: "katha", label: "KATHA" },
  { id: "video", label: "VIDEO" },
  { id: "book", label: "BOOK" },
  { id: "wallpaper", label: "WALLPAPER" }
];

export default function PublicationsPage() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const publicationData = async () => {
      try {
        const response = await axios.get(`${APi_URL}Publications/getPublication`);
        console.log("API Response:", response.data.Publications); 
        
        if (response.data.Publications) {
          setPublications(response.data.Publications);
        } else {
          console.error("Data format error: Expected an array");
        }
      } catch (error) {
        console.error("Error fetching publications:", error); 
      } finally {
        setLoading(false); 
      }
    };
    publicationData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section with Breadcrumb */}
      <MainSection />

      {/* Filter Section */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant="outline"
                  className="hover:bg-primary hover:text-white"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Publications Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {loading ? (
                // Show Skeleton while loading
                publications.map((_, index) => (
                  <motion.div key={index} layout>
                    <SkeletonCard />
                  </motion.div>
                ))
              ) : publications.length > 0 ? (
                publications.map(publication => {
                  console.log("Publication data:", publication);
                  return (
                    <motion.div
                      key={publication.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="group hover:shadow-lg transition-shadow duration-300  bg-background border-primary">
                        <CardContent className="p-0">
                          <div className="relative overflow-hidden">
                            <Image
                              src={publication.Img}
                              alt={publication.PublicationName}
                              width={400}
                              height={400}
                              className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105 object-center object-top rounded-lg"
                            />
                            <div
                              className={`absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                            />
                          </div>
                          <div className="p-6 text-center">
                            <h3 className="text-xl font-bold text-secondary mb-4">
                              {publication.name}
                            </h3>
                            <Button
                              variant="outline"
                              className="hover:bg-primary hover:text-white transition-colors"
                            >
                              VIEW DETAILS
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })
              ) : (
                <p>No publications available</p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
