import React, { useEffect } from 'react';
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

const App = () => {
  const [{ user }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then(async (data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
      await saveFoodOfTheDay(data);
    });
  };

  useEffect(async () => {
    await fetchData();
    await getFoodOfTheDay().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_OF_DAY,
        foodOfTheDay: data,
      });
    });
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
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
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
