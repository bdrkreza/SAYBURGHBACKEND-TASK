const ArticleController = require("../controllers/article.controller");
const auth = require("../middleware/auth.middleware");

const router = require("express").Router();


router.route("/").get(ArticleController.getArticle);
router.route("/:id").get(ArticleController.getSingleArticle);
router.route("/").post(auth.user, auth.admin, ArticleController.createArticle);
router.route("/:id").put(auth.user, auth.admin, ArticleController.updateArticle);
router.route("/:id").delete(auth.user, auth.admin, ArticleController.deleteArticle);
router.route("/comment/:id").post(auth.user, ArticleController.createArticleComment);



module.exports = router;