const ArticleController = require("../controllers/article.controller");
const authProtect = require("../middleware/auth.middleware");

const router = require("express").Router();


router.route("/").get(ArticleController.getArticle);
router.route("/:id").get(ArticleController.getSingleArticle);
router.route("/").post(ArticleController.createArticle);
router.route("/:id").post(ArticleController.updateArticle);
router.route("/:id").delete(ArticleController.deleteArticle);

router.route("/comment/:id").post(authProtect, ArticleController.createArticleComment);

module.exports = router;