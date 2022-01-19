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
            const { id } = req.params
            const article = await Article.findById({ _id: id });
            if (!article) {
                return res.status(400).json({ message: "Article not found" });
            }
            res.status(200).json({ article: article });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    //CREATE article controller
    createArticle: async (req, res, next) => {
        try {
            const { title, text, tagList, image } = req.body;

            const newArticle = new Article({
                user: req.User,
                title, text, tagList, image
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
            const { id } = req.params;
            const article = await Article.findById({ _id: id })
            if (article) {
                const updatedArticle = await Article.findByIdAndUpdate(
                    id,
                    {
                        $set: req.body,
                    }, {
                    new: true
                }
                )
                res.status(200).json({ article: updatedArticle });
            } else {
                return res.status(200).json({ message: 'No article found with this Id!' });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    //delete  article controller
    deleteArticle: async (req, res) => {
        try {
            const article = await Article.findById(req.params.id);
            if (article) {
                await article.remove();
                return res.status(200).json({ message: 'article Deleted successfully!' });
            } else {
                return res.status(200).json({ message: 'No article found with this Id!' });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    //user comment create post
    createArticleComment: async (req, res) => {
        try {
            const { id } = req.params;
            const article = await Article.findById(id);

            if (article) {
                const comment = {
                    comment: req.body.comment,
                }
                article.comments.push(comment);
                const saveArticle = await article.save();
                res.status(200).json({ article: saveArticle });
            } else {
                return res.status(200).json({ message: 'article not found with this Id!' });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
}


module.exports = ArticleController;