
import React from 'react';
import { useDispatch } from 'react-redux';
import { CartItemType } from '../types';
import { removeFromCart, updateQuantity } from '../store/cartSlice';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 mb-3 shadow-sm">
      <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain" />
      </div>
      
      <div className="flex-grow min-w-0">
        <h4 className="font-semibold text-gray-900 truncate">{item.title}</h4>
        <p className="text-gray-500 text-sm">${item.price}</p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <button 
            onClick={handleDecrement}
            className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
          >
            -
          </button>
          <span className="px-4 py-1 text-sm font-medium w-12 text-center">{item.quantity}</span>
          <button 
            onClick={handleIncrement}
            className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
          >
            +
          </button>
        </div>
        
        <div className="w-24 text-right">
          <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        
        <button 
          onClick={handleRemove}
          className="text-red-400 hover:text-red-600 p-2 transition-colors"
          title="Remove item"
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
