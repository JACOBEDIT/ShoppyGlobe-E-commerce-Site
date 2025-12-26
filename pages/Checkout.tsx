
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { clearCart } from '../store/cartSlice';

const Checkout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 15;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate simple requirements
    if (!formData.fullName || !formData.email || !formData.address) {
      alert("Please fill in all required fields.");
      return;
    }

    // Success flow
    alert("Order placed successfully! Thank you for shopping with ShoppyGlobe.");
    dispatch(clearCart());
    
    // Redirect after a small delay to simulate processing
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-10">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Checkout Form */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <section>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                Shipping Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none" 
                    placeholder="John Doe"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none" 
                    placeholder="john@example.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input 
                    type="text" 
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none" 
                    placeholder="123 Main St"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none" 
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input 
                    type="text" 
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none" 
                    placeholder="10001"
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                Payment Method
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                  <input 
                    type="text" 
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none" 
                    placeholder="John Doe"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input 
                    type="text" 
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none" 
                    placeholder="0000 0000 0000 0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input 
                    type="text" 
                    name="expDate"
                    value={formData.expDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none" 
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input 
                    type="text" 
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none" 
                    placeholder="123"
                  />
                </div>
              </div>
            </section>

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg mt-4 flex items-center justify-center gap-2"
            >
              <i className="fas fa-lock"></i> Place Order (${total.toFixed(2)})
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div>
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 sticky top-28">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
            <div className="max-h-64 overflow-y-auto mb-6 pr-2">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-lg border flex-shrink-0 flex items-center justify-center">
                      <img src={item.thumbnail} alt={item.title} className="w-10 h-10 object-contain" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 truncate w-32 md:w-48">{item.title}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 pt-6 border-t border-gray-200">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-extrabold text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-8 bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4">
              <i className="fas fa-shield-check text-green-500 text-2xl"></i>
              <div>
                <p className="text-sm font-bold text-gray-900">Secure Checkout</p>
                <p className="text-xs text-gray-500">Your data is always encrypted.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
