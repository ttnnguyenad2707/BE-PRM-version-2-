const router = require('express').Router();
const CategoryController=require("../controllers/category.controller")
const {verifyToken,verifyTokenAdmin}=require("../middlewares/verifyToken.middleware");

router.post('/',verifyToken,CategoryController.createOne)


module.exports = router;
