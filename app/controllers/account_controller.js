load('application');

action('login', function () {
    render({
        title: "Login"
    });
});

action('logout', function() {
    req.logOut();
    flash('error', 'You are now logged out.');
    redirect('/'); 
});