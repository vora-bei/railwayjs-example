load('application');

action('index', function () {
    this.title = 'Testing Site Home Page';
		var userName = null;
		if (session.passport.user) {
			User.find(session.passport.user, function(err, user) {
				userName = user.displayName; 
			});
		}
    
    var allUsers;
    User.all(function(err, users) {
        if (!err) {
            allUsers = "They ain't none."
        }
        allUsers = users;
    });
    
		Post.all({order: 'created_at desc'}, function (err, posts) {
			render({ 
				posts: posts 
			,	user: userName
      , allUsers: allUsers 
			});
		});
});

action('about', function() {
	this.title = 'about this site';
	render();
});

action('contact', function() {
	this.title = 'contact us';
	render();
});

