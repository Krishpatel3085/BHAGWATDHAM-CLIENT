// import { colors } from "../Utilis/Colors";

// const navItems = [
//   { title: "Home", href: "#" },
//   { title: "About", href: "#about" },
//   { title: "Services", href: "#services" },
//   { title: "Gallery", href: "#gallery" },
//   { title: "Activities", href: "#activities" },
//   { title: "Publications", href: "#publications" },
//   { title: "Events", href: "#events" },
//   { title: "Donate", href: "#donate" },
// ];

// export function Footer() {
//   return (
//     <footer style={{ backgroundColor: colors.secondary, color: colors.white }} className="py-8">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div>
//             <h3 className="text-xl font-bold mb-4">Temple Name</h3>
//             <p>123 Spiritual Street</p>
//             <p>Serenity City, SC 12345</p>
//           </div>
//           <div>
//             <h3 className="text-xl font-bold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               {navItems.map((item) => (
//                 <li key={item.title}>
//                   <a
//                     href={item.href}
//                     className="transition-colors"
//                     style={{ color: colors.white }}
//                     onMouseEnter={(e) => (e.target.style.color = colors.accent)}
//                     onMouseLeave={(e) => (e.target.style.color = colors.white)}
//                   >
//                     {item.title}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
//             <p>Phone: (123) 456-7890</p>
//             <p>Email: info@templename.com</p>
//             <div className="flex space-x-4 mt-4">
//               {/* Add social media icons here */}
//             </div>
//           </div>
//         </div>
//         <div className="mt-8 text-center">
//           <p>&copy; 2024 Temple Name. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }



import { Facebook, Twitter, Youtube, Instagram, Send, Music, Phone, Mail, MapPin } from 'lucide-react'
import { colors } from '../Utilis/Colors'
import { Image } from '../components/ui/Image'

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
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Send, href: "#", label: "Telegram" },
  { icon: Music, href: "#", label: "Spotify" },
]

export function Footer() {
  return (
    <footer className="bg-white py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Section - Logo and Address */}
          <div className="space-y-4">
            <Image
              src="/placeholder.svg?height=80&width=300&text=Temple+Logo"
              alt="Temple Logo"
              width={300}
              height={80}
              className="mb-4"
            />
            <div className="space-y-2">
              <h3 className='text-lg font-semibold text-secondary'>
                Shree Swaminarayan Sanskardham Gurukul
              </h3>
              <div className="flex items-start space-x-2 text-gray-600">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <p>
                  Dhrangdhara, Halwad Road, Post Box No. 22,
                  <br />
                  Dist.Surendranagar, Gujarat, India. 363310
                </p>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <a href="tel:+919825803174" className="hover:text-[${colors.primary}]">
                  +91 98258 03174
                </a>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@ssgd.org" className="hover:text-[${colors.primary}]">
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
              href="#"
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

