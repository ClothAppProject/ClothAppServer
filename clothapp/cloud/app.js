// These two lines are required to initialize Express in Cloud Code.
express = require('express');
app = express();

// Route requests to /users
require('cloud/routes/users.js')(app);

// Route requests to a test web client
require('cloud/routes/test.js')(app);

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'jade');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/', function (req, res) {
    res.render('index');
});

// Attach the Express app to Cloud Code.
app.listen();
