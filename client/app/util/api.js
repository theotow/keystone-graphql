var config = {
  apiKey: 'AIzaSyDVMOsSqmPB5tKMfzXSsCtwexGsEsdcE7c',
  authDomain: 'testfirebase-36c44.firebaseapp.com',
  databaseURL: 'https://testfirebase-36c44.firebaseio.com',
  storageBucket: 'testfirebase-36c44.appspot.com',
};

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
firebase.initializeApp(config);
firebase.database.enableLogging(true);

export const firebaseInstance = firebase;
