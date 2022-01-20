const mongoose = require("mongoose");
const Article = require("../models/article.model");



const ArticleController = {
    /**
         * Fetch all article
         * @route GET /api/article
         * @access Public
    */
    getArticle: async (req, res) => {
        try {
            const query = req.query;
            const article = await Article.find(query);
            res.status(200).json({ article: article });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    /**
       * Fetch single article
       * @route GET /api/article/:id
       * @access Public
    */
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

    /**
         * Fetch create article
         * @route post /api/article
         * @access private/admin
      */
    createArticle: async (req, res, next) => {
        try {
            const { title, text, tags, image } = req.body;

            const newArticle = new Article({
                user: req.user.id,
                title, text, tags, image
            })

            const article = await newArticle.save();

            res.status(200).json({ article });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    /**
       * Fetch update article
       * @route put /api/article/:id
       * @access private/admin
    */
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

    /**
          * Fetch delete article
          * @route delete /api/article/:id
          * @access private/admin
       */
    deleteArticle: async (req, res) => {
        try {
            const article = await Article.findById(req.params.id);
            if (article) {
                await article.remove();
                return res.status(200).json({ message: 'article Deleted successfully!' });
            } else {
                return res.status(200).json({ message: 'article not found with this Id!' });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },


    /**
         * @description Create a new comment
         * @route POST /api/article/comment/:id
         * @access Private
     */
    createArticleComment: async (req, res) => {
        try {
            const { id } = req.params;
            const comment = req.body.comment
            const article = await Article.findById(id);

            if (article) {

                const comments = {
                    user: req.user.id,
                    comment: comment
                }
                article.comments.push(comments);
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