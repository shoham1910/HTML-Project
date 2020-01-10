var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

const port = process.env.PORT || 3000;

var myMail='contactourhtmlsite@gmail.com‬';
var myPassword='T312576101‬';

var clientPath=path.join(__dirname,'Client');
var imagePath=path.join(__dirname,'Images');
var logInPath=path.join(clientPath,'logIn');
var contactPath=path.join(clientPath,'contact');
var signUpPath=path.join(clientPath,'signUp');

app.use('/logIn',express.static(logInPath));
app.use('/Images',express.static(imagePath));
app.use('/contact',express.static(contactPath))
app.use('/signUp',express.static(signUpPath))


app.get('/', (req, res) => {
	res.sendFile(__dirname + '/Client/logIn/logIn.html');
});

//app.get('/', function(req, res) {
//res.statusCode = 302;
//res.sendFile(__dirname + '/Client/logIn/logIn.html');
 //res.sendFile(path.join(__dirname + 'Client/logIn/logIn.html'));
//res.setHeader("Location", "Client/logIn/logIn.html");
//res.setHeader("Location", "http://localhost:"+port+"/logIn/logIn.html");
//res.end();
//});


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/contact/contact.html', function(req, res) {
  var name = req.param('name');
  var mail = req.param('Email');
  var phone = req.param('phone');
  var reason = req.param('reason');
  var comment = req.param('comment'); 
  // res.end(JSON.stringify(req.body));
  // console.log(name + ' ' + mail+ ' ' + phone + ' ' + reason+ ' ' + comment);

  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user:myMail,
          pass:myPassword
      },
  });

  var mailOptions = {
      from: myMail,
      to: mail,
      subject: 'We Will Contact You About:',
      text: 'Your comment about "+reason+" was sign into our system.\nYour comment is:\n"+comment'
  };

  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          console.log(error);
      } else {
          console.log('Email sent: ' + info.response);
      }
  });
});


// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);




