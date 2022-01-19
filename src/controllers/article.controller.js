const mongoose = require("mongoose");
const Article = require("../models/article.model");



const ArticleController = {
    //Get  article controller
    getArticle: async (req, res) => {
        try {
            const query = req.query;
            const article = await Article.find(query);
            res.status(200).json({ article: article });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    //Get single article controller
    getSingleArticle: async (req, res) => {
        try {

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    //CREATE POST
    createArticle: async (req, res, next) => {
        try {
            const { title, text, tagList } = req.body;

            const newArticle = new Article({
                user: req.User,
                title, text, tagList
            })

            const article = await newArticle.save();

            res.status(200).json({ article });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    //update  article controller
    updateArticle: async (req, res) => {
        try {

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    //delete  article controller
    deleteArticle: async (req, res) => {
        try {

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    //user comment create post
    createArticleComment: async (req, res) => {
        try {

            const { id } = req.params;
            const article = await Article.findById(id);
            console.log(article);
            const comment = {
                comment: req.body.comment,
            }
            article.comments.push(comment);
            const saveArticle = await article.save();
            res.status(200).json({ article: saveArticle });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
}


module.exports = ArticleController;