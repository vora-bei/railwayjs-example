load('application');

before(loadPost, {only: ['show']});
before(loadCommentor, {only: ['show']});

action(function index() {
    this.title = 'Posts index';
    Post.all(function (err, posts) {
        render({
          posts: posts
        });
    });
});

action(function show() {
  this.title = this.post.title;
  this.comment = new Comment;
  
  // Get the Author of this Post
  User.find(this.post.userId, function (err, user) {
    if (!err || user) {
     this.author = user;
     next();
   }
  }.bind(this));
  
  Comment.all({where: {postId: params.id}, order: 'created_at'}, function(err, comments) {
    render({ comments: comments });
  });  
});

function loadCommentor() {
  this.commentor = null;
  if (session.passport.user) {
    User.find(session.passport.user, function (err, user) {
      if (!err || user) {
        this.commentor = user;
        next();
      } 
    }.bind(this));
  }
  next();
}

function loadPost() {
  Post.find(params.id, function (err, post) {
    if (err || !post) {
      redirect(path_to.posts());
    } else {
      this.post = post;
      next();
    }
  }.bind(this));
}