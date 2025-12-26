
import React from 'react';
import { useSelector } from 'react-redux';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { RootState } from '../store/store';
import ProductItem from '../components/ProductItem';

const ProductList: React.FC = () => {
  const { products, loading, error } = useFetchProducts();
  const searchQuery = useSelector((state: RootState) => state.search.query);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-500 font-medium">Loading amazing products for you...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <i className="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-600">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {searchQuery ? `Search results for "${searchQuery}"` : 'Discover Products'}
        </h1>
        <p className="text-gray-500 font-medium">{filteredProducts.length} items found</p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <i className="fas fa-search-minus text-gray-300 text-6xl mb-4"></i>
          <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
          <p className="text-gray-500">Try adjusting your search to find what you're looking for.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
