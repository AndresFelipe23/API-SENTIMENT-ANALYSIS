const express = require('express');
const bodyParser = require('body-parser');
const natural = require('natural');
var Analyzer = require('natural').SentimentAnalyzer;
var stemmer = require('natural').PorterStemmer;

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res)=>{
  res.send('Holis!!');
})
// Endpoint para analizar el sentimiento del texto
app.post('/analizar_sentimiento', async function (req, res) {
  const { texto } = req.body;
  var analyzer = new Analyzer("English", stemmer, "afinn");

  // getSentiment expects an array of strings
  var result = await analyzer.getSentiment(texto.split(' '))
  await console.log(result);
  res.send({result});
  /*
  // Realizar el análisis de sentimiento
  const sentimiento = await natural.SentimentAnalyzer.sentimentOf(texto);

  // Enviar la respuesta con el resultado del análisis
  res.json({ sentimiento });*/
});

// Endpoint para tokenizar el texto
app.post('/tokenizar', (req, res) => {
  const { texto } = req.body;

  // Realizar la tokenización del texto
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(texto);

  // Enviar la respuesta con los tokens
  res.json({ tokens });
});

// Iniciar el servidor en el puerto 3000
app.listen(4000, () => {
  console.log('API de procesamiento de texto iniciada en el puerto 4000');
});
