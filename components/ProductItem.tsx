
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Product } from '../types';
import { addToCart } from '../store/cartSlice';

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="block relative group">
        <div className="aspect-square bg-gray-50 overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-gray-800 shadow-sm">
          ★ {product.rating}
        </div>
      </Link>
      
      <div className="p-4 flex-grow flex flex-col">
        <Link to={`/product/${product.id}`} className="hover:text-blue-600 transition-colors">
          <h3 className="font-semibold text-gray-900 truncate mb-1">{product.title}</h3>
        </Link>
        <p className="text-gray-500 text-sm line-clamp-2 mb-3 flex-grow">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-green-600 font-medium">-{product.discountPercentage}% OFF</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors flex items-center justify-center"
            title="Add to Cart"
          >
            <i className="fas fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
