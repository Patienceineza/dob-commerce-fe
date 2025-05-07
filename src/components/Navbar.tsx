/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LuShoppingCart } from 'react-icons/lu';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { FaAngleDown, FaRegUserCircle } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import HSButton from './form/HSButton';
import { logout } from '@/features/Auth/SignInSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { selectCartItems, fetchCartItems } from '@/features/Cart/cartSlice';

function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleProfileMenu, setToggleProfileMenu] = useState(false);
  const user = useAppSelector((state) => state.signIn.user);
  const cartItems = useAppSelector((state: RootState) =>
    selectCartItems(state)
  );

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="relative flex items-center justify-between w-full h-16 px-4 md:px-8">
        {/* Mobile menu button */}
        <RxHamburgerMenu
          size={24}
          className="lg:hidden text-gray-600 hover:text-primary transition-colors cursor-pointer"
          onClick={() => setToggleMenu(!toggleMenu)}
        />

        {/* Logo/Brand */}
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary rounded-lg text-white">
            <FiShoppingBag size={24} />
          </div>
          <h2 className="text-xl font-bold text-primary hidden sm:block">
            ShopEase
          </h2>
        </div>

        {/* Main Navigation */}
        <nav className="hidden lg:flex items-center h-full space-x-1">
          {[
            { path: '/', name: 'Home' },
            { path: '/shop', name: 'Shop' },
            { path: '/about', name: 'About' },
            { path: '/contact', name: 'Contact' },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 h-full flex items-center justify-center font-medium transition-colors ${
                location.pathname === item.path
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right side icons */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative group">
              <LuShoppingCart
                size={22}
                className="text-gray-600 group-hover:text-primary transition-colors"
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <FiHeart
              size={22}
              className="text-gray-600 hover:text-primary transition-colors cursor-pointer"
              onClick={() => navigate('/wishlist')}
            />
          </div>

          {user ? (
            <div className="hidden lg:flex items-center gap-2 relative">
              <div
                className="flex items-center gap-2 cursor-pointer"
                role="button"
                tabIndex={0}
                aria-expanded={toggleProfileMenu}
                onClick={() => setToggleProfileMenu(!toggleProfileMenu)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setToggleProfileMenu(!toggleProfileMenu);
                  }
                }}
                aria-label="Toggle Profile Menu"
              >
                {user.picture ? (
                  <img
                    src={user.picture}
                    className="w-8 h-8 rounded-full object-cover"
                    alt="profile"
                  />
                ) : (
                  <FaRegUserCircle size={24} className="text-gray-600" />
                )}
                <span className="text-gray-700 font-medium">
                  {`${user.firstName} ${user.lastName}`}
                </span>
                <FaAngleDown
                  size={16}
                  className={`text-gray-500 transition-transform ${toggleProfileMenu ? 'rotate-180' : ''}`}
                />
              </div>

              {toggleProfileMenu && (
                <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-48 py-2 z-50 border border-gray-100">
                  {[
                    {
                      icon: <FaRegUserCircle size={16} />,
                      text: 'Edit Profile',
                    },
                    { icon: <FiHeart size={16} />, text: 'Wishlist' },
                    { icon: <LuShoppingCart size={16} />, text: 'Orders' },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      <span className="text-gray-500">{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <div
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setToggleProfileMenu(false);
                        dispatch(logout());
                      }}
                    >
                      <span className="text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                      </span>
                      <span>Sign Out</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <HSButton
              path="/signIn"
              title="Login"
              styles="hidden lg:flex bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors"
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {toggleMenu && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-white shadow-md z-40 border-t border-gray-100">
          <div className="px-4 py-3 space-y-3">
            {[
              { path: '/', name: 'Home' },
              { path: '/shop', name: 'Shop' },
              { path: '/about', name: 'About' },
              { path: '/contact', name: 'Contact' },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md ${
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setToggleMenu(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-100 px-4 py-3">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2">
                  {user.picture ? (
                    <img
                      src={user.picture}
                      className="w-8 h-8 rounded-full object-cover"
                      alt="profile"
                    />
                  ) : (
                    <FaRegUserCircle size={24} className="text-gray-600" />
                  )}
                  <span className="font-medium text-gray-800">
                    {`${user.firstName} ${user.lastName}`}
                  </span>
                </div>
                <button
                  type="button"
                  className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                  onClick={() => {
                    setToggleMenu(false);
                    dispatch(logout());
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Sign Out
                </button>
              </>
            ) : (
              <HSButton
                path="/signIn"
                title="Login"
                styles="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-md"
                onClick={() => setToggleMenu(false)}
              />
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
