load('application');

action(function index() {
    this.title = 'Posts index';
    Post.all(function (err, posts) {
      render({
        posts: posts
      });
    });
});