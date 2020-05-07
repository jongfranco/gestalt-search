const es = require('../es/connection')
const stopwords = require('nltk-stopwords')
const english = [...stopwords.load('english'), 'what', 'know']


const baseParams = {
    index: 'covid', explain: true, body: { query: {} }
}

const intervalSearch = (params) => {

}

const multiMatchSearch = (params) => {
    let base = baseParams
    base.body.query = {
        multi_match: {
            query: params.q,
            analyzer: 'standard',
            type: 'best_fields',
            fuzziness: 'AUTO',
            fields: ['abstract', 'text'],
            operator: 'and',
            minimum_should_match: '90%'
        }
    }
    return es.search({
        ...base,
        size: params.size
    })
}

const combine = (groups) => {
    return groups
}




module.exports = {
    async search(params) {
        const keywords = params.keywords
        const size = params.size || 10
        let q = params.q
            .toLowerCase()
            .split(' ')
            .filter(word => !english.includes(word))
            .join(' ')

        //other ways to include kws?
        if (keywords) q = q + ' ' + keywords.join(' ')

        params = {
            q: q,
            size: size
        }

        const multiMatchResults = multiMatchSearch(params)
        // const intervalResults = intervalSearch(params)

        return multiMatchResults
    }
}