//For Database connection
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/StudentsDb', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log('MongoDB connection succeeded.')
    } else {
        console.log('Error while connecting to MongoDB: ' + JSON.stringify(err, undefined, 2));
    }
});

module.exports = mongoose;