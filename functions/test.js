// async function quickstart() {
//     // Imports the Google Cloud client library
//     const language = require('@google-cloud/language');
//
//     // Instantiates a client
//     const client = new language.LanguageServiceClient();
//
//     // The text to analyze
//     const text = 'Hello, world!';
//
//     const document = {
//         content: text,
//         type: 'PLAIN_TEXT',
//     };
//
//     // Detects the sentiment of the text
//     const [result] = await client.analyzeSentiment({document: document});
//     const sentiment = result.documentSentiment;
//
//     console.log(`Text: ${text}`);
//     console.log(`Sentiment score: ${sentiment.score}`);
//     console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
//     return sentiment;
// }
//
// console.log("a");
// console.log(quickstart());
// console.log("b");
//
// quickstart().then((result)=> {
//     console.log("81: " + JSON.stringify(result));
// })




const ai = require('./ai.js');

console.log(ai.translateText("En un lugar de la mancha de cuyo nombre no quiero acordarme, no ha mucho que un caballero de los de adarga antigua rocín flaco y galgo corredor", "zh-cn")
    .then(r => console.log(r)).catch(e => console.log(e)))
//
// let sentiments = ai.sentimentAnalysisFromAPI("Hola").then((r) => {
//     console.log(r)
// }).catch((e) => {
//     console.log(e)
// })
//
// let s = ai.sentimentAnalysisFromAPI("adios")
// console.log("pendiente" + JSON.stringify(s))



//
// function resolveAfter2Seconds(x) {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(x);
//         }, 2000);
//     });
// }
//
// async function f1() {
//     var x = await resolveAfter2Seconds(10);
//     console.log(x); // 10
// }
// f1();