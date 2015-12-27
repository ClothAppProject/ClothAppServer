module.exports = function (app) {

	// Request:	GET '/users'
	// Result: Test message.
	app.get('/test', function (req, res) {
		res.render('test-home');
	});
    
    // Request: POST '/users/signup'
    // Result: Create a new user with the given username, password, email.
    app.post('/test/signup', function (req, res) {
        var user = new Parse.User();
        user.set("username", req.body.username);
        user.set("password", req.body.password);
        user.set("email", req.body.email);

        user.signUp(null, {
            success: function (user) {
                // Hooray! Let them use the app now.
                res.render('test-home');
            },
            error: function (user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
                res.send(error);
            }
        });
    });
};