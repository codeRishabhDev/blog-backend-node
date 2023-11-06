const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        mongoose.connect(process.env.DB);
        console.log("connected to db successfully")
    }
    catch (err) {
        console.log("db connection err")
    }
}

module.exports = dbConnection