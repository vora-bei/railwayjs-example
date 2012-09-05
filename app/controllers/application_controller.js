before('protect from forgery', function () {
	protectFromForgery('d388bac434929f9d4b5720e5cce934dbda710978');
});

before(function loadUser() {	
	if (!session.passport.user) {
		console.log('Not Logged In.');
		next();
	} else {
		console.log('Logged In.');
		next();
	}
});