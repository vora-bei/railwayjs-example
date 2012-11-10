module.exports = {
  getCommentCount: function(post) {
    var commentCount = 0;
    Comment.all({ where: { postId: post.id }, order: 'created_at' }, function(err, comments) {
      if (comments) {
        commentCount = comments.length;
      }
    });
    return commentCount;
  }
};