const fs = require('fs');
const csv = require('csv-parser');
const readline = require('readline');
const { containerBootstrap } = require('@nlpjs/core');
const { Nlp } = require('@nlpjs/nlp');
const { LangEn } = require('@nlpjs/lang-en-min');

// Initialize the NLP model and container
(async () => {
  const container = await containerBootstrap();
  container.use(Nlp);
  container.use(LangEn);
  const nlp = container.get('nlp');
  nlp.settings.autoSave = false;
  nlp.addLanguage('en');

  // Create an array to store CSV data from intent-question.csv
  const data = [];

  // Parse the CSV file and add data to the array
  fs.createReadStream('text-intent.csv')
    .pipe(csv())
    .on('data', (row) => {
      data.push({ text: row.text, intent: row.intent });
    })
    .on('end', async () => {
      // Add documents and intents from the CSV data
      data.forEach((row) => {
        nlp.addDocument('en', row.text, row.intent);
      });

      // Create an array to store CSV data from intent-answer.csv
      const answerData = [];

      // Parse the intent-answer CSV file and add data to the array
      fs.createReadStream('intent-answer.csv')
        .pipe(csv())
        .on('data', (row) => {
          answerData.push({ intent: row.intent, answer: row.answer });
        })
        .on('end', async () => {
          // Add answers for intents from the CSV data
          answerData.forEach((row) => {
            nlp.addAnswer('en', row.intent, row.answer);
          });

          // Train the NLP model
          await nlp.train();

          // Create an interface for reading user input
          const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
          });

          // Prompt the user for input
          rl.question('Enter your query: ', async (userInput) => {
            // Process the user's query
            const response = await nlp.process('en', userInput);

            // Display the response
            console.log('User Input:', userInput);
            console.log('Intent:', response.intent);
            console.log('Answer:', response.answer);

            // Close the readline interface
            rl.close();
          });
        });
    });
})();



// const { containerBootstrap } = require('@nlpjs/core');
// const { Nlp } = require('@nlpjs/nlp');
// const { LangEn } = require('@nlpjs/lang-en-min');

// (async () => {
//   const container = await containerBootstrap();
//   container.use(Nlp);
//   container.use(LangEn);
//   const nlp = container.get('nlp');
//   nlp.settings.autoSave = false;
//   nlp.addLanguage('en');

//   // Adds the utterances and intents for the NLP
//   nlp.addDocument('en', 'goodbye for now', 'greetings.bye');
//   nlp.addDocument('en', 'bye bye take care', 'greetings.bye');
//   nlp.addDocument('en', 'okay see you later', 'greetings.bye');
//   nlp.addDocument('en', 'bye for now', 'greetings.bye');
//   nlp.addDocument('en', 'i must go', 'greetings.bye');
//   nlp.addDocument('en', 'hello', 'greetings.hello');
//   nlp.addDocument('en', 'hi', 'greetings.hello');
//   nlp.addDocument('en', 'howdy', 'greetings.hello');

//   // Add more intents for guiding users to links
//   nlp.addDocument('en', 'where can I find documentation?', 'link.documentation');
//   nlp.addDocument('en', 'show me the contact information', 'link.contact');
//   nlp.addDocument('en', 'I need help with something', 'link.help');
//   // Add more examples for link-based queries

//   // Train also the NLG
//   nlp.addAnswer('en', 'greetings.bye', 'Till next time');
//   nlp.addAnswer('en', 'greetings.bye', 'see you soon!');
//   nlp.addAnswer('en', 'greetings.hello', 'Hey there!');
//   nlp.addAnswer('en', 'greetings.hello', 'Greetings!');
//   nlp.addAnswer('en', 'greetings.hello', 'konichiwa!');

//   // Add responses with links
//   nlp.addAnswer('en', 'link.documentation', 'You can find the documentation [here](https://example.com/docs)');
//   nlp.addAnswer('en', 'link.contact', 'Our contact information is available [here](https://example.com/contact)');
//   nlp.addAnswer('en', 'link.help', 'For assistance, visit [this link](https://example.com/help)');
//   // Add more link-based responses

//   await nlp.train();

//   // Process user input
//   const userInput = 'i need help where can i contact you peeps?';
//   const response = await nlp.process('en', userInput);

//   // Retrieve and display the chatbot's response
//   console.log(response.answer);
// })();




//v2
// const { containerBootstrap } = require('@nlpjs/core');
// const { Nlp } = require('@nlpjs/nlp');
// const { LangEn } = require('@nlpjs/lang-en-min');

// (async () => {
//   const container = await containerBootstrap();
//   container.use(Nlp);
//   container.use(LangEn);
//   const nlp = container.get('nlp');
//   nlp.settings.autoSave = false;
//   nlp.addLanguage('en');
//   // Adds the utterances and intents for the NLP
//   nlp.addDocument('en', 'goodbye for now', 'greetings.bye');
//   nlp.addDocument('en', 'bye bye take care', 'greetings.bye');
//   nlp.addDocument('en', 'okay see you later', 'greetings.bye');
//   nlp.addDocument('en', 'bye for now', 'greetings.bye');
//   nlp.addDocument('en', 'i must go', 'greetings.bye');
//   nlp.addDocument('en', 'hello', 'greetings.hello');
//   nlp.addDocument('en', 'hi', 'greetings.hello');
//   nlp.addDocument('en', 'howdy', 'greetings.hello');
  
//   // Train also the NLG
//   nlp.addAnswer('en', 'greetings.bye', 'Till next time');
//   nlp.addAnswer('en', 'greetings.bye', 'see you soon!');
//   nlp.addAnswer('en', 'greetings.hello', 'Hey there!');
//   nlp.addAnswer('en', 'greetings.hello', 'Greetings!');
//   nlp.addAnswer('en', 'greetings.hello', 'konichiwa!');
//   await nlp.train();
//   const response = await nlp.process('en', 'bye i should get going');
//   console.log(">>>>\n\n\n");
//   console.log(response.answer);
// })();








//v1
// const fs = require('fs');
// const csv = require('csv-parser');
// const natural = require('natural');
// const readline = require('readline'); // Import the readline module

// // Create a new Bayesian classifier
// const classifier = new natural.BayesClassifier();

// // Function to preprocess text (e.g., lowercasing and tokenization)
// function preprocessText(text) {
//   return text.toLowerCase().split(/\s+/);
// }

// // Read the CSV file and train the classifier
// fs.createReadStream('dataset.csv')
//   .pipe(csv())
//   .on('data', (row) => {
//     const text = preprocessText(row.text);
//     const label = row.label;

//     classifier.addDocument(text, label);
//   })
//   .on('end', () => {
//     // Train the classifier
//     classifier.train();

//     // Create a readline interface to get input from the terminal
//     const rl = readline.createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });

//     // Prompt the user for input text
//     rl.question('Enter text for sentiment analysis: ', (textToClassify) => {
//       rl.close();

//       const preprocessedText = preprocessText(textToClassify);
//       const classification = classifier.classify(preprocessedText);

//       console.log(`Sentiment: ${classification}`);
//     });
//   });
