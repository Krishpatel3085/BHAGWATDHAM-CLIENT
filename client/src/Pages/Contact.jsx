import { useState } from 'react';
import { motion } from 'framer-motion';
import { Textarea } from "../components/ui/textarea";
import { Mail, Phone } from 'lucide-react';
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import MainSection from '../components/MainSection';

export default function ContactPage() {
  const [newsletterEmail, setNewsletterEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
   
  }

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className='min-h-screen bg-background'>
      <Header />

      {/* Hero Section with Breadcrumb */}
      <MainSection/>

      {/* Contact Information and Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className='bg-primary text-white'>
                  <CardContent className="p-6 text-center">
                    <Mail className="w-8 h-8 mx-auto mb-4" />
                    <h3 className="font-bold mb-2">SEND EMAIL</h3>
                    <p>EMAIL ADDRESS:</p>
                    <a href="mailto:info@ssgd.org" className="hover:underline">info@ssgd.org</a>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className='bg-secondary text-white'>
                  <CardContent className="p-6 text-center">
                    <Phone className="w-8 h-8 mx-auto mb-4" />
                    <h3 className="font-bold mb-2">CALL US NOW</h3>
                    <p>PHONE NUMBER:</p>
                    <a href="tel:+919825803174" className="hover:underline">+91 94276 64978</a>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  placeholder="NAME"
                  className='bg-white border-primary'
                />
                <Input
                  type="email"
                  placeholder="EMAIL"
                  className='bg-white border-primary'
                />
                <div className="flex gap-4">
                  {/* <Select>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="+91" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+91">+91</SelectItem>
                      <SelectItem value="+1">+1</SelectItem>
                      <SelectItem value="+44">+44</SelectItem>
                    </SelectContent>
                  </Select> */}
                  <Input
                    type="tel"
                    placeholder="PHONE NUMBER"
                    className='bg-white border-primary'
                  />
                </div>
                <Textarea
                  placeholder="MESSAGE"
                  className='bg-white border-primary min-h-[150px]'
                />
                <Button
                  type="submit"
                  className='bg-primary text-white hover:bg-secondary w-full'
                >
                  SEND MESSAGE
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map and Visit Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-[400px] bg-gray-200 rounded-lg overflow-hidden"
            >

              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3758.7844793667646!2d71.44225547541035!3d22.99785657919122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39596242f2783afb%3A0x54bc07c1444f2df5!2sBhagwatdham%20Gurukul%20Dhrangadhra!5e1!3m2!1sen!2sin!4v1733635807419!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title='map'
                ></iframe>
            </motion.div>

            {/* Visit Us */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <h2 className='text-2xl font-bold text-secondary'>VISIT US</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className='font-bold text-primary'>ADDRESS 1 :-</h3>
                  <p className='text-text'>
                    Near ahmedabad- modij bypass,
                    <br />
                    Haveli road, opp. Dhrangadhra hospital,
                    <br />
                    Dhrangadhra, Gujarat 363310
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className='font-bold text-primary'>ADDRESS 2 :-</h3>
                  <p className='text-text'>
                    511-A , TAKHTESHVER ROAD ,
                    <br />
                    BHOGAT VALA ,
                    <br />
                    HARIDWAR(UTTARKHAND)
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className='py-16 bg-primary'>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-6">JOIN OUR NEWSLETTER</h2>
            <p className="text-white/90 mb-8">SUBSCRIBE TO RECEIVE OUR LETTER UPDATE IN YOUR INBOX</p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-4">
              <Input
                type="email"
                placeholder="ENTER YOUR EMAIL"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-white"
              />
              <Button
                type="submit"
                className='bg-accent text-text hover:bg-white'
              >
                SUBSCRIBE
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

