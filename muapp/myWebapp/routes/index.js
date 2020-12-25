var express = require('express');
var router = express.Router();


// router.use(express.static('public'));
// var indexRouter = require('./routes/mainscreen/index');
/* GET home page. */
router.get('/', function(req, res, next) {
res.render('index', { title: 'AdViz' });
   res.send('Welcome');
 });

// router.get('/adviz', function (req, res) {
//   res.sendFile(__dirname + '/public/login-page.html');
// })

module.exports = router;
