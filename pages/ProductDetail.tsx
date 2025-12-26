
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Product } from '../types';
import { addToCart } from '../store/cartSlice';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data: Product = await response.json();
        setProduct(data);
        setActiveImage(data.images[0]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-64 h-64 bg-gray-200 rounded-2xl mb-6"></div>
          <div className="h-6 w-48 bg-gray-200 rounded mb-3"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <i className="fas fa-search text-gray-300 text-6xl mb-6"></i>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{error || 'Product not found'}</h2>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 transition-colors font-medium"
      >
        <i className="fas fa-arrow-left"></i> Back
      </button>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 lg:p-12">
          {/* Images Section */}
          <div className="flex flex-col gap-6">
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center p-8">
              <img 
                src={activeImage} 
                alt={product.title} 
                className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activeImage === img ? 'border-blue-500 scale-105 shadow-md' : 'border-gray-100 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {product.category}
              </span>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                {product.brand}
              </span>
            </div>

            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{product.title}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center bg-yellow-50 text-yellow-700 px-3 py-1 rounded-lg font-bold">
                <i className="fas fa-star mr-2"></i> {product.rating}
              </div>
              <span className="text-gray-400 font-medium">|</span>
              <span className="text-green-600 font-bold">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                {product.discountPercentage > 0 && (
                  <span className="text-lg text-gray-400 line-through mb-1">
                    ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                  </span>
                )}
              </div>
              {product.discountPercentage > 0 && (
                <div className="bg-green-100 text-green-700 px-2 py-1 rounded inline-block text-xs font-bold">
                  {product.discountPercentage}% DISCOUNT APPLIED
                </div>
              )}
            </div>

            <div className="prose prose-blue mb-10 text-gray-600 leading-relaxed">
              <h3 className="text-gray-900 font-bold text-lg mb-2">Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="mt-auto flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => dispatch(addToCart(product))}
                className="flex-grow bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                <i className="fas fa-cart-plus"></i> Add to Cart
              </button>
              <button className="flex-grow bg-gray-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition-all shadow-lg flex items-center justify-center gap-3">
                Buy Now
              </button>
            </div>
            
            <div className="mt-8 flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-6">
              <div className="flex items-center gap-2">
                <i className="fas fa-truck text-blue-500"></i> Free Delivery
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-shield-alt text-blue-500"></i> 1 Year Warranty
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-undo text-blue-500"></i> 30-Day Returns
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
