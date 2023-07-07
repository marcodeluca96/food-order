// // Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js'
);

// // Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: 'AIzaSyCohspPgGtY6YYrnw-lOyNdmgCJejvNzoI',
  authDomain: 'food-order-4d70e.firebaseapp.com',
  projectId: 'food-order-4d70e',
  storageBucket: 'food-order-4d70e.appspot.com',
  messagingSenderId: '347718196210',
  appId: '1:347718196210:web:06c4553f60a39bde90a96b',
};

firebase.initializeApp(firebaseConfig);

// // Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
