Post.hasMany(Comment, {as: 'comments',  foreignKey: 'postId'});
Post.belongsTo(User, {as: 'author', foreignKey: 'userId'});