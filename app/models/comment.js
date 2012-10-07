Comment.belongsTo(Post, {as: 'post', foreignKey: 'postId'});
Comment.belongsTo(User, {as: 'author', foreignKey: 'userId'});