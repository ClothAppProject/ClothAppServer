module.exports = function(app) {

	// Request: GET '/users'
	// Result: Test message.
	app.get("/users", function(req, res) {
		res.send("Welcome to /users.");
	});
}
