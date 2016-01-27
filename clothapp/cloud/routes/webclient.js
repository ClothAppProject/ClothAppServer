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
    
    // Request:	GET '/webclient/signin'
	// Result: Render web client signin page.
	app.get('/webclient/signin', function (req, res) {
		res.render('webclient/signin');
	});
    
    // Request:	GET '/webclient/getuserdata'
	// Result: Render "get user profile data" page.
	app.get('/webclient/getuserdata', function (req, res) {
		res.render('webclient/getuserdata');
	});
    
    // Request:	GET '/webclient/setuserdata'
	// Result: Render "set user profile data" page.
	app.get('/webclient/setuserdata', function (req, res) {
		res.render('webclient/setuserdata');
	});
    
    // Request:	GET '/webclient/signout'
	// Result: Render "logout" page.
	app.get('/webclient/signout', function (req, res) {
		res.render('webclient/signout');
	});
    
    // Request: Get '/webclient/upload'
    // Result: Render "upload a photo" page.
    app.get('/webclient/upload', function (req, res) {
        res.render('webclient/upload');
    });
};