load('application');

before(use('checkRole'));
before(loadMember, {only: ['show', 'edit', 'update', 'destroy']});

action(function index() {
  this.title = 'Manage Users';
  User.all(function (err, users) {
    render({
      usersList: users // Do not set variable to 'users', this is reserved to Passport
    });
  });
});

action(function show() {
  this.title = 'User Management';
  Role.findOne({ where: { id: this.member.roleId }}, function(err, role) {
    render({ role: role });
  });  
});

action(function edit() {
  this.title = 'Edit User';
  Role.all(function(err, roles) {
    render({ roles: roles });
  });      
});

action(function update() {
  body.User.updated_at = new Date;
  this.member.updateAttributes(body.User, function (err) {
    if (!err) {
      flash('info', 'User Updated');
      redirect(path_to.admin_user(this.member));
    } else {
      flash('error', 'User info can not be updated');
      this.title = 'Edit User Details';
      render('edit');
    }
  }.bind(this));
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