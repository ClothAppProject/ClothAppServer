module.exports = function(app) {

	// Request:	GET '/users'
	// Result: Test message.
	app.get('/users', function(req, res) {
		res.send("Welcome to /users.");
	});
	
	// Request: GET 'users/create'
	// Params: ND
	// Result: Creates a new user profile.
	app.post('/users/create', function (req, res) {
		//da implementare 
	});

	//richiedi un profilo
	app.get('/profile/:name', function (req, res) {
		var query=new Parse.Query("utenti");
		query.equalTo("name",req.params.nome);
		query.find({
		success: function(results) {      
		  res.send(results);
		},
		error: function() {
		  res.send("failed");
		}
	  });
	});
}
