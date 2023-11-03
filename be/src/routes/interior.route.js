const router = require('express').Router();
const InteriorController=require("../controllers/interior.controller")
const {verifyToken,verifyTokenAdmin}=require("../middlewares/verifyToken.middleware");

router.post('/',verifyToken,InteriorController.createOne)
router.get('/',verifyToken,InteriorController.getAll)


module.exports = router;
