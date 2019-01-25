const express = require('express');
const router = express.Router();
const kirjat = require('./kirjat');

/* GET books listing. */
router.get('', function(req, res, next) {
  console.log("Kokeillaan nyt sit");
    console.log(kirjat.kaikki());
  res.send(kirjat.kaikki());
});

module.exports = router;
