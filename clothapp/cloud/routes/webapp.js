module.exports = function (app) {

	// Request:	GET '/webapp'
	// Result: Render web app home page.
	app.get('/webapp', function (req, res) {
		res.render('webapp/index');
	});
};