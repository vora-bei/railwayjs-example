load('application');

action(function index() {
  this.title = 'Comment Management';
  Comment.all(function (err, comments) {
    render({
      comments: comments
    });
  });
});