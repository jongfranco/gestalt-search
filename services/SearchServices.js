const es = require('../es/connection')

module.exports = {
    async search(params) {
        const result = es.search({
            index: 'covid',
            analyzer: 'standard',
            ...params
        })
        return result
    }
}