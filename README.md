=============================================================================

Write a simple TODO List one-page webapp.                                         
                                                                                 
It should be a simple MVC application using ember for the UIs
language and webserver of your choice for the backend. 
It should use one of: SQLite, MySQL, or PostgreSQL for the database. 
No management of user identities or authentication is required.                                                                      
                                                                                 
The user should be able to:                                                       
                                                                                 
 1. Define new list items                                                        
 2. Mark list items as completed                                                 
 3. Unmark list items as completed                                                
 4. Delete list items                                                            
 5. Edit list item text                                                          
 6. Load the last state of the list from the server upon page reload             
 7. Store basic edit history in the database (no need to display this)           
                                                                                 
Note: List item text should not be editable when checked.                         
                                                                                 
Proposed database schema:                                                         
Table 1: todos                                                                    
Fields: id, text, status                                                          
                                                                                 
Table 2: todo_history                                                             
Fields: todo_id, action, date                                                     
                                                                                 
Submit the code and final database schema to us via either a zipfile or a 
public github repository.

=============================================================================

Make with:
  Ember.js
  Node.js
  MySQL
  Bootstrap
  Sequelize

## Installation
* 'cd gudtodo'
* 'npm install'
* 'ember install ember-cli-mirage'

## MySQL Credentials/setup
** name: 'guddata'
** user: 'root'
** PW: 'password'

## Running / Development
* 'ember serve --proxy http://localhost:8080'
* 'node app-api/server.js'

Known issues:
During the 'delete' function, the server responds innappropriately.
   'Uncaught EmberError {stack: "Error: Attempted to handle event `pushedData` on <…(http://localhost:4200/assets/vendor.js:20856:29)", description: undefined, fileName: undefined, lineNumber: undefined, message: "Attempted to handle event `pushedData` on <todo:2> while in state root.deleted.saved. ", …}'
This is my own "hacky" way of giving Ember an "ID" in the response, without actually going into too much detail ot modify the response itself.  
I'm looking more into this bug but this is the "best" fix so far.  
The issue stems from the back end not including an "ID" in its response to the delete command.  My hack is to send the (incorrect) response of a find query, instead of the null value for the delete. 
When I send the NULL response from the delete, the front end throws a bigger error and fails to auto-refresh the page, leaving stale/deleted data for the user to falsely manipulate.  By sending the "find by id" response, the error is only available on the console and the user's functionality stays the same.

=============================================================================


# gudtodo

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd gudtodo`
* `npm install`

## Running / Development

* `ember serve`
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

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
