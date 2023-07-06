import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from './firebase.config';

export const getTokenFunc = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      'BNBHReyyT2lELbtFaRAb2jmOM5k3ID1NpIsNL1gtpALFsBmB9d6rZq-Z1F1uV55EaYUby6fjrYGWKOFdazWLKDQ',
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          'No registration token available. Request permission to generate one.'
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
