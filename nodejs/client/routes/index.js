var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res, next) {
  res.render('map', {
    lat : 40.78854,
    lng : -73.96374
  });
});

module.exports = router;
