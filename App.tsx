
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Header';

// Lazy loading pages for performance optimization
const ProductList = lazy(() => import('./pages/ProductList'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
    <p className="text-gray-500 font-medium">Navigating ShoppyGlobe...</p>
  </div>
);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          
          <footer className="bg-white border-t border-gray-200 py-8">
            <div className="container mx-auto px-4 text-center">
              <p className="text-gray-500 font-medium">
                &copy; {new Date().getFullYear()} ShoppyGlobe E-commerce. Built with ❤️ for excellence.
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
