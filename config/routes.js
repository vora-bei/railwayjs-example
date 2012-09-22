exports.routes = function (map) {

    map.get('/admin', 'admin#index');
    		
		map.namespace('admin', function (admin) {
      admin.resources('posts');
    	admin.resources('users');
		});

		map.resources('posts', {only: ['index', 'show']});	    	
		map.resources('users', {only: ['index', 'show']});

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
