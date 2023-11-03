const router = require('express').Router();
const SecurityController=require("../controllers/security.controller")
const {verifyToken,verifyTokenAdmin}=require("../middlewares/verifyToken.middleware");

router.post('/',verifyToken,SecurityController.createOne)
router.get('/',verifyToken,SecurityController.getAll)


module.exports = router;
