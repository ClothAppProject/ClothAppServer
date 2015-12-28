module.exports = function (app) {

	// Request:	GET '/webclient'
	// Result: Render web client home page.
	app.get('/webclient', function (req, res) {
		res.render('webclient/index');
	});
    
    // Request:	GET '/webclient/signup'
	// Result: Render web client signup page.
	app.get('/webclient/signup', function (req, res) {
		res.render('webclient/signup');
	});
    
    // Request: POST '/webclient/signup'
    // Result: Create a new user with the given username, password, email.
    /*app.post('/webclient/signup', function (req, res) {
        var user = new Parse.User();
        user.set('username', req.body.username);
        user.set('password', req.body.password);
        user.set('email', req.body.email);
        user.set('name', req.body.firstName);
        user.set('lastname', req.body.lastName);
        user.set('date', req.body.date);

        user.signUp(null, {
            success: function (user) {
                res.redirect('/webclient');
            },
            error: function (user, error) {
                res.send(error);
            }
        });
    });*/
    
    // Request:	GET '/webclient/signin'
	// Result: Render web client signin page.
	app.get('/webclient/signin', function (req, res) {
		res.render('webclient/signin');
	});
    
    // Request: POST '/webclient/signin'
    // Result: Log in the user with the given username and password.
    /*app.post('/webclient/signin', function (req, res) {
        Parse.User.logIn(req.body.username, req.body.password, {
            success: function(user) {
                var currentUser = Parse.User.current();
                res.send(currentUser.get('username'));
                // res.redirect('/webclient');
            },
            error: function(user, error) {
                res.send(error.message);
            }
        });
    });*/
    
    // Request:	GET '/webclient/getuserdata'
	// Result: Render "get user profile data" page.
	app.get('/webclient/getuserdata', function (req, res) {
		res.render('webclient/getuserdata');
	});
    
    // Request:	GET '/webclient/setuserdata'
	// Result: Render set user profile data" page.
	app.get('/webclient/setuserdata', function (req, res) {
		res.render('webclient/setuserdata');
	});
    
    // Request:	GET '/webclient/signout'
	// Result: Render set user profile data" page.
	app.get('/webclient/signout', function (req, res) {
		res.render('webclient/signout');
	});
    
    // Request: POST '/webclient/upload'
    // Result: Upload a new photo for the user with the given username.
    app.post('/webclient/upload', function (req, res) {
        res.send('Uploading...');
    });
    
    // Request: POST '/webclient/upload'
    // Result: Upload a new photo for the user with the given username.
    app.post('/webclient/update', function (req, res) {
        var query = new Parse.Query(Parse.User);
        query.equalTo('username', req.body.username);
        
        query.find().then(function (results) {
            console.log('Query success');
            return results[0].save({name: 'nome01'});
            
        }).then(function (obj) {
            console.log('Save success');
            res.send('success');
            
        }, function (error) {
            console.log('Save fail');
            console.log(error.code);
            console.log(error.message);
            res.send('error');
            
        })
    });
};