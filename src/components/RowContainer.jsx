import React, { useEffect, useRef, useState } from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';
import NotFound from '../img/NotFound.svg';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');

  const [{ cartItems }, dispatch] = useStateValue();

  const addtocart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(() => {
    addtocart();
  }, [items]);

  const addItemToCart = (item) => {
    const alreadyInCart = cartItems.some((i) => i.id === item.id);
    if (!alreadyInCart) {
      setItems([...cartItems, item]);
    } else {
      const newItems = cartItems.map((i) => {
        if (i.id === item.id) {
          return { ...i, qty: i.qty + item.qty };
        }
        return i;
      });
      setItems([...newItems]);
    }
  };

  const newData = data
    ? search === ''
      ? data
      : data.filter((it) =>
          it.title.toLowerCase().includes(search.toLowerCase())
        )
    : null;

  return (
    <>
      <div className='search_div'>
        <div className='group'>
          <svg className='icon' aria-hidden='true' viewBox='0 0 24 24'>
            <g>
              <path d='M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z'></path>
            </g>
          </svg>
          <input
            placeholder='Search'
            type='search'
            className='input'
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div
        ref={rowContainer}
        className={`w-full flex items-center gap-3  my-12 scroll-smooth  ${
          flag
            ? 'overflow-x-scroll scrollbar-none'
            : 'overflow-x-hidden flex-wrap justify-center'
        }`}
      >
        {newData && newData.length > 0 ? (
          newData.map((item) => (
            <div
              key={item?.id}
              className='w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative'
            >
              <div className='w-full flex items-center justify-between'>
                <motion.div
                  className='w-20 h-20 -mt-8 drop-shadow-2xl'
                  whileHover={{ scale: 1.2 }}
                >
                  <img
                    src={item?.imageURL}
                    alt=''
                    className='w-full h-full object-contain'
                  />
                </motion.div>
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  className='w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8'
                  onClick={() => addItemToCart(item)}
                >
                  <MdShoppingBasket className='text-white' />
                </motion.div>
              </div>

              <div className='w-full flex flex-col items-end justify-end '>
                <p className='text-textColor font-semibold text-base md:text-lg'>
                  {item?.title}
                </p>
                <p className='mt-1 text-sm text-gray-500'>
                  {/* {item?.calories} Calories */}
                </p>
                <div className='flex items-center gap-8'>
                  <p className='text-lg text-headingColor font-semibold'>
                    {/* <span className="text-sm text-red-500">$</span> {item?.price} */}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='w-full flex flex-col items-center justify-center'>
            <img src={NotFound} className='h-340' />
            <p className='text-xl text-headingColor font-semibold my-2'>
              Items Not Available
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default RowContainer;
