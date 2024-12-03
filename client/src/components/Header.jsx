import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Button } from "../components/ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/Sheet";
import logo from '../images/logoMain.png';
import { Link } from "react-router-dom";

const navItems = [
    { title: "HOME", to: "/" },
    { title: "ABOUT US", to: "/about-us" },
    { title: "SCHOOL", to: "/school" },
    { title: "GALLERY", to: "/gallery" },
    { title: "ACTIVITIES", to: "/activities" },
    { title: "PUBLICATION", to: "/publication" },
    { title: "CONTACT US", to: "/contact-us" },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-primary shadow-md' : 'bg-transparent'
            }`}>
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`text-2xl font-bold ${isScrolled ? 'text-white' : 'text-primary'}`}>
                        <img src={logo} alt="Main Logo" className="w-60" />
                    </motion.div>

                    <nav className="hidden lg:flex space-x-4 ">
                        {navItems.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    to={item.to || "/"}
                                    className={`${isScrolled ? 'text-white' : 'text-primary'} hover:text-accent transition-colors text-md`}>
                                    {item.title}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    <div className="lg:hidden  ">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className={isScrolled ? 'text-white' : 'text-primary'}>
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className='bg-background'>
                                <div className="flex flex-col space-y-4 mt-8 px-4">
                                    {navItems.map((item) => (
                                        <a
                                            key={item.title}
                                            href={item.href}
                                            className='text-primary hover:text-accent transition-colors text-left font-medium'
                                        >
                                            {item.title}
                                        </a>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}
