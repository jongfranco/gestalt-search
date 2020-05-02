const { Client } = require('@elastic/elasticsearch')


const IN_PRODUCTION = process.env.NODE_ENV
const ES_CLOUD_ID = process.env.ES_CLOUD_ID
const ES_USERNAME = process.env.ES_USERNAME
const ES_PASSWORD = process.env.ES_PASSWORD
const config = IN_PRODUCTION
    ? {
        cloud: { id: ES_CLOUD_ID },
        auth: {
            username: ES_USERNAME,
            password: ES_PASSWORD
        }
    }
    : { node: 'http://localhost:9200' }

const es = new Client(config)


module.exports = es