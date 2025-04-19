const mongoose = require('mongoose');

const MongoDB = process.env.MONGODB_URL || "mongodb://localhost:27017/my_database";

const databaseConnect = () => {
    mongoose
        .connect(MongoDB)
        .then((conn) => console.log(`DB Connection successfull ${conn.connection.host}`))
        .catch((err) => console.log(err.message));

}

module.exports = databaseConnect;