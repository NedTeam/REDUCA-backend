const fetch = require('isomorphic-fetch');

async function sentimentAnalysis(textToAnalyze) {
    // const oldCredentials = process.env.GOOGLE_APPLICATION_CREDENTIALS
    // process.env.GOOGLE_APPLICATION_CREDENTIALS = "ml-api-credentials.json"
    // Imports the Google Cloud client library
    const language = require('@google-cloud/language');

    // Instantiates a client
    const client = new language.LanguageServiceClient();

    const document = {
        content: textToAnalyze,
        type: 'PLAIN_TEXT',
    };

    // Detects the sentiment of the text
    const [result] = await client.analyzeSentiment({document: document});
    const sentiment = result.documentSentiment;

    let idioma = await this.detectLanguage(textToAnalyze);
    // process.env.GOOGLE_APPLICATION_CREDENTIALS = oldCredentials
    console.log("texto: "+ textToAnalyze);
    console.log("idioma: "+ idioma);

    const values = {
        score: sentiment.score,
        magnitude: sentiment.magnitude,
        lang: idioma
    };

    return values;
}

async function sentimentAnalysisFromAPI(text) {
    // let url = "https://us-central1-euvsvirus-d0165.cloudfunctions.net/testml2"
    // var request = require('request');
    //
    // var propertiesObject = { text:text };
    //
    // let promesa = new Promise((resolve, reject) => {
    //     request({url:url, qs:propertiesObject}, function(err, response, body) {
    //         if(err) { console.log(err); return; }
    //         console.log("Get response: " + response.statusCode);
    //         console.log("Get response: " + response.body);
    //         resolve(body);
    //     });
    // });

    return fetch("https://us-central1-euvsvirus-d0165.cloudfunctions.net/testml2?text="+encodeURIComponent(text))
        .then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        // .then(function(stories) {
        //     console.log(stories);
        // });


    // return await promesa;
    // var http = require("https");
    //
    // var options = {
    //     "method": "GET",
    //     "hostname": "us-central1-euvsvirus-d0165.cloudfunctions.net",
    //     "port": null,
    //     "path": encodeURI("/testml2?text="+text),
    //     "headers": {
    //         "content-length": "0"
    //     }
    // };
    //
    // let promesa = new Promise((resolve, reject) => {
    //
    //     var req = http.request(options, function (res) {
    //         var chunks = [];
    //
    //         res.on("data", function (chunk) {
    //             chunks.push(chunk);
    //         });
    //
    //         res.on("end", function () {
    //             var body = Buffer.concat(chunks);
    //             console.log(body.toString());
    //             resolve(body.toString());
    //         });
    //     });
    //
    //     req.end();
    // });

    // return promesa;
}

// const text = 'The text for which to detect language, e.g. Hello, world!';

// Detects the language. "text" can be a string for detecting the language of
// a single piece of text, or an array of strings for detecting the languages
// of multiple texts.
async function detectLanguage(text) {
    // const oldCredentials = process.env.GOOGLE_APPLICATION_CREDENTIALS
    // process.env.GOOGLE_APPLICATION_CREDENTIALS = "ml-api-credentials.json"

    // Imports the Google Cloud client library
    const {Translate} = require('@google-cloud/translate').v2;

    // Creates a client
    const translate = new Translate();

    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */
    let [detections] = await translate.detect(text);
    detections = Array.isArray(detections) ? detections : [detections];
    // process.env.GOOGLE_APPLICATION_CREDENTIALS = oldCredentials

    console.log("Detecciones: " + JSON.stringify(detections));

    // Asumimos que detections siempre va a devolver un solo lenguaje
    let lang = "";
    if (detections.length > 0) {
        lang = detections[0].language;
    }

    return lang;
}

async function translateText(text, target) {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = "ml-api-credentials.json"

    // Imports the Google Cloud client library
    const {Translate} = require('@google-cloud/translate').v2;

    // Creates a client
    const translate = new Translate();

    // Run request
    let [translations] = await translate.translate(text, target);
    translations = Array.isArray(translations) ? translations : [translations];

    // Asumimos que translations siempre va a devolver un solo lenguaje
    // console.log(translations);
    let trad = "";
    if (translations.length > 0) {
        console.log("si")
        trad = translations[0];
    } else {
        console.log("No he recibido la traducción correctamente. Fue: " + JSON.stringify(translations))
    }

    return {
        translation: trad,
        lang: target
    };
}

exports.detectLanguage = detectLanguage;
exports.sentimentAnalysis = sentimentAnalysis;
exports.translateText = translateText;

exports.sentimentAnalysisFromAPI = sentimentAnalysisFromAPI;