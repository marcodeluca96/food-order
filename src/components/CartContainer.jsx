import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { RiRefreshFill } from 'react-icons/ri';

import { motion } from 'framer-motion';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import EmptyCart from '../img/emptyCart.svg';
import CartItem from './CartItem';
import { sendOrder } from '../utils/firebaseFunctions';
import { Timestamp } from 'firebase/firestore';
import { isTimeInRange } from '../utils/functions';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase.config';

const CartContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [search, setSearch] = useState('');
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // const [tot, setTot] = useState(0);
  const navigate = useNavigate();

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem('user', JSON.stringify(providerData[0]));
    } else {
      // setIsMenu(!isMenu);
    }
  };

  useEffect(() => {
    // let totalPrice = cartItems.reduce(function (accumulator, item) {
    //   return accumulator + item.qty * item.price;
    // }, 0);
    // setTot(totalPrice);
    // console.log(tot);
    // }, [tot, flag]);
  }, [flag]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });

    localStorage.setItem('cartItems', JSON.stringify([]));
  };

  const handleOrder = async () => {
    const orderData = {
      uidUser: user.uid,
      email: user.email,
      username: user.displayName,
      date: Timestamp.now(),
      order: [...cartItems],
      note: search,
    };

    await sendOrder(orderData).then(() => {
      clearCart();
      dispatch({
        type: actionType.SET_CART_SHOW,
        cartShow: false,
      });
      navigate('/today-order');
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className='fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]'
    >
      <div className='w-full flex items-center justify-between p-4 cursor-pointer'>
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className='text-textColor text-3xl' />
        </motion.div>
        <p className='text-textColor text-lg font-semibold'>Cart</p>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className='flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base'
          onClick={clearCart}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {/* bottom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className='w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col justify-between pb-20'>
          {/* cart Items section */}
          <div className='w-full md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none cart-container'>
            {/* cart Item */}
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  setFlag={setFlag}
                  flag={flag}
                />
              ))}
          </div>

          {/* cart total section */}
          <div className='w-full  bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-end px-8 py-2'>
            {/* <div className='w-full flex items-center justify-between'>
              <p className='text-gray-400 text-lg'>Sub Total</p>
              <p className='text-gray-400 text-lg'>$ {tot}</p>
            </div> */}
            {/* <div className='w-full flex items-center justify-between'>
              <p className='text-gray-400 text-lg'>Delivery</p>
              <p className='text-gray-400 text-lg'>$ 2.5</p>
            </div> */}

            {/* <div className='w-full border-b border-gray-600 my-2'></div> */}

            {/* <div className='w-full flex items-center justify-between'>
              <p className='text-gray-200 text-xl font-semibold'>Total</p>
              <p className='text-gray-200 text-xl font-semibold'>
                ${tot + 2.5}
              </p>
            </div> */}

            {user ? (
              <>
                <div className='note_div'>
                  <input
                    placeholder='Note aggiuntive'
                    type='text'
                    className='note_input'
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  type='button'
                  className='w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg'
                  onClick={() => {
                    if (isTimeInRange()) handleOrder();
                  }}
                >
                  {isTimeInRange() ? 'Order' : 'Fuori Orario'}
                </motion.button>
              </>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type='button'
                className='w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg'
                onClick={login}
              >
                Login to Order
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className='w-full h-full flex flex-col items-center justify-center gap-6'>
          <img src={EmptyCart} className='w-300' alt='' />
          <p className='text-xl text-textColor font-semibold'>
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
