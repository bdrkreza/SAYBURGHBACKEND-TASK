const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User",
    },
    comment: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const ArticleSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User",
    },
    
    image: {
        type: String,
        default: "image"
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    tagList: [{ type: String }],
    comments: [commentSchema],
},
    { timestamps: true }
);

const Article = mongoose.model("articles", ArticleSchema);

module.exports = Article;