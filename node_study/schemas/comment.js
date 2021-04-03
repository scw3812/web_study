const mongoose = require('mongoose');

const { Schema } = mongoose;
const commentSchema = new Schema({
    commenter: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User',
    },
    comment: {
        type: String,
        required: true,  
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Comment', commentSchema);