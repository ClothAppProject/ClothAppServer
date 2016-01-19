// These two lines are required to initialize Express in Cloud Code.
express = require('express');
app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'jade');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

// Route requests to /users
require('cloud/routes/users.js')(app);

// Route requests to a test web client
require('cloud/routes/webclient.js')(app);

//app.get('/user:id',function(req,res)){
	//var query=new Parse.Query(Users);
    //var result=query.equalTo(objectId,req.id);	
//	res.send(req.id);}
app.get('/reset_psw', function (req, res) {
	res.render('reset_psw'); 
});

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/', function (req, res) {
    res.render('index');
});
//sto testando github
// Attach the Express app to Cloud Code.
app.listen();
