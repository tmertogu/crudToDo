# crudTodo

This README outlines the details of collaborating on this Ember application.
This App was built to the following spec.

=============================================================================
                                                                                
This is a simple MVC application using ember for the UIs
language and Node.JS for the back end and MySQL for the database. 
                                                                                 
The user should be able to:                                                       
                                                                                 
 1. Define new list items                                                        
 2. Mark list items as completed                                                 
 3. Unmark list items as completed                                                
 4. Delete list items                                                            
 5. Edit list item text                                                          
 6. Load the last state of the list from the server upon page reload             
 7. Store basic edit history in the database (no need to display this)           
                                                                                 
Note: List item text should not be editable when checked.                         
                                                                                 
Database schema:                                                         
   Table 1: 'todos'                                                                    
   Fields: id, text, status, createdAT, updatedAt                                                         
                                                                                     
   Table 2: 'todo_history'                                                             
   Fields: todo_id, action, createdAT, updatedAt                                                     
                                                                                 
=============================================================================

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)
* [MySQL](https://dev.mysql.com/downloads/mysql/)
* [SequelPro](https://sequelpro.com/download)


## Installation

* `git clone <repository-url>` this repository
* `cd crudTodo`
* `npm install`

## MySQL configuration
Install Homebrew on mac by running this in terminal
	/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"Go to System Prefences (mac) and initialize the db

Update Homebrew:
	brew update

Install MySQL:
	brew install mysql

Run the MySQL daemon
	brew services start mysql

Set the password for MySQL:
	mysqladmin -u root password 'password'

Start mysql:
	mysql -u root -p
	password

Create and use the database:
	create database guddata;
	use guddata;
	show databases;

The back end server will create your db schemas above for you automatically using:
	'CREATE TABLE IF NOT EXISTS'


## Running / Development
Start Node
* 'node app-api/server.js'
* Visit your API at [http://localhost:8080/todos](http://localhost:8080/todos).

Start Ember
* `ember serve --proxy http://localhost:8080`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).



### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying


Known issues:
During the 'delete' function, the server responds innappropriately.

	'Uncaught EmberError {stack: "Error: Attempted to handle event `pushedData` on <…(http://localhost:4200/assets/vendor.js:20856:29)", description: undefined, fileName: undefined, lineNumber: undefined, message: "Attempted to handle event `pushedData` on <todo:id> while in state root.deleted.saved. ", …}'

This is my own "hacky" way of giving Ember an "ID" in the response, and get the app to behave for the user. 
I'm looking more into this bug but this is the "best" so far.  


The issue stems from the back end not including an "ID" in its response to the delete command.  
My hack is to send the (incorrect) response of a find query, instead of the packaged null value for the delete command. 
When I send the NULL response from the delete, the front end throws a bigger error and fails to auto-refresh the page, leaving stale/deleted data for the user to falsely manipulate.  By sending the "find by id" response, the error is only available on the console and the user's functionality stays the same.

The issue stems from Ember.JS's way of updating the persistent database behind its own client-side db, ember-data.

From https://guides.emberjs.com/v3.1.0/models/creating-updating-and-deleting-records/
	“Deleting Records
	Deleting records is as straightforward as creating records. Call deleteRecord() on any instance of DS.Model. This flags the record as isDeleted. The deletion can then be persisted using save(). Alternatively, you can use the destroyRecord method to delete and persist at the same time.

	store.findRecord('post', 1, { backgroundReload: false }).then(function(post) {
	  post.deleteRecord();
	  post.get('isDeleted'); // => true
	  post.save(); // => DELETE to /posts/1
	});

	// OR
	store.findRecord('post', 2, { backgroundReload: false }).then(function(post) {
	  post.destroyRecord(); // => DELETE to /posts/2
	});
	The backgroundReload option is used to prevent the fetching of the destroyed record, since findRecord() automatically schedules a fetch of the record from the adapter.”

The way Ember.JS handles deletes, is that it “deletes” the record client side, then to persist to the back-end data base, it “saves” the record.  
On destroyRecord the following errors are thrown:

	"Assertion Failed: ‘todo:<id>' was saved to the server, but the response returned the new id 'null'. The store cannot assign a new id to a record that already has an id.”

	"Assertion Failed: You made a 'findRecord' request for a 'todo' with id ‘<id>', but the adapter's response did not have any data"

But according to Ember’s own documentation, in order for ember to send the delete to the persistent db on the back end, it must call the “save” function.  
Yet, it doesn’t like the response my back end is sending it, and therefore it won’t refresh the front-side page automatically to reflect the new state of the To-Do list items.

=============================================================================


Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
