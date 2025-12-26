
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import CartItem from '../components/CartItem';

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto bg-white p-12 rounded-3xl shadow-lg border border-gray-100">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-shopping-basket text-blue-400 text-4xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link 
            to="/" 
            className="block w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-10">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items List */}
        <div className="lg:col-span-2">
          <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          
          <div className="mt-8 flex justify-between items-center bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <span className="text-blue-800 font-medium">Ready to complete your purchase?</span>
            <Link to="/" className="text-blue-600 font-bold hover:underline">
              <i className="fas fa-plus-circle mr-2"></i> Add more items
            </Link>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-28">
            <h3 className="text-xl font-bold text-gray-900 mb-6 pb-6 border-b border-gray-100">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold text-gray-900">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span className="font-semibold text-gray-900">$0.00</span>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-extrabold text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 active:scale-[0.98]"
            >
              Proceed to Checkout
            </button>
            
            <div className="mt-6 space-y-3">
              <p className="text-xs text-gray-400 text-center">We accept these payment methods:</p>
              <div className="flex justify-center gap-4 text-2xl text-gray-300">
                <i className="fab fa-cc-visa"></i>
                <i className="fab fa-cc-mastercard"></i>
                <i className="fab fa-cc-paypal"></i>
                <i className="fab fa-apple-pay"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
