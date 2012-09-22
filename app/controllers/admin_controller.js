load('application');

action('index', function () {
    render({
        title: "Dashboard"
    });
});

action('logout', function() {
    req.logOut();
    flash('error', 'You are now logged out.');
    redirect('/'); 
});