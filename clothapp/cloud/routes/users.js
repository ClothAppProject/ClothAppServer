module.exports = function (app) {
 
    // Request: GET '/users'
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
                // Accesso non riuscito. Controllare l'errore per capire perchè.
                res.send('error');
            }
        });
    });
    */
 
    // Request: GET '/users/:username'
    // Result: Get the user profile of the user with the given username.
    app.get('/users/:username', function (req, res) {
        var query = new Parse.Query(Parse.User);
        query.equalTo("username", req.params.username);
        query.find({
            success: function (results) {
                //TODO: aggiungere le informazioni a seconda se user è una persona, negozio o negozioOnline
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
        var userphoto = Parse.Object.extend("UserPhoto");
        var query = new Parse.Query(userphoto);
        query.equalTo("username", req.params.username);
        query.find({
            success: function (results) {
                //TODO: informare il client se la foto non è presente o l'utente non esiste
                var utente= results;
                res.send(utente.get("fotoProfilo"));
            },
            error: function () {
                res.send("failed");
            }
        });
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
        var photo = Parse.Object.extend("Photo");
        var query = new Parse.Query(photo);
        query.equalTo("user", req.params.username);
        query.find({
            success: function (results) {
                //TODO: informare il client se user non esiste o no foto
                if(results.lenght=== 0) res.send('no Foto');
                else res.send(results);
            },
            error: function () {
                res.send("failed");
            }
        });
    });
     
    // Request: GET '/users/:username/followers'
    // Result: Get the users who follow the user with the given username.
    app.get('/users/:username/followers', function (req, res) {
        var query = new Parse.Query(Parse.User);
        query.equalTo("username", req.params.username);
        query.find({
            success: function (results) {
                //TODO: informare il client se user non esiste o se array vuoto
                var utente= results;
                res.send(utente.get('follower'));
            },
            error: function () {
                res.send("failed");
            }
        });
    });
     
    // Request: GET '/users/:username/following'
    // Result: Get the followed users of the user with the given username.
    app.get('/users/:username/following', function (req, res) {
        var persona = Parse.Object.extend("Persona")
        var query = new Parse.Query(persona);
        query.equalTo("username", req.params.username);
        query.find({
            success: function (results) {
                //TODO: informare il client se user non esiste o se array vuoto
                var utente= results;
                res.send(utente.get('following'));
            },
            error: function () {
                res.send("failed");
            }
        });
    });
     
    // Request: GET '/users/:username/shops'
    // Result: Get the favorite shops of the user with the given username.
    app.get('/users/:username/shops', function (req, res) {
        var query = new Parse.Query(Parse.User);
        query.equalTo("username", req.params.username);
        query.find({
            success: function (results) {
                //TODO: informare client se user non esiste o se array vuoto
                var utente= results;
                res.send(utente.get('preferiti'));
            },
            error: function () {
                res.send("failed");
            }
        });
    });
     
    // Request: GET '/users/:username/shops'
    // Result: Get the favorite virtualshops of the user with the given username.
    app.get('/users/:username/virtualshops', function (req, res) {
        var query = new Parse.Query(Parse.User);
        query.equalTo("username", req.params.username);
        query.find({
            success: function (results) {
                //TODO: informare client se user non esisteo se array vuoto
                var utente= results;
                res.send(utente.get('preferitiOnline'));
            },
            error: function () {
                res.send("failed");
            }
        });
    });
     
    // Request: GET '/users/:username/brands'
    // Result: Get the favorite brands of the user with the given username.
    app.get('/users/:username/brands', function (req, res) {
       /* var query = new Parse.Query(Parse.User);
        query.equalTo("user", req.params.username);
        query.find({
            success: function (results) {
                var utente= results;
                res.send(utente.get('brand'));
            },
            error: function () {
                res.send("failed");
            }
        });
         res.send('Profile Thumbnail: Da implementare...'); */
    });
};
