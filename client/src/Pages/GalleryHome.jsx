import React, { useEffect, useState } from 'react';
import { APi_URL } from "../Utilis/Api";
import axios from "axios";
import { motion } from "framer-motion";
import { Image } from "../components/ui/Image";

function GalleryHome() {
      const [galleryImages, setGalleryImages] = useState([]);
      const [serverError, setServerError] = useState(false);
      const [isLoadingImages, setIsLoadingImages] = useState(true);

    //fetch temple gallery image
    useEffect(() => {
        const fetchGalleryImages = async () => {
        try {
            setIsLoadingImages(true);
            setServerError(false);

            const response = await axios.get(`${APi_URL}TempleGallery/getTG`);

            if (response.data.galleries && response.data.galleries.length > 0) {
            setGalleryImages(response.data.galleries);
            } else {
            setGalleryImages([]);
            }
        } catch (error) {
            console.error("Error fetching gallery images:", error);
            setServerError(true);
        } finally {
            setIsLoadingImages(false);
        }
        };
        fetchGalleryImages();
    }, []);

  return (
    <>
             {/* Gallery Section */}
             <section id="gallery" className="py-16">
            <div className="container mx-auto px-4">
              <motion.h2
                className="text-3xl font-bold text-center text-secondary mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Temple Gallery
              </motion.h2>

              {isLoadingImages &&
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }).map((_, index) =>
                    <div
                      key={index}
                      className="animate-pulse bg-gray-300 h-64 w-full rounded-lg"
                    />
                  )}
                </div>}

              {serverError &&
                <div className="text-center text-red-600 text-lg font-semibold">
                  Server is Off. Please try again later.
                </div>}

              {!isLoadingImages &&
                !serverError &&
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {galleryImages.length > 0
                    ? galleryImages.map((image, index) =>
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                          viewport={{ once: true }}
                          className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                          <Image
                            src={image.Img}
                            alt="Gallery Image"
                            width={400}
                            height={300}
                            className="w-full h-80 object-cover object-top rounded-lg "
                          />
                        </motion.div>
                      )
                    : <div className="text-center text-gray-500 text-lg font-semibold col-span-full">
                        No images available.
                      </div>}
                </div>}
            </div>
          </section>

    </>
  )
}

export default GalleryHome
