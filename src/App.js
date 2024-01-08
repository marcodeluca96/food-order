import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CreateContainer, Header, MainContainer } from './components';
import { useStateValue } from './context/StateProvider';
import {
  getAllFoodItems,
  getFoodOfTheDay,
  saveFoodOfTheDay,
} from './utils/firebaseFunctions';
import { actionType } from './context/reducer';
import TodayOrder from './components/TodayOrder';
import AdminOrder from './components/AdminOrder';
// import { getTokenFunc, onMessageListener } from './firebase-message';
import SummaryOrder from './components/SummaryOrder';

const PopupAtStart = ({ closePopup }) => {
  return (
    <div className='popup-at-start'>
      <div>
        <p>
          Per facilizzare e velocizzare il lavoro delle commesse vi prego di
          scegliere il panino a sorpresa in modo da unificare gli ordini, sempre
          che non abbiate particolari esigenza/intolleranze.
        </p>
        <button
          type='button'
          className='bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100'
          onClick={() => {
            closePopup();
          }}
        >
          Chiudi
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [{ user }, dispatch] = useStateValue();
  // const [isTokenFound, setTokenFound] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  // const [notification, setNotification] = useState({ title: '', body: '' });

  const fetchData = async () => {
    await getAllFoodItems().then(async (data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
      await saveFoodOfTheDay(data);
    });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    fetchData();
    getFoodOfTheDay().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_OF_DAY,
        foodOfTheDay: data,
      });
    });
    // getTokenFunc(setTokenFound);
    // onMessageListener()
    //   .then((payload) => {
    //     setShow(true);
    //     setNotification({
    //       title: payload.notification.title,
    //       body: payload.notification.body,
    //     });
    //     console.log(payload);
    //   })
    //   .catch((err) => console.log('failed: ', err));
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      {showPopup && <PopupAtStart closePopup={closePopup} />}
      <div className='w-screen h-auto flex flex-col bg-primary'>
        <Header />
        <main className='mt-14 md:mt-20 px-4 md:px-16 py-4 w-full'>
          <Routes>
            <Route path='/*' element={<MainContainer />} />
            <Route path='/createItem' element={<CreateContainer />} />
            <Route path='/today-order' element={<TodayOrder />} />
            {user && user.email === 'marco.deluca@weavesrl.com' && (
              <Route path='/admin-order' element={<AdminOrder />} />
            )}
            {user && <Route path='/summary-order' element={<SummaryOrder />} />}
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
