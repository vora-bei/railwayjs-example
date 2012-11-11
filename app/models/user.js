User.hasMany(Post,   {as: 'posts',  foreignKey: 'userId'});
User.hasMany(Comment,   {as: 'comments',  foreignKey: 'userId'});
User.belongsTo(Role,   {as: 'roles',  foreignKey: 'roleId'});

User.prototype.getRole = function getRole() {
  console.log(this);
  return Role.findOne({ where: { id: this.roleId }}, function(err, role) {
    return role.name;
  });
}