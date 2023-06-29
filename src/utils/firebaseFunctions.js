import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { firestore } from '../firebase.config';

// Saving new Item
export const saveItem = async (data) => {
  await setDoc(doc(firestore, 'foodItems', `${Date.now()}`), data, {
    merge: true,
  });
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
    19,
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
    19,
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
