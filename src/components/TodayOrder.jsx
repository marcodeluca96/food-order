import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Loader from './Loader';
import { deleteOrder, getUserTodayOrder } from '../utils/firebaseFunctions';
import { useStateValue } from '../context/StateProvider';
import CartContainer from './CartContainer';
import { isTimeInRange } from '../utils/functions';

const TodayOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [{ cartShow, user }, dispatch] = useStateValue();
  const [order, setOrder] = useState([]);

  useEffect(async () => {
    setIsLoading(true);
    await getUserTodayOrder(user.uid).then((res) => {
      setOrder([...res]);
      setIsLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    await deleteOrder(id);
    await getUserTodayOrder(user.uid).then((res) => {
      setOrder([...res]);
      setIsLoading(false);
    });
  };

  // console.log(order);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='w-full min-h-screen flex items-center justify-center'
    >
      <div className=' flex flex-col gap-4 mt-16 mr-4 ml-4 items-center justify-start text-center'>
        {!isLoading ? ( 
        
        order.length>0 ? (
          order.map((it) => (
            <div key={it.id} className='mb-2'>
              <h3 className='mb-2'>
                Ordine n° <b>{it.id}</b>
              </h3>
              {it.data.order.map((or) => (
                <div
                  key={or?.id}
                  className='w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative'
                >
                  <div className='w-full flex items-center justify-between'>
                    <motion.div
                      className='w-20 h-20 -mt-8 drop-shadow-2xl'
                      whileHover={{ scale: 1.2 }}
                    >
                      <img
                        src={or?.imageURL}
                        alt=''
                        className='w-full h-full object-contain'
                      />
                    </motion.div>
                  </div>

                  <div className='w-full flex flex-col items-end justify-end '>
                    <p className='text-textColor font-semibold text-base md:text-lg'>
                      {or?.title}
                    </p>
                    <p className='mt-1 text-sm text-gray-500'>
                      Quantity: {or?.qty}
                    </p>
                    <div className='flex items-center gap-8'>
                      <p className='text-lg text-headingColor font-semibold'>
                        {/* <span className="text-sm text-red-500">$</span> {item?.price} */}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isTimeInRange() && (
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  type='button'
                  className='w-full p-2 rounded-full bg-gradient-to-tr from-red-400 to-red-600 text-gray-50 text-lg my-2 hover:shadow-lg'
                  onClick={() => handleDelete(it.id)}
                >
                  Cancella
                </motion.button>
              )}
            </div>
          ))
        ): <h2>No Orders yet</h2>) : (
          <Loader />
        )}
      </div>

      {cartShow && <CartContainer />}
    </motion.div>
  );
};

export default TodayOrder;
