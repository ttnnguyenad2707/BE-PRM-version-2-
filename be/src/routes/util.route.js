const router = require('express').Router();
const UtilController = require("../controllers/util.controller")
const { verifyToken, verifyTokenAdmin } = require("../middlewares/verifyToken.middleware");

router.post('/', verifyToken, UtilController.createOne)
router.get('/', verifyToken, UtilController.getAll)


module.exports = router;
