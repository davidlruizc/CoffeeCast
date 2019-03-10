const routes = require('next-routes')

// Creating the new friendly routes for the app
module.exports = routes()                           
.add('index')                                       
.add('channel', '/:slug.:id', 'channel')                      
.add('podcast', '/:slugChannel.:idChannel/:slug.:id', 'podcast')