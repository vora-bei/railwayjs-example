load('application');


before(loadPost);

function loadPost() {
  Post.find(req.params.post_id, function (err, post) {
    if (err || !post) {
      redirect(path_to.posts);
    } else {
      this.post = post;
      next();
    }
  }.bind(this));
}

function loadUser() {
  Post.find(req.params.post_id, function (err, post) {
    if (err || !post) {
      redirect(path_to.posts);
    } else {
      this.post = post;
      next();
    }
  }.bind(this));
}

action('new', function () {
    this.title = 'New comment';
    this.comment = new comment;
    render();
});

action(function create() {
  req.body.Comment.created_at = new Date;

  if (!session.passport.user)
    next();    
  req.body.Comment.userId = session.passport.user;
  Comment.create(req.body.Comment, function (err, comment) {
    if (err) {
      flash('error', 'comment can not be created');
      render('new', {
        comment: comment,
        title: 'New comment'
      });
    } else {
      flash('info', 'comment created');
      redirect(path_to.posts(req.params.id));
    }
  });
});