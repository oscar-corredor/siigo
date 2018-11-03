const express = require('express')
const bodyParser = require('body-parser');
const multer = require('multer');
const request = require('request');
const fs = require('fs');
const receiptProcessor = require('./receiptProcessor.js');
const config = require('./config.js').config;
// Set up the express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const upload = multer({ dest: `./` });
// var type = upload.single('recfile');
// get all todos
app.get('/receipts', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'success!'
  })
});
let bodyJSON;

app.post('/receipts', upload.single('file'), (req, res) => {
  if (!req.file) {
    console.log("No file received");
    throw new Error("A file must be sent.")

  } else {
    //Build the request parameters
    const options = {
      method: "POST",
      url: config.apiURL,
      port: 443,
      headers: {
        "Ocp-Apim-Subscription-Key": config.apiKey,
        "Content-Type": "multipart/form-data"
      },
      formData: {
        "image": fs.createReadStream(`./${req.file.filename}`)
      }
    };
    request(options, function (err, azureRes, body) {
      if (err) console.log(err);
      // console.log(res);
      bodyJSON = JSON.parse(body); 
      const processor = new receiptProcessor(bodyJSON.regions);
      processor.processRegions();
      return res.send(bodyJSON)
    });


  }
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});



