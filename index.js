require("dotenv").config();
const express = require('express');
// ----------------------------------
const { isWebUri } = require('valid-url')
const { generate } = require('shortid');

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ----------------------------------
const cors = require('cors');
const app = express();

// Basic Configuration
const port = 3000;
// ------------------------------------------------
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(cors());
// ------------------------------------------------
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});
  
// -------------------------------------------------------
const Schema = mongoose.Schema;
const urlSchema = new Schema({
  original_url: String,
  short_url: String
})

const Url = mongoose.model("Url", urlSchema);

app.post('/api/shorturl', async function(req, res) {
  const bodyUrl = req.body.url;
  const urlCode = generate();

  if(!isWebUri(bodyUrl)){
    return res.json({ error: 'invalid url'})
  } else {
    try {
      let findOne = await Url.findOne({
        original_url: bodyUrl
      });
      if(findOne){
        res.json({
          original_url: findOne.original_url,
          short_url: findOne.short_url
        });
      }else{
        findOne = new Url({
          original_url: bodyUrl,
          short_url: urlCode
        });
        await findOne.save();
        res.json({
          original_url: findOne.original_url,
          short_url: findOne.short_url
        })
      }
    } catch(err) {
      console.error(err);
      res.json("Error");
    }
  }
});

app.get('/api/shorturl/:input', async function(req, res) {
  try{
    const paramsUrl = await Url.findOne({
      short_url: req.params.input
    })
    if(paramsUrl){
      return res.redirect(paramsUrl.original_url);
    }else{
      return res.json({ error: 'url not found' });
    }
  }catch(err){
    console.log(err);
    res.json({ error: 'Error' });
  }
})

// -------------------------------------------------------

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});