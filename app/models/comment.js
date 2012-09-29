Comment.belongsTo(Post, {as: 'comment', foreignKey: 'postId'});
Comment.belongsTo(User, {as: 'comment', foreignKey: 'userId'});