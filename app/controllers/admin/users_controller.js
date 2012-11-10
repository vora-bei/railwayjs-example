load('application');

before(use('checkRole'));
before(loadUser, {only: ['show', 'edit', 'update', 'destroy']});

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
  render({ member: this.member });
});

function loadUser() {
  User.find(params.id, function (err, member) {
    if (err || !member) {
      redirect(path_to.admin_users());
    } else {
      this.member = member;
      next();
    }
  }.bind(this));
}