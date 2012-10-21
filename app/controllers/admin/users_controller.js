load('application');

before(use('checkRole'));

action(function index() {
  this.title = 'Users index';
  User.all(function (err, users) {
    render({
      usersList: users // Do not set variable to 'users', this is reserved to Passport
    });
  });
});