import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { firestore } from '../firebase.config';
import { randomItem } from './functions';

// Saving new Item
export const saveItem = async (data) => {
  await setDoc(doc(firestore, 'foodItems', `${Date.now()}`), data, {
    merge: true,
  });
};

// Check food of the day is set already
const checkCanSetFood = async () => {
  const docSnap = await getDoc(doc(firestore, 'foodOfTheDay', '1'));

  if (docSnap.exists()) {
    const timestamp = docSnap.data().date;

    // Get the current date
    const currentDate = new Date();

    // Get the timestamp for the start of the current day
    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    ).getTime();

    // Get the timestamp for the end of the current day
    const endOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    ).getTime();

    // Check if the timestamp falls within the current day
    return !(timestamp >= startOfDay && timestamp < endOfDay);
  } else {
    return true;
  }
};

// Saving food of the day
export const saveFoodOfTheDay = async (data) => {
  const check = await checkCanSetFood();
  if (check) {
    await setDoc(
      doc(firestore, 'foodOfTheDay', `1`),
      {
        date: `${Date.now()}`,
        food: randomItem(data.filter((it) => it.category === 'panini')),
      },
      {
        merge: true,
      }
    );
  }
};

// getall food items
export const getFoodOfTheDay = async () => {
  const docSnap = await getDoc(doc(firestore, 'foodOfTheDay', '1'));

  if (docSnap.exists()) {
    return docSnap.data().food;
  } else {
    return null;
  }
};

// getall food items
export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, 'foodItems'), orderBy('id', 'desc'))
  );

  return items.docs.map((doc) => doc.data());
};

// Save Order
export const sendOrder = async (data) => {
  await setDoc(doc(firestore, 'orders', `${Date.now()}`), data);
};

// get all today order
export const getAllTodayOrder = async () => {
  // Get the current date and time
  const currentDate = new Date();

  // Set the time to midnight (00:00:00)
  const midnightDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    0,
    0,
    0
  );

  // Set the time to 12:30 PM (12:30:00)
  const twelveThirtyDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    13,
    40,
    0
  );

  const order = await getDocs(
    query(
      collection(firestore, 'orders'),
      where('date', '>=', midnightDate),
      where('date', '<=', twelveThirtyDate)
    )
  );

  return order.docs.map((doc) => {
    return { id: doc.id, data: doc.data() };
  });
};

// get today order by user uid
export const getUserTodayOrder = async (uid) => {
  // Get the current date and time
  const currentDate = new Date();

  // Set the time to midnight (00:00:00)
  const midnightDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    0,
    0,
    0
  );

  // Set the time to 12:30 PM (12:30:00)
  const twelveThirtyDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    12,
    40,
    0
  );

  const order = await getDocs(
    query(
      collection(firestore, 'orders'),
      where('date', '>=', midnightDate),
      where('date', '<=', twelveThirtyDate),
      where('uidUser', '==', uid)
    )
  );

  return order.docs.map((doc) => {
    return { id: doc.id, data: doc.data() };
  });
};

// cancella ordine
export const deleteOrder = async (id) => {
  await deleteDoc(doc(firestore, 'orders', id));
};
