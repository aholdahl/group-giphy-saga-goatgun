const express = require('express');
const axios = require('axios');
require('dotenv').config();
const router = express.Router();

router.get('/:searchQuery', (req, res) => {
  console.log('in search GET', req.params.searchQuery, process.env.API_KEY);
  process.env.API_KEY;

  axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${req.params.searchQuery}`)
  .then((response) => {
    console.log('from GIPHY', response.data);
    res.send(response.data);
  })
  .catch((error) => {
    console.log('unable to GET', error);
  })
})

module.exports = router;