load('application');


action('index', function () {
    this.title = 'Testing Site Home Page';
		var user = '*not logged in*';
		if (session.passport.user) {
			user = session.passport.user.displayName
		}
		Post.all(function (err, posts) {
			render({ posts: posts, user: user });
		});
		// Do not attempt to render more?
		console.log(this);
});

action('about', function() {
	this.title = 'about this site';
	render();
});

action('contact', function() {
	this.title = 'contact us';
	render();
});
