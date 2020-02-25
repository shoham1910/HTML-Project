var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
const {Client}=require('pg');//equlast to: const Client=require('pg').Client
const client=new Client({
  user:'kclwxkjlsexnif',
  password:'9ef64ab0ef6905b928e01f01ec711f83476b1a779be0ec69bff08b53a614f754',
  host:'ec2-54-247-72-30.eu-west-1.compute.amazonaws.com',
  port: 5432,
  database:'db6q7q4goe5pnk'
});
var app = express();

const port = process.env.PORT || 3000;

var myMail='contactourhtmlsite@gmail.com‬';
var myPassword='T312576101‬';



var clientPath=path.join(__dirname,'Client');
var imagePath=path.join(__dirname,'Images');
var logInPath=path.join(clientPath,'logIn');
var contactPath=path.join(clientPath,'contact');
var signUpPath=path.join(clientPath,'signUp');
var tablesPath=path.join(clientPath,'tables');




app.use('/logIn',express.static(logInPath));
app.use('/Images',express.static(imagePath));
app.use('/contact',express.static(contactPath))
app.use('/signUp',express.static(signUpPath))
app.use('/tables',express.static(tablesPath))

app.get('/Images/view.jpg',(req, res) =>{
  res.sendFile(__dirname + './Images/view.jpg');
  res.end();
});

app.get('/', async(req, res) => {
  res.statusCode=302;
  res.setHeader("Location","http://html-project2020.herokuapp.com"+"/logIn/logIn.html");
  res.end();
});

app.get('/tables', async(req, res) => {
	//res.sendFile(__dirname + './Client/logIn/logIn.html');
   //res.sendFile(window.location.href + '/logIn/logIn.html');
   begin=`<!DOCTYPE  html>
   <!-- saved from url=(0022)http://localhost:3000/ -->
   <html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <title>Page Title</title>
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.css">
   <link rel="stylesheet" href="https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css">
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
   <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
   </head><style>body{background-image: url("Images/view.jpg");background-color:lavender;}
   </style><body data-gr-c-s-loaded="true"><div><h1 style="color:lavender;text-align:center;">Users</h1></div>
   <div class="container-fluid"><div class="row"><div class="col-sm-2"></div>
   <div class="col-sm-8" style="background-color:white;"><table id="usersTable" class="table table-striped table-bordered" style="width:100%">
   <thead><tr><th>Username</th><th>Password</th></tr></thead><tbody>`

   usersTable= await loadUserData();

   middle=`</tbody><tfoot><tr><th>Username</th><th>Password</th></tr></tfoot></table></div>
   <div class="col-sm-2"></div></div><br><br><br><br><br><div><h1 style="color:lavender;text-align:center;">Data</h1></div>
   <div class="row"><div class="col-sm-2"></div><div class="col-sm-8" style="background-color:white;">
   <table id="usersDataTable" class="table table-striped table-bordered" style="width:100%">
   <thead><tr><th>Username</th><th>Data1</th><th>Data2</th><th>Lat</th><th>Long</th></tr></thead><tbody>`

   usersDataTable=await loadUsersDataTable();

   last=`</tbody><tfoot><tr><th>Username</th><th>Data1</th><th>Data2</th><th>Lat</th><th>Long</th></tr>
   </tfoot></table></div><div class="col-sm-2"></div></div></div>
   <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
   <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>
   <script src="https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js"></script>
   <script>$(document).ready(function() {$(`
   last1='`#usersTable`'
   last2=`).DataTable();});</script><script>$(document).ready(function() {$(`
   last3='`#usersDataTable`'
   last4=`).DataTable();});</script></body></html>`

   res.setHeader("content-type","text/html");
   res.send(`${begin}${usersTable}${middle}${usersDataTable}${last}${last1}${last2}${last3}${last4}`);
   res.end();
});
async function connect(){
  try{
    await client.connect();
    console.log("connected to DB")
  }
  catch(er){
    console.log(`connection error was discovered ${er}`);
  }
}

async function executeUserQuery(){
  try{
      await connect();
      const result=await client.query(`SELECT * FROM public."User"`)
      
      return result.rows;
  }
  catch(ex){
      console.log('Failed to execute '+ex)
  }
  finally{
      await client.end
  }
}

async function executeDataQuery(){
  try{
      await connect();
      const result=await client.query(`SELECT * FROM public."Data"`)
      
      return result.rows;
  }
  catch(ex){
      console.log('Failed to execute '+ex)
  }
  finally{
      await client.end
  }
}

/*window.onload=()=>{
  loadUserData();
}*/

async function loadUserData(){
  usersData=await executeUserQuery();
  console.log(usersData);
  //const userTableData=document.getElementById('usersTable');
  var usersDataHtml=``;
  for(var i = 0; i < usersData.length; i++){
    usersDataHtml+=`<tr><td>${usersData[i].Username}</td><td>${usersData[i].Password}</td></tr>`
  }
  
  //userTableData.innerHTML=usersDataHtml;
  return usersDataHtml;
}

async function loadUsersDataTable(){
  usersData=await executeDataQuery();
  console.log(usersData);
  //const userTableData=document.getElementById('usersTable');
  var usersDataHtml=``;
  for(var i = 0; i < usersData.length; i++){
    usersDataHtml+=`<tr><td>${usersData[i].Username}</td><td>${usersData[i].Data1}</td>
    <td>${usersData[i].Data2}</td><td>${usersData[i].Lat}</td><td>${usersData[i].Long}</td></tr>`
  }
  
  //userTableData.innerHTML=usersDataHtml;
  return usersDataHtml;
}




app.get('/signUp/logIn/logIn.html', (req, res) => {
	//res.sendFile(__dirname + './Client/logIn/logIn.html');
   //res.sendFile(window.location.href + '/logIn/logIn.html');
   res.statusCode=302;
   res.setHeader("Location","http://html-project2020.herokuapp.com"+"/logIn/logIn.html");
   res.end();
});

app.get('/signUp/contact.html', (req, res) => {
	//res.sendFile(__dirname + './Client/logIn/logIn.html');
   //res.sendFile(window.location.href + '/logIn/logIn.html');
   res.statusCode=302;
   res.setHeader("Location","http://html-project2020.herokuapp.com"+"/contact/contact.html");
   res.end();
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

async function executeInsertQuery(un,ps){
  try{
      await connect();
      const resu=await client.query(`SELECT * FROM public."User" WHERE "User"."Username"='${un}' AND "User"."Password"='${ps}'`)
      if(resu.rows.length>0) return false;
      await client.query(`INSERT INTO public."User"("Username", "Password") VALUES ('${un}', '${ps}');`)
      
      return true;
  }
  catch(ex){
      console.log('Failed to execute '+ex)
  }
  finally{
      await client.end
  }
}

  app.post('/signUp/signUp.html', async function(req, res) {
  var un=req.param('username');
  var ps=req.param('password');
  for(var k=0;k<ps.length;k++ ){
    ps[k]=ps[k]+3;
  }
  answer=await executeInsertQuery(un,ps);
  console.log(answer);
  if (answer){
    res.statusCode=201;
    res.setHeader("Location","http://html-project2020.herokuapp.com"+"/logIn/logIn.html");
    res.end();
  }
  else
  {
    res.setHeader("content-type","text/html");
   res.send(`<!DOCTYPE html><html><head><title>Username allready exist please return and enter other Username</title>
</head><body></body></html>`);
   res.end();
  }
});



async function executeSearchQuery(un,ps){
  try{
      await connect();
      var pps="";
      for(var k=0;k<ps.toString().length;k++ ){
        pps+=String.fromCharCode(ps.toString().charCodeAt(k)+3);
      }
      console.log(`ps=${ps}  pps=${pps}`);
      const result=await client.query(`SELECT * FROM public."User" WHERE "User"."Username"='${un}' AND "User"."Password"='${pps}'`)
      
      return result.rows;
  }
  catch(ex){
      console.log('Failed to execute '+ex)
  }
  finally{
      await client.end
  }
}

  app.post('/logIn/logIn.html', async function(req, res) {
  var un=req.param('username');
  var ps=req.param('password');
  answer=await executeSearchQuery(un,ps);
  try{
    if (answer.length>0){
      res.statusCode=302;
      res.setHeader("Location","http://html-project2020.herokuapp.com"+"/tables");
      res.end();
    }
    else
    {
      res.statusCode=404;
      res.send("Your Username or Password is wrong.")
      res.end();
    }
  }
  catch(e){
    res.statusCode=404;
      res.send("Your Username or Password is wrong.")
      res.end();
  }
});

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
          user:'shoham1910@gmail.com',
          pass:'956shoham'
      }
  });

  var mailOptions = {
      from: myMail,
      to: 'shoham1910@gmail.com',
      subject: 'We Will Contact You About:',
      text: 'Your comment about "+reason+" was sign into our system.\nYour comment is:\n"+comment'
  };


  transporter.sendMail(mailOptions,function(error, info){
        if (error){
            console.log(error);
            res.writeHead(404);
            res.end();                    
        }
        else{
            console.log('Email sent: ' + info.response);
        } 
		

  });
  res.end();
});


// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);




