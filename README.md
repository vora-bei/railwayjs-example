railwayjs-example
=================

Example RailwayJS Example, no real use-case yet.

* Railway is built on the [ExpressJS]() framework.
* Templates are using [ejs](https://github.com/visionmedia/ejs).
* ORM is [Juggling DB](https://github.com/1602/jugglingdb).
* This example is using Twitter Bootstrap throughout, but not through a plugin.
* This app also uses [Railway-Passport](https://github.com/1602/Railway-passport), and offers (currently) authentication through Google.

DB Setup (mysql)
----------------

	mysql> CREATE DATABASE testingsite;
	mysql> GRANT ALL PRIVILEGES ON testingsite.* TO "testing-site"@"localhost" IDENTIFIED BY "th1s1sMYt3st1ngs1t3";
	mysql> FLUSH PRIVILEGES; 
	mysql> EXIT  
	  
	docroot$> railway db migrate  
	docroot$> railway seed plant  
