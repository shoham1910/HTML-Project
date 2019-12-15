var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
var port = 3000;
var clientPath=path.join(__dirname,'..','Client');
var imagePath=path.join(__dirname,'..','Images');
var logInPath=path.join(clientPath,'logIn');
var contactPath=path.join(clientPath,'contact');
var signUpPath=path.join(clientPath,'signUp');

app.use('/logIn',express.static(logInPath));
app.use('/Images',express.static(imagePath));
app.use('/contact',express.static(contactPath))
app.use('/signUp',express.static(signUpPath))

app.get('/', function(req, res) {
  res.statusCode = 302;
  res.setHeader("Location", "http://localhost:"+port+"/logIn/logIn.html");
  res.end();
});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);



// var http = require('http');
// var url = require('url');
// var fs = require('fs');
// var express = require('express');
// var bodyParser = require('body-parser');
// var app = express();
// var port=3000;
// app.use("/Client/contact",express.static("./Client/contact"));
// app.use("/Client/logIn",express.static("."));

// Client.get('/', function (req, res) {
//   console.log(Client.mountpath) // /admin
//   res.sendFile(__dirname+"logIn.html");
// });



// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// app.get('/Client/contact/contact.html', function(req, res) {
// var name = req.param('name');
// var id = req.param('id');
// var mail = req.param('Email');
// var phone = req.param('phone');
// var reason = req.param('reason');
// var comment = req.param('comment'); 
// console.log("asdasdds"+ name + ' ' + id + ' ' + mail+ ' ' + phone + ' ' + reason+ ' ' + comment+"\n");
// });
// app.listen(port);

