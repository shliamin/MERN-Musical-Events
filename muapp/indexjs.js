// Routes

var express = require('express');

var app = express();
app.get('/users', function
(req,res) {
res.send("List of users");
});
app.get('/contacts', function
(req,res) {
res.send("List of contacts");
});
app.get('/',function(req,res) {
res.send('Hello World!');
});
let port = 8000;
var server = app.listen(port, () => {
  console.log
(
`Listening on port ${port}!`)
});
