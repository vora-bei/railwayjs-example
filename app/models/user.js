User.hasMany(Post,   {as: 'posts',  foreignKey: 'userId'});
User.hasMany(Comment,   {as: 'comments',  foreignKey: 'userId'});
User.belongsTo(Role,   {as: 'roles',  foreignKey: 'userId'});