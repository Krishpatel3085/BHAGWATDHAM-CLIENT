import { colors } from "../Utilis/Colors";

const navItems = [
  { title: "Home", href: "#" },
  { title: "About", href: "#about" },
  { title: "Services", href: "#services" },
  { title: "Gallery", href: "#gallery" },
  { title: "Activities", href: "#activities" },
  { title: "Publications", href: "#publications" },
  { title: "Events", href: "#events" },
  { title: "Donate", href: "#donate" },
];

export function Footer() {
  return (
    <footer style={{ backgroundColor: colors.secondary, color: colors.white }} className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Temple Name</h3>
            <p>123 Spiritual Street</p>
            <p>Serenity City, SC 12345</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.href}
                    className="transition-colors"
                    style={{ color: colors.white }}
                    onMouseEnter={(e) => (e.target.style.color = colors.accent)}
                    onMouseLeave={(e) => (e.target.style.color = colors.white)}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@templename.com</p>
            <div className="flex space-x-4 mt-4">
              {/* Add social media icons here */}
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 Temple Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
