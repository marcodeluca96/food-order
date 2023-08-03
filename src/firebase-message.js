import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from './firebase.config';

export const getTokenFunc = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      'BCWAbig5xvC3Angc43KERQJV3muDaoh0OXiMROFUk1H9LvT9URXf8Q_V4-YYtOn5F62T5IFCCRHP4Dl9NegU-h0',
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
    // console.log('onMessageListener');
    onMessage(messaging, (payload) => {
      console.log('mss list arrived');
      resolve(payload);
    });
  });
