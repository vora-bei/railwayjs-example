load('application');

before(loadMember, {only: ['show', 'edit', 'update', 'destroy']});
before(use('checkRole'));

action(function index() {
  this.title = 'Manage Users';
  User.all(function (err, users) {
    render({
      usersList: users // Do not set variable to 'users', this is reserved to Passport
    });
  });
});

action(function edit() {
  this.title = 'Edit User'; 
  
  console.log(this);
  //render();
  
  Role.all({where: {id: this.member.roleId}, order: 'name'}, function(err, roles) {
    render({ roles: roles });
  });    
  
  
});

function loadMember() {
  User.find(params.id, function (err, user) {
    if (err || !user) {
      redirect(path_to.admin_users());
    } else {
      this.member = user;
      next();
    }
  }.bind(this));
}

function loadRoles() {
  Role.find()
}