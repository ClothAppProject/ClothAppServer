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
    
    // Request: GET '/webclient/upload'
    // Result: Render "upload a photo" page.
    app.get('/webclient/upload', function (req, res) {
        res.render('webclient/upload');
    });
    
    // Request: GET '/webclient/getusergallery'
    // Result: Render "Get User Gallery" page.
    app.get('/webclient/getusergallery', function (req, res) {
        res.render('webclient/usergallery');
    });
    
    // Request: GET '/webclient/getusergallery'
    // Result: Render "Get User Gallery" page.
    app.get('/webclient/getrecentphotos', function (req, res) {
        res.render('webclient/recentphotos');
    });
    
    // Request: GET '/webclient/getusergallery'
    // Result: Render "Get User Gallery" page.
    app.get('/webclient/gettopphotos', function (req, res) {
        res.render('webclient/topphotos');
    });
    
    // Request: GET '/webclient/getusergallery'
    // Result: Render "Get User Gallery" page.
    app.get('/webclient/getuserprofilephoto', function (req, res) {
        res.render('webclient/userprofilephoto');
    });
};