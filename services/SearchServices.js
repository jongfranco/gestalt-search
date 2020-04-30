const es = require('../es/connection')
const stopwords = require('nltk-stopwords')
const english = [...stopwords.load('english'), 'what', 'know']

module.exports = {
    async search(params) {
        const keywords = params.keywords
        let q = params.q
            .toLowerCase()
            .split(' ')
            .filter(word => !english.includes(word))
            .join(' ')
        
        if (keywords) q = q + ' ' + keywords.join(' ')
            
        const result = es.search({
            index: 'covid',
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

