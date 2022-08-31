const mongoose = require('mongoose')
const COMPANIES = require('./companies.seed')
const Companies = require('../models/Company.model')

require('../config/db.config')

mongoose.connection.once('open', () => {
    mongoose.connection.db.dropDatabase()
    .then(()=> {
        console.log(COMPANIES)
        console.log('Db dropped')

        return Companies.create(COMPANIES)
    })
    .then(createdCompanies => {
        console.log('Creating companies')
        createdCompanies.forEach(company => console.log(`${company.name} was created!`))

        return mongoose.connection.close()
    })
    .then(() => {
        console.log('Connection closed')
        process.exit(1)
    })
    .catch(err => {
        console.log(err)
        process.exit(0)
    })
})