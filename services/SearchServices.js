const es = require('../es/connection')
const stopwords = require('nltk-stopwords')
const english = [...stopwords.load('english'), 'what', 'know']

module.exports = {
    async search(params) {
        const keywords = params.keywords
        const size = params.size || 10
        let q = params.q
            .toLowerCase()
            .split(' ')
            .filter(word => !english.includes(word))
            .join(' ')
        
        if (keywords) q = q + ' ' + keywords.join(' ')
            
        const result = es.search({
            index: 'covid',
            size: size,
            body: {
                query: {
                    multi_match: {
                        query: q,
                        fields: ['abstract', 'text']
                    },
                }
            }
        })
        return result
    }
}

