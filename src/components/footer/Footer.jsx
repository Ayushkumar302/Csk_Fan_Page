import { Facebook, Twitter, Instagram, } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold mb-2">Chennai Super Kings Fan Hub</h2>
                    <p className="text-gray-400 text-lg">Stay connected for the latest updates!</p>
                </div>

                <div className="flex justify-center space-x-6">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <Facebook className="w-8 h-8 hover:text-yellow-500 transition duration-300" />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <Twitter className="w-8 h-8 hover:text-yellow-500 transition duration-300" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <Instagram className="w-8 h-8 hover:text-yellow-500 transition duration-300" />
                    </a>

                </div>
            </div>
            <div className="bg-gray-700 mt-4 py-2">
                <div className="container mx-auto text-center text-gray-400">
                    <p>© {new Date().getFullYear()} Chennai Super Kings. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
