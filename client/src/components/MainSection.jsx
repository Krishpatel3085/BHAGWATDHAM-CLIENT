import React from 'react';
import { Image } from '../components/ui/Image';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom'; 
import { FaAngleDoubleRight } from 'react-icons/fa';
import About2 from '../images/AboutUsImage/About2.jpg';

function MainSection() {
    const location = useLocation(); 

    const formatPathSegments = (path) => {
        return path
            .replace(/^\//, '')
            .split('/')
            .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1));
    };

    const pathSegments = formatPathSegments(location.pathname);
    const mainRoute = pathSegments[0]; 

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
                            {pathSegments.map((segment, index) => (
                                <React.Fragment key={index}>
                                    <FaAngleDoubleRight className="text-gray-400" />
                                    <span className="text-white">{segment}</span>
                                </React.Fragment>
                            ))}
                        </div>

                        <h1 className="text-4xl font-bold">Our {mainRoute}</h1>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

export default MainSection;
