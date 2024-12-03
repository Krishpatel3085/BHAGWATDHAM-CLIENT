import { Facebook, Twitter, Youtube, Instagram, Send, Music, Phone, Mail, MapPin } from 'lucide-react'
import { Image } from '../components/ui/Image'
import logo from '../images/logoMain.png';

const quickLinks = [
  { title: "Daily Katha", href: "#" },
  { title: "Daily Darshan", href: "#" },
  { title: "Activities", href: "#activities" },
  { title: "Publications", href: "#publications" },
  { title: "Branches", href: "#" },
  { title: "About Us", href: "#about" },
]

const rightLinks = [
  { title: "Contact Us", href: "#contact" },
  { title: "Donation", href: "#donate" },
  { title: "Addmission", href: "#admission" },
  { title: "Pay Fees", href: "#fees" },
]

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/bhagwatdhamgurukuldhrangadhra/", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "https://www.youtube.com/c/BhagwatdhamGurukulDhrangadhra", label: "Youtube" },
  { icon: Instagram, href: "https://www.instagram.com/bhagwatdham_gurukul_official/", label: "Instagram" },
  { icon: Send, href: "#", label: "Telegram" },
  { icon: Music, href: "#", label: "Spotify" },
]

export function Footer() {
  return (
    <footer className="bg-white py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 space-x-8">
          {/* Left Section - Logo and Address */}
          <div className="space-y-4 space-x-8">
            <Image
              src={logo}
              alt="Temple Logo"
              width={300}
              height={80}
              className="mb-4 ms-7"
            />
            <div className="space-y-2">
              <h3 className='text-lg font-semibold text-secondary'>
                Shree Swaminarayan BhagwatDham Gurukul
              </h3>
              <div className="flex items-start space-x-2 text-gray-600">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <p>
                  Near ahemdabad- morbi baypass, Halvad road, opp.<br />
                  Shreeji multispeciality hospital, Dhrangadhra, Gujarat 363310
                </p>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <a href="tel:+919825803174" className="hover:text-primary">
                  +91 98258 03174
                </a>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@ssgd.org" className="hover:text-primary">
                  info@ssgd.org
                </a>
              </div>
            </div>
          </div>

          {/* Middle Section - Quick Links */}
          <div className="space-y-4">
            <h2 className='text-xl font-bold text-secondary'>Quick Links</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="space-y-2">
                {quickLinks.map((link) => (
                  <a
                    key={link.title}
                    href={link.href}
                    className="block text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
              <div className="space-y-2">
                {rightLinks.map((link) => (
                  <a
                    key={link.title}
                    href={link.href}
                    className="block text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Social Media */}
          <div className="space-y-4">
            <h2 className='text-xl font-bold text-secondary'>Social Media</h2>
            <div className="grid grid-cols-4 sm:grid-cols-3 gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className='w-5 h-5 text-primary' />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-gray-600">
          <p>© Copyright SSGD All Rights Reserved</p>
          <p className="mt-1">
            Developed by{' '}
            <a
              href="copyWrite"
              className='text-primary hover:underline'
              target="_blank"
              rel="noopener noreferrer"
            >
              Srashtasoft
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}