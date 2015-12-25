
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


//crea nuovo profilo
app.post('/profile/create', function (req, res) {
    //da implementare 
});

//richiedi un profilo
app.get('/profile/:nome', function (req, res) {
    var query=new Parse.Query("utenti");
    query.equalTo("nome",req.params.nome);
    query.find({
    success: function(results) {      
      res.send(results);
    },
    error: function() {
      res.send("failed");
    }
  });
});


// Attach the Express app to Cloud Code.
app.listen();
