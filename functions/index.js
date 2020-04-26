const functions = require('firebase-functions');
const app = require('./backend');
// const appTranslate = require('./backend');

exports.helloWorld = functions
    .region('europe-west1')
    .https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});
//
// exports.testml = functions.https.onRequest((request, response) => {
//  quickstart().then((result) => {
//   response.send(result);
//   return result;
//  }).catch((err) => {
//   console.log("Error" + err);
//   response.send(err);
//  })
// });

// Expose Express API as a single Cloud Function:
exports.testml2 = functions
    .region('europe-west1')
    .https.onRequest(app.app);

exports.annotateSentiment = functions.firestore
.document('chat/{messageId}')
.onCreate(app.anotarSentimiento);

exports.annotateSentimentOnCaptions = functions.firestore
.document('transcripts/{messageId}')
.onCreate(app.anotarSentimiento);

// exports.translateText = functions.firestore
// .document('transcripts/{id}')
// .onCreate((snap, context) => {
//  let currentInfo = snap.data();
//  let translations = {
//    en: "Hello world",
//    es: "Hola Mundo"
//  }
//  let newInfo = Object.assign({}, currentInfo, translations)
//  return snap.ref.update(newInfo);
// })

exports.translate = functions
    .region('europe-west1')
    .https.onRequest(app.appTranslate);