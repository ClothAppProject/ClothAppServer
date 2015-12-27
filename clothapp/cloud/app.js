// These two lines are required to initialize Express in Cloud Code.
express = require('express');
app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'jade');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/', function (req, res) {
    res.render('index');
});

//crea nuovo profilo
app.post('/user/signup', function (req, res) {
    var user = new Parse.User();
    user.set("username", req.body.username);
    user.set("password", req.body.password);
    user.set("email", req.body.email);
    
    user.signUp(null, {
        success: function (user) {
            // Hooray! Let them use the app now.
            res.send('sigup success');
        },
        error: function (user, error) {
            // Show the error message somewhere and let the user try again.
            alert("Error: " + error.code + " " + error.message);
            res.send('error');
        }
    });
});


//login al profilo
app.post('/user/login', function (req, res) {
    Parse.User.logIn(req.body.username, req.body.password, {
        success: function (user) {
            //fare cose dopo il login di successo.
            res.send('signin success');
        },
        error: function (user, error) {
            // Accesso non riuscito. Controllare l'errore per capire perché.
            res.send('error');
        }
    });
});

//richiedi un profilo
app.get('/user/:username', function (req, res) {
    var query = new Parse.Query(Parse.User);
    query.equalTo("username", req.params.username);
    query.find({
        success: function (results) {
            res.send(results);
        },
        error: function () {
            res.send("failed");
        }
    });
});





// Attach the Express app to Cloud Code.
app.listen();
