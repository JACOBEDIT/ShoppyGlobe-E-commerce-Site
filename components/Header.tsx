
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setSearchQuery } from '../store/searchSlice';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const searchQuery = useSelector((state: RootState) => state.search.query);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
    // Ensure we are on home page when searching
    if (window.location.hash !== '#/') {
      navigate('/');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <i className="fas fa-globe"></i>
          <span>ShoppyGlobe</span>
        </Link>

        {/* Search Bar */}
        <div className="relative w-full md:w-1/2 lg:w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 pl-10"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <i className="fas fa-search absolute left-4 top-3 text-gray-400"></i>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
            Home
          </Link>
          <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
            <i className="fas fa-shopping-cart text-xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
