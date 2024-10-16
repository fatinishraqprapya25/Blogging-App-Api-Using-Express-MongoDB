const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema(
    {
        blogId: {
            type: Schema.Types.ObjectId,
            ref: 'Blog',
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        text: {
            type: String,
            required: true,
            trim: true,
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        replies: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                text: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true
    }
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;
