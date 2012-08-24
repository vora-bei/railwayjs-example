load('application');

action('index', function () {
    this.title = 'Testing Site Home Page';
		var userName = '*not logged in*';
		if (session.passport.user) {
			User.find(session.passport.user, function(err, user) { 
				console.log(user);
				userName = user.displayName; 
			});
		}
		Post.all(function (err, posts) {
			render({ 
				posts: posts, 
				user: userName 
			});
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

