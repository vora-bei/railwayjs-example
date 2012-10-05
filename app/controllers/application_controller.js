before('protect from forgery', function () {
	protectFromForgery('d388bac434929f9d4b5720e5cce934dbda710978');
});

before(loadUser);

function loadUser() {
	this.userName = null;
	if (session.passport.user) {
		User.find(session.passport.user, function(err, user) {
			if (!err || user) {
        this.userName = user.displayName;
        next();
      }
		}.bind(this));
	} else {
		next();
	}
}