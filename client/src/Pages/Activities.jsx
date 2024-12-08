'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
// import { colors } from '../../utils/colors'
import { Image } from '../components/ui/Image'
import About2 from '../images/AboutUsImage/About2.jpg';
import Activites1 from '../images/Activites/Spiritual.jpg';
import Activites2 from '../images/Activites/Cluture.jpg';
import Activites3  from '../images/Activites/Eductional.jpg';

const activities = [
  {
    name: "Spiritual Activities",
    image: Activites1,
    link: "#spiritual"
  },
  {
    name: "Cultural Activities",
    image: Activites2,
    link: "#cultural"
  },
  {
    name: "Educational Activities",
    image: Activites3,
    link: "#educational"
  }
]

export default function ActivitiesPage() {
  return (
    <div className='min-h-screen bg-background'>
      <Header />
      
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

      {/* Activities Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card 
                  className='group hover:shadow-lg transition-shadow duration-300 bg-background border-primary'
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <Image
                        src={activity.image}
                        alt={activity.name}
                        width={400}
                        height={400}
                        className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className={`absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className='text-xl font-bold text-secondary group-hover:text-primary transition-colors'>
                          {activity.name}
                        </h3>
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
              Join Our Activities
            </h2>
            <p className="text-white/90 mb-8">
              Participate in our diverse range of activities designed to nurture spiritual growth, cultural awareness, and personal development.
            </p>
            <Button 
              className='bg-accent text-text hover:bg-primary hover:text-white transition-colors'
              size="lg"
            >
              Register Now
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

