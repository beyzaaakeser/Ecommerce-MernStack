import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/slice/cartSlice'; // clearCart'ı import ettik
import { Link } from 'react-router-dom';

const Cart = () => {
  const { carts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const deleteItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart()); // Tüm sepeti temizler
  };

  return (
    <div className="min-h-screen">
      {carts?.length > 0 ? (
        <div>
          {carts?.map((cart, index) => (
            <div
              key={index}
              className="flex items-center justify-between border mb-2 p-2 px-4"
            >
              <img src={cart?.image.url} alt="" className="w-40" />
              <div className="text-2xl font-bold">{cart?.name}</div>
              <div className="text-xl font-semibold">{cart?.price}₺</div>
              <div
                onClick={() => deleteItem(cart?.id)}
                className="cursor-pointer w-[100px] h-10 flex items-center justify-center rounded-md bg-amber-500 text-white"
              >
                Remove
              </div>
            </div>
          ))}
          <div className="w-full flex justify-end px-4 cursor-pointer">
            <div
              onClick={handleClearCart} // Doğru fonksiyon adıyla çağırılıyor
              className="w-[100px] h-10 flex items-center justify-center rounded-md bg-red-500 text-white"
            >
              Clear Cart
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col space-y-5 h-screen">
          <h1 className="text-4xl font-semibold">Cart is empty.</h1>
          <div>
            You can visit{' '}
            <Link to={'/'} className="text-blue-600 font-semibold">
              Home Page
            </Link>{' '}
            to see products.
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
