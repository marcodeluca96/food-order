import React, { useEffect, useState } from 'react';
import HeroBg from '../img/heroBg.png';
import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
// import PANINO_IMG from '../img/panino-generale.png';
const PANINO_IMG =
  'https://firebasestorage.googleapis.com/v0/b/food-order-4d70e.appspot.com/o/Images%2F1688110875145-panino-generale.png?alt=media&token=262e0c05-1986-4399-a88f-25827a127cc0';

const HomeContainer = ({ scrollToMenu }) => {
  const [{ foodOfTheDay }] = useStateValue();

  const [items, setItems] = useState([]);

  const [{ cartItems }, dispatch] = useStateValue();

  const addtocart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

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

  return (
    <section
      className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full '
      id='home'
    >
      <div className='py-2 flex-1 flex flex-col items-start justify-center gap-6'>
        {/* <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={Delivery}
              className="w-full h-full object-contain"
              alt="delivery"
            />
          </div>
        </div> */}

        <p className='text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor'>
          Il tuo pranzo in{' '}
          <span className='text-orange-600 text-[3rem] lg:text-[5rem]'>
            Weave
          </span>
        </p>

        <p className='text-base text-textColor text-center md:text-left md:w-[80%]'>
          Benvenuto, qui potrai ordinare il tuo pranzo. <br />
          <b>Attenzione! </b>
          <br />
          Ora si potranno effettuare più ordini (nel caso qualcuno voglia
          aggiungere qualcosa dopo) ed eliminare i vostri ordini (in caso vi sia
          passata la fame &#128514;). Tutto questo si può fare<b>
            {' '}
            entro{' '}
          </b>le <b>12:40 </b>
          del giorno corrente.
          <br />
          Se vuoi qualcosa che non è presente nel menù chiedi e ti sarà dato.
          <br />
          Grazie &#128536;
        </p>

        <button
          type='button'
          className='bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100'
          onClick={() => scrollToMenu()}
        >
          Order Now
        </button>
      </div>
      <div className='py-2 flex-1 flex items-center relative'>
        <img
          src={HeroBg}
          className=' ml-auto h-420 w-full lg:w-auto lg:h-650'
          alt='hero-bg'
        />

        <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32  py-4 gap-4 flex-wrap'>
          {/* {heroData &&
            heroData.map((n) => (
              <div
                key={n.id}
                className='  lg:w-190  p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg'
              >
                <img
                  src={n.imageSrc}
                  className='w-20 lg:w-40 -mt-10 lg:-mt-20 '
                  alt='I1'
                />
                <p className='text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4'>
                  {n.name}
                </p>

                <p className='text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3'>
                  {n.decp}
                </p>

                <p className='text-sm font-semibold text-headingColor'>
                  <span className='text-xs text-red-600'>$</span> {n.price}
                </p>
              </div>
            ))} */}

          {/* {foodOfTheDay && (
            <div className='  lg:w-190  p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg'>
              <img
                src={foodOfTheDay.imageURL}
                className='w-20 lg:w-40 -mt-10 lg:-mt-20 '
                alt='I1'
              />
              <motion.div
                whileTap={{ scale: 0.75 }}
                className='w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8'
                onClick={() => addItemToCart(foodOfTheDay)}
              >
                <MdShoppingBasket className='text-white' />
              </motion.div>
              <p className='text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4'>
                Scelta del giorno
              </p>

              <p className='text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3'>
                {foodOfTheDay.title}
              </p>

              <p className='text-sm font-semibold text-headingColor'></p>
            </div>
          )} */}
          <div className='  lg:w-190  p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg'>
            <img
              src={PANINO_IMG}
              className='w-20 lg:w-40 -mt-10 lg:-mt-20 '
              alt='I1'
            />
            <motion.div
              whileTap={{ scale: 0.75 }}
              className='w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8'
              onClick={() =>
                addItemToCart({
                  category: 'panini',
                  id: '999',
                  imageURL: PANINO_IMG,
                  qty: 1,
                  title: 'Scegli tu',
                })
              }
            >
              <MdShoppingBasket className='text-white' />
            </motion.div>
            <p className='text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4'>
              Panino a sorpresa
            </p>

            <p className='text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3'>
              {'Panino scelto dalla casa'}
            </p>

            <p className='text-sm font-semibold text-headingColor'></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
