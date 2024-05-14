const express = require('express');
const fs = require('fs');
const subscriptions = require('./subscriptions.json');

const app = express();

// Somebody asked a question about middleware.
// function(req, res, next) {
//   Check the request to see if form data was submitted. If that was the case. We set req.body
//   req.body = ExtractedDataFromHTTPRequest.
//   next();
// }
app.use(express.urlencoded({ extended: true }));

// POST http://localhost:3000/subscribe
app.post('/subscribe', function(req, res) {
  // console.log for your reference, but should be removed.
  console.log('Request body:', req.body)

  // Before you push, check if the email doesnt already exist. If so, either send back an error or just assume success in silence (user will think it subscribed).
  // hint: use Array .find function
  const alreadyExists = false; // todo
  if (alreadyExists) {
    return res.status(422).send('you are already subscribed!')
  }

  subscriptions.push({
    email: req.body.email
  });
  const fileContent = JSON.stringify(subscriptions, null, 2);
  fs.writeFileSync('./subscriptions.json', fileContent, { encoding: 'utf-8' });
  return res.send('you were subscribed!!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
