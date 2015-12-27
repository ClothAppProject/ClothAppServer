module.exports = function (app) {

	// Request:	GET '/users'
	// Result: Test message.
	app.get('/test', function (req, res) {
		res.send("Welcome to /test.");
	});
};