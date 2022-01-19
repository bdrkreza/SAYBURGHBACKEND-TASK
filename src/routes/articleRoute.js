const ArticleController = require("../controllers/article.controller");
const authProtect = require("../middleware/auth.middleware");

const router = require("express").Router();

router.route("/").post(ArticleController.CreateArticle);
router.route("/comment/:id").post(authProtect, ArticleController.CreateArticleComment);
router.route("/").get(ArticleController.GetArticle);

module.exports = router;