import React from 'react';
import { Image } from '../components/ui/Image';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom'; 
import { FaAngleDoubleRight } from 'react-icons/fa';
import About2 from '../images/AboutUsImage/About2.jpg';

function MainSection() {
    const location = useLocation(); 

    const formatPageName = (path) => {
        const name = path.replace('/', '') || 'home';
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };

    const pageName = formatPageName(location.pathname);

    return (
        <div>
            <section className="relative h-[300px] overflow-hidden">
                <Image
                    src={About2}
                    alt="Gallery Hero"
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
                        <div className="flex items-center justify-center space-x-2 text-md mb-4 font-bold">
                            <a href="/" className='hover:text-accent transition-colors'>Home</a>
                            <FaAngleDoubleRight className="text-gray-400" />
                            <span className='text-white '>{pageName}</span>
                        </div>
                        <h1 className="text-4xl font-bold">Our {pageName}</h1>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

export default MainSection;
