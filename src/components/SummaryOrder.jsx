import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Loader from './Loader';
import { getAllTodayOrder } from '../utils/firebaseFunctions';
import { useStateValue } from '../context/StateProvider';
import CartContainer from './CartContainer';
import { orderSummary } from '../utils/functions';
import LoopIcon from '@mui/icons-material/Loop';

const SummaryOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [{ cartShow }, dispatch] = useStateValue();
  const [summary, setSummary] = useState(null);

  useEffect(async () => {
    setIsLoading(true);
    await getAllTodayOrder().then((res) => {
      // console.log(res);
      setSummary(orderSummary([...res]));
      setIsLoading(false);
    });
  }, []);

  const refresh = async () => {
    setIsLoading(true);
    await getAllTodayOrder().then((res) => {
      // console.log(res);
      setSummary(orderSummary([...res]));
      setIsLoading(false);
    });
  };

  // console.log(summary);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='w-full flex-col min-h-screen flex items-center justify-center'
    >
      {!isLoading && (
        <div className='flex justify-end w-full'>
          <LoopIcon
            sx={{ color: 'grey', cursor: 'pointer' }}
            onClick={refresh}
          />
        </div>
      )}
      <div className=' flex flex-col gap-4 mt-16 mr-4 ml-4 items-center justify-start text-center'>
        {!isLoading ? (
          summary ? (
            <>
              <h2 className='font-bold text-orange-600'>Summary</h2>
              <div>
                <h3 className='font-bold'>Panini: {summary.panini.totale}</h3>
                {summary.panini.extra.map((it) => (
                  <p key={it.title}>{it.qty + 'x - ' + it.title}</p>
                ))}
              </div>
              <div>
                <h3 className='font-bold'>Piadine: {summary.piadine.totale}</h3>
                {summary.piadine.extra.map((it) => (
                  <p key={it.title}>{it.qty + 'x - ' + it.title}</p>
                ))}
              </div>
              <div>
                <h3 className='font-bold'>Yogurt: {summary.yogurt.totale}</h3>
                {summary.yogurt.extra.map((it) => (
                  <p key={it.title}>{it.qty + 'x - ' + it.title}</p>
                ))}
              </div>
              <div>
                <h3 className='font-bold'>Altro: {summary.altro.totale}</h3>
                {summary.altro.extra.map((it) => (
                  <p key={it.title}>{it.qty + 'x - ' + it.title}</p>
                ))}
              </div>
              <hr
                className='w-full mt-12 mb-12 '
                style={{ border: '1px solid orange' }}
              ></hr>
              <div>
                <h3 className='text-orange-600 font-bold'>Orders</h3>
                <div>
                  {summary.orders
                    .sort((a, b) => (a.user >= b.user ? 1 : -1))
                    .map((it, i) => (
                      <div className='mt-2' key={i}>
                        <b>{it.user + ' : '}</b>
                        <ul>
                          {it.food.map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </div>
            </>
          ) : (
            <h2>No Orders</h2>
          )
        ) : (
          <Loader />
        )}
      </div>

      {cartShow && <CartContainer />}
    </motion.div>
  );
};

export default SummaryOrder;
