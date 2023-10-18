const router = require('express').Router();
const UserController=require("../controllers/user.controller")
const {validatePUT}=require('../validations/user.validate');
const {verifyToken,verifyTokenAdmin}=require("../middlewares/verifyToken.middleware");

router.get('/:userId',UserController.getOne)
router.get('/getlistusers',verifyTokenAdmin,UserController.getUserlist)
router.put('/:id',verifyToken,validatePUT, UserController.updateOne);
router.put('/role/:id',verifyTokenAdmin, UserController.updateOneForAdmin);

module.exports = router;
