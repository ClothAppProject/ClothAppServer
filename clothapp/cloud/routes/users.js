module.exports = function (app) {

	// Request:	GET '/users'
	// Result: Test message.
	app.get('/users', function (req, res) {
		res.send("Welcome to /users.");
	});
    
    /*
    // Request: POST '/users/signup'
    // Result: Create a new user with the given username, password, email.
    app.post('/users/signup', function (req, res) {
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
                // alert("Error: " + error.code + " " + error.message);
                res.send('error');
            }
        });
    });

    // Request: POST '/users/login'
    // Result: Log in a user with the given username and password.
    app.post('/users/login', function (req, res) {
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
    */

    // Request: GET '/users/:username'
    // Result: Get the user profile of the user with the given username.
    app.get("/users/:username", function (req, res) {
        var query = new Parse.Query(Parse.User);
        var name = req.params.username;
        
        console.log("NAME: " + name);
        
        query.equalTo("username", name);
        query.find({
            success: function (results) {
                res.send(results);
            },
            error: function () {
                res.send("failed");
            }
        });
    });
    
    // Request: GET '/users/:username/profilePhoto'
    // Result: Get the user profile photo of the user with the given username.
    app.get('/users/:username/profilePhoto', function (req, res) {
        // Da implementare...
        res.send('Profile Photo: Da implementare...');
    });
    
    // Request: GET '/users/:username/profileThumbnail'
    // Result: Get the user profile thumbnail of the user with the given username.
    app.get('/users/:username/profileThumbnail', function (req, res) {
        // Da implementare...
        res.send('Profile Thumbnail: Da implementare...');
    });
    
    // Request: GET '/users/:username/gallery'
    // Result: Get the gallery of the user with the given username.
    app.get('/users/:username/gallery', function (req, res) {
        // Da implementare...
        res.send('User Gallery: Da implementare...');
    });
    
    // Request: GET '/users/:username/followers'
    // Result: Get the users who follow the user with the given username.
    app.get('/users/:username/followers', function (req, res) {
        // Da implementare...
        res.send('User Followers: Da implementare...');
    });
    
    // Request: GET '/users/:username/following'
    // Result: Get the followed users of the user with the given username.
    app.get('/users/:username/following', function (req, res) {
        // Da implementare...
        res.send('Following Users: Da implementare...');
    });
    
    // Request: GET '/users/:username/shops'
    // Result: Get the favorite shops of the user with the given username.
    app.get('/users/:username/shops', function (req, res) {
        // Da implementare...
        res.send('Favorite Shops: Da implementare...');
    });
    
    // Request: GET '/users/:username/brands'
    // Result: Get the favorite brands of the user with the given username.
    app.get('/users/:username/brands', function (req, res) {
        // Da implementare...
        res.send('Favorite Brands: Da implementare...');
    });
};
