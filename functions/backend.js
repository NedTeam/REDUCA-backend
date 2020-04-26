
const express = require('express');
const cors = require('cors');
const ai = require('./ai.js');

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
// app.use(myMiddleware);

// build multiple CRUD interfaces:
// app.get('/:id', (req, res) => res.send(Widgets.getById(req.params.id)));
// app.post('/', (req, res) => res.send(Widgets.create()));
// app.put('/:id', (req, res) => res.send(Widgets.update(req.params.id, req.body)));
// app.delete('/:id', (req, res) => res.send(Widgets.delete(req.params.id)));
app.get('/', (req, response) => {
    const text = req.query.text;
    ai.sentimentAnalysis(text).then((result) => {
        response.send(result);
        return result;
    }).catch((err) => {
        console.log("Error" + err);
        response.send(err);
    })
});


const appTranslate = express();

// Automatically allow cross-origin requests
appTranslate.use(cors({ origin: true }));

appTranslate.get('/', (req, response) => {
    const text = req.query.text;
    const target = req.query.lang;
    ai.translateText(text, target).then((result) => {
        response.send(result);
        return result;
    }).catch((err) => {
        console.log("Error" + err);
        response.send(err);
    })
});

let annotarSentimiento = (snap, context) => {
    // let msgId = context.params.messageId;
    // console.log("MessageId: " + msgId)

    // Get an object representing the document
    let currentInfo = snap.data();
    console.log("Nuevo valor: " + JSON.stringify(currentInfo))

    const text = currentInfo.text;
    console.log("texto es: " + text)

    // return ai.sentimentAnalysisFromAPI(text).then((result) => {
    return ai.sentimentAnalysis(text).then((result) => {
        let sentiments = result

        console.log("resultados sentimientos" + JSON.stringify(sentiments))

        let newInfo = Object.assign({}, currentInfo, sentiments)
        // let newInfo = Object.assign({}, currentInfo, {magnitude: 0.98})

        console.log("newInfo then" + JSON.stringify(newInfo))

        return snap.ref.update(newInfo);

    }).catch((err) => {
        console.log(JSON.stringify(err))
        let sentiments = {sentiments_error: err};
        let newInfo = Object.assign({}, currentInfo, sentiments)
        // let newInfo = Object.assign({}, currentInfo, {magnitude: 0.98})

        console.log("newInfo catch" + JSON.stringify(newInfo))

        return snap.ref.update(newInfo);
    })
}


exports.app = app;
exports.appTranslate = appTranslate;
exports.anotarSentimiento = annotarSentimiento;