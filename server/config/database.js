require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URL || "mongodb://localhost:27017/my_database";

const databaseConnect = () => {
    mongoose.connect(uri)
        .then((conn) => console.log(`DB Connection successfull`))
        .catch((err) => console.log(err.message));

}

module.exports = databaseConnect;