
// These two lines are required to initialize Express in Cloud Code.
express = require('express');
app = express();

// Using some external files to manage routing.
require('cloud/routes/users')(app);

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'jade');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

// Request type: GET '/'
// Result: Render website homepage.
app.get('/', function(req, res) {
 	res.render('index');
});

// Attach the Express app to Cloud Code.
app.listen();
