const { search } = require('../services/SearchServices')

module.exports = {

    async search(req, res, next) {
        const params = req.params.params
        try {
            const data = await search(params)
            res.status(200).send(data.body.hits)
        } catch (error) {
            next(error)
        }
    },

}