exports.routes = function (map) {
		
		map.namespace('admin', function (admin) {
    	admin.resources('posts');
		});

		map.resources('posts', {only: ['index', 'show']});
	    	
		map.resources('users');

		map.get('/about', 'main#about');
		map.get('/contact', 'main#contact');
		map.get('/login', 'account#login');
		map.get('/logout', 'account#logout');

    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');

		map.root('main#index');
};
