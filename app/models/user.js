User.hasMany(Post,   {as: 'posts',  foreignKey: 'userId'});
User.belongsTo(Role,   {as: 'roles',  foreignKey: 'userId'});