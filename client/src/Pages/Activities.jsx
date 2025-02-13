import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Image } from "../components/ui/Image";
import {useNavigate } from "react-router-dom";
import MainSection from "../components/MainSection";
import Activites1 from '../images/Activites/Spiritual.jpg';
import Activites2 from '../images/Activites/Cluture.jpg';
import Activites3 from '../images/Activites/Eductional.jpg';


const activitiesStatic = [
  {
    name: "Spiritual",
    image: Activites1,
    category: "Spiritual"
  },
  {
    name: "Cultural",
    image: Activites2,
    category: "Cultural"
  },
  {
    name: "Eductional"  ,
    image: Activites3,
    category: "Educational"
  }
];

export default function Activities() {
  const navigate = useNavigate();
 
  const handleActivitiesClick = (activitie) => {
    navigate(`/ActivitesDetailsPage/${activitie}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MainSection />

      {/* Activities Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activitiesStatic.length > 0 ? (
              activitiesStatic.map((activity, index) => (
                <motion.div
                  key={activity.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card className="group hover:shadow-lg transition-shadow duration-300 bg-background border-primary">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <Image
                          src={activity.image}
                          alt={activity.name}
                          width={400}
                          height={400}
                          className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
                        />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">
                            {activity.name}
                          </h3>
                          <Button onClick={() => handleActivitiesClick(activity.name)}>
                            <ArrowRight className="w-6 h-6 text-primary" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500">No activities found.</p>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Join Our Activities</h2>
            <p className="text-white/90 mb-8">
              Participate in our diverse range of activities designed to nurture
              spiritual growth, cultural awareness, and personal development.
            </p>
            <Button className="bg-accent text-text hover:bg-primary hover:text-white transition-colors" size="lg">
              Register Now
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
