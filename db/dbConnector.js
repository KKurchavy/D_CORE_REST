const mongoose = require("mongoose");

exports.initConnection = () => {
    mongoose.connect(process.env.DB_CONN);
    mongoose.Promise = global.Promise;

    const {connection} = mongoose;
    
    connection.on('error', err => {
        throw err;
    })

    return connection;
}