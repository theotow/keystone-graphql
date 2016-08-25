var firebase = require("firebase");

// Initialize the app with a custom auth variable, limiting the server's access
try{
  firebase.initializeApp({
    databaseURL: process.env.DB_URL,
  	serviceAccount: {
      projectId: process.env.DB_ID,
      clientEmail: process.env.C_EMAIL,
      privateKey: process.env.KEY
		}
  });
} catch (e) {
  firebase.initializeApp({
		databaseURL: process.env.DB_URL,
  	serviceAccount: {
      projectId: process.env.DB_ID,
      clientEmail: process.env.C_EMAIL,
      privateKey: process.env.KEY
		}
  }, 'fb' + Math.random());
}


module.exports = firebase
