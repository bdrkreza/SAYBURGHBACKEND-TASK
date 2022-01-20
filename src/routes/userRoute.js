const ArticleController = require("../controllers/article.controller");
const auth = require("../middleware/auth.middleware");


const router = require("express").Router();

router.route("/comment/:id").post(auth.user, ArticleController.createArticleComment);


module.exports = router;