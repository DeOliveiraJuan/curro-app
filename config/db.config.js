const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/curroappdb'

mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((x) => {
        console.log(`Connected to db at ${MONGODB_URI}`)
    })
    .catch((err) => {
        console.log(`Error`, err)

        process.exit(0)
    });

<<<<<<< HEAD
    process.on("SIGINT", function () {
        mongoose.connection.close(function () {
            console.log("Mongoose disconnected on app termination")
            process.exit(0)
        });
    });

    module.exports.DB = MONGODB_URI;
=======
process.on("SIGINT", function () {
    mongoose.connection.close(function () {
        console.log("Mongoose disconnected on app termination")
        process.exit(0)
    })
})
>>>>>>> featured/registerCompany
