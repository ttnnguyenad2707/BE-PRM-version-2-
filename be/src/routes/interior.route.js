const router = require('express').Router();
const InteriorController=require("../controllers/interior.controller")
const {verifyToken,verifyTokenAdmin}=require("../middlewares/verifyToken.middleware");

router.post('/',verifyToken,InteriorController.createOne)


module.exports = router;
