# create simple Hello world app using Express

- create a folder 'web-app'
- create package.json file , in terminal : npm init -y
- install express : npm i -S express
- create a new file : index.js
- add webServer settings in package.json ( port and folder name)
- using fs module to read package.json file ( port number and folder name)


# working with multiple handlers
- we want to handle multiple handlers for example (/demo) ,  we need next function.
- When we work with middleware,for example BodyParser that processes request bodies, we can use the middleware to handle the request, do some data processing, set up additional properties on the request or maybe set headers on the response and then we can have another handler to continue processing that request.
