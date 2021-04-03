const mongoose = require('mongoose');

const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
    mongoose.connect('mongodb://scw:1111@localhost:27017/admin', {
        dbName: 'nodejs',
        useNewUrlParser: true,
        useCreateIndex: true,
    }, (err) => {
        if (err) {
            console.log('connect error', err);
        } else {
            console.log('connect success');
        }
    });
};
mongoose.connection.on('error', err => {
    console.error('connection error', err);
});
mongoose.connection.on('disconnected', () => {
    console.error('disconnected');
    connect();
});

module.exports = connect;