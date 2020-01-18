const { Router } = require('express')
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router()

// tipos de parametros query (?field=value) request.query
// route: /route/:value request.params
// body form request.body

routes.get('/devs/:id', DevController.show)
routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)
routes.patch('/devs/:id', DevController.update)
routes.delete('/devs/:id', DevController.destroy)

routes.get('/search', SearchController.index )

module.exports = routes