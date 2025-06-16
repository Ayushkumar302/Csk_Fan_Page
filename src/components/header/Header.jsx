import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/Images/logo.png';
import { Menu, User, X } from 'lucide-react'; 
import { useAuth } from '../../context/AuthContext'; 

function Header() {
  const location = useLocation(); 
  const [activeLink, setActiveLink] = useState(location.pathname); 
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const { user, logout } = useAuth();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-yellowColor sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center justify-start sm:justify-center w-full sm:w-auto">
          <Link to='/'>
          <img src={logo} alt="Logo" className="h-[50px] w-auto" />
          </Link>
        </div>

        <ul className="hidden sm:flex items-center space-x-4 text-white font-semibold justify-center flex-grow">
          <li>
            <Link
              to="/"
              className={`text-primaryColor hover:text-blue-600 relative ${activeLink === '/' ? 'text-blue-900 font-bold underline ' : ''}`}
              onClick={() => setActiveLink('/')}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/schedule"
              className={`text-primaryColor hover:text-blue-600 relative ${activeLink === '/schedule' ? 'text-blue-900 font-bold underline ' : ''}`}
              onClick={() => setActiveLink('/schedule')}
            
            >
              Match Schedule
            </Link>
          </li>
          <li>
            <Link
              to="/fanzone"
              className={`text-primaryColor hover:text-blue-600 relative ${activeLink === '/fanzone' ? 'text-blue-900 font-bold underline' : ''}`}
              onClick={() => setActiveLink('/fanzone')}
            >
              Fan Zone
            </Link>
          </li>
          <li>
            <Link
              to="/news"
              className={`text-primaryColor hover:text-blue-600 relative ${activeLink === '/news' ? 'text-blue-900 font-bold underline' : ''}`}
              onClick={() => setActiveLink('/news')}
            >
              News
            </Link>
          </li>
          <li>
            <Link
              to="/liveupdates"
              className={`text-primaryColor hover:text-blue-600 relative ${activeLink === '/liveupdates' ? 'text-blue-900 font-bold underline' : ''}`}
              onClick={() => setActiveLink('/liveupdates')}
            >
              Live Updates
            </Link>
          </li>
          
          <li>
            <Link
              to="/polls"
              className={`text-primaryColor hover:text-blue-600 relative ${activeLink === '/polls' ? 'text-blue-900 font-bold underline' : ''}`}
              onClick={() => setActiveLink('/polls')}
            >
              Polls
            </Link>
          </li>
        </ul>

        {/* Display Username and Logout */}
        <div className="sm:flex items-center space-x-4 mr-2">
          {user ? (
            <div className='flex items-center space-x-2'>
              <span className='text-primaryColor'><User size={20} /></span>
              <span className="text-primaryColor font-[900]">{user.username}</span>
              <button
                onClick={logout}
                className="text-primaryColor hover:text-blue-600 font-[600] hidden sm:block"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className={`text-primaryColor hover:text-blue-600 ${activeLink === '/login' ? 'text-blue-900 font-bold' : ''}`}
                onClick={() => setActiveLink('/login')}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`text-yellowColor bg-primaryColor p-1 rounded-full shadow-md hover:bg-[#00509E] ${activeLink === '/signup' ? 'text-blue-900 font-bold' : ''}`}
                onClick={() => setActiveLink('/signup')}
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu  */}
        <div className="flex sm:hidden items-center">
          <button onClick={toggleMenu} aria-label="Toggle Menu" className="text-primaryColor">
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
     
        {isMenuOpen && (
          <ul className="sm:hidden absolute top-[70px] left-0 w-full bg-yellowColor p-4 space-y-4 text-white font-semibold z-50">
            <li>
              <Link
                to="/"
                className={`block text-primaryColor hover:text-blue-600 ${activeLink === '/' ? 'text-blue-900 font-bold underline' : ''}`}
                onClick={() => {
                  setActiveLink('/');
                  toggleMenu();
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/schedule"
                className={`block text-primaryColor hover:text-blue-600 ${activeLink === '/schedule' ? 'text-blue-900 font-bold underline' : ''}`}
                onClick={() => {
                  setActiveLink('/schedule');
                  toggleMenu();
                }}
              >
                Match Schedule
              </Link>
            </li>
            <li>
              <Link
                to="/fanzone"
                className={`block text-primaryColor hover:text-blue-600 ${activeLink === '/fanzone' ? 'text-blue-900 font-bold underline' : ''}`}
                onClick={() => {
                  setActiveLink('/fanzone');
                  toggleMenu();
                }}
              >
                Fan Zone
              </Link>
            </li>
            <li>
              <Link
                to="/news"
                className={`block text-primaryColor hover:text-blue-600 ${activeLink === '/news' ? 'text-blue-900 font-bold underline' : ''}`}
                onClick={() => {
                  setActiveLink('/news');
                  toggleMenu();
                }}
              >
                News
              </Link>
            </li>
            <li>
              <Link
                to="/liveupdates"
                className={`block text-primaryColor hover:text-blue-600 ${activeLink === '/liveupdates' ? 'text-blue-900 font-bold underline' : ''}`}
                onClick={() => {
                  setActiveLink('/liveupdates');
                  toggleMenu();
                }}
              >
                Live Updates
              </Link>
            </li>
           
            <li>
              <Link
                to="/polls"
                className={`block text-primaryColor hover:text-blue-600 ${activeLink === '/polls' ? 'text-blue-900 font-bold underline' : ''}`}
                onClick={() => {
                  setActiveLink('/polls');
                  toggleMenu();
                }}
              >
                Polls
              </Link>
            </li>
            {user && (
              <li>
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="block text-primaryColor hover:text-blue-600"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;
