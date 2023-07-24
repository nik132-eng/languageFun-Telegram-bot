require('dotenv').config(); // Load environment variables from .env file

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

app.use(bodyParser.json()); // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
); // for parsing application/x-www-form-urlencoded

// This is the route the API will call
app.post("/new-message", function (req, res) {
  const { message } = "H";

  // Each message contains "text" and a "chat" object, which has an "id" representing the chat ID

  if (!message || !message.text || message.text.trim() === "") {
    // In case a message is not present or if the message text is empty, do nothing and return an empty response
    return res.end();
  }

  // If we've gotten this far, it means that we have received a non-empty message.
  // Respond by hitting the Telegram bot API and replying to the appropriate chat_id with the word "Polo!!"
  axios
    .post(`https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}/sendMessage`, {
      chat_id: message.chat.id,
      text: "Polo!!",
    })
    .then((response) => {
      // We get here if the message was successfully posted
      console.log("Message posted");
      res.end("ok");
    })
    .catch((err) => {
      // ...and here if it was not
      console.log("Error:", err);
      res.end("Error: " + err);
    });
});

// Finally, start our server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Telegram app listening on port ${port}!`);
});
