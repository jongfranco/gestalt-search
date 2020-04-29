const IndexController = require('./controllers/_index')
const SearchController = require('./controllers/SearchController')

module.exports = (app) => {
  app.get('/',
    IndexController.index)
  app.get('/search',
    SearchController.search)
}