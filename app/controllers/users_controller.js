load('application');

function loadUser() {
    User.find(params.id, function (err, user) {
        if (err || !user) {
            redirect(path_to.users());
        } else {
            this.user = user;
            next();
        }
    }.bind(this));
}

