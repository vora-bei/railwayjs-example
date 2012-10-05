load('application');

action('index', function () {
    this.title = 'Testing Site Home Page';
    
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
  console.log(this);
	render();
});

