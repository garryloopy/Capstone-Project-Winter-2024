
import { useState, useEffect } from 'react';

const MenuScroll = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        // will adjust threshold some time
        if (window.scrollY > 420) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    // 1 position and color 2 svg icon and size
    return (
        <>
            {isVisible && (
                <button
                    className="fixed bottom-4 right-4 z-50 bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-opacity duration-300 hover:bg-orange-400"
                    onClick={scrollToTop}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        
                        {/* this is to add the text under the arrow icon, not looking great though, will fix some other time 
                        <text x="12" y="22" text-anchor="middle" font-size="0.3rem">Back to Top</text>
                        */}
                    </svg>
                </button>
            )}
        </>
    );
};

export default MenuScroll;
