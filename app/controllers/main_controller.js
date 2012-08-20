load('application');


action('index', function () {
    this.title = 'Testing Site Home Page';
		Post.all(function (err, posts) {
			render({ posts: posts });
		});
		// Do not attempt to render more?
		console.log(this);
});
