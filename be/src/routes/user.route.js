const router = require('express').Router();
const UserController=require("../controllers/user.controller")
const {validatePUT}=require('../validations/user.validate');
const {verifyToken,verifyTokenAdmin}=require("../middlewares/verifyToken.middleware");

router.get('/:userId',UserController.getOne)
router.get('/getlistusers/:currentPage',verifyTokenAdmin,UserController.getUserlist);
router.put('/:id',verifyToken,validatePUT, UserController.updateOne);
router.put('/role/:id',verifyTokenAdmin, UserController.updateOneForAdmin);
router.put('/upRole/:id',verifyTokenAdmin, UserController.upDateRole);
router.put('/decreseRole/:id',verifyTokenAdmin, UserController.upDateRole);
router.put('/blockUser/:id',verifyTokenAdmin, UserController.blockUser);
router.put('/openUser/:id',verifyTokenAdmin, UserController.openUser);

router.put('/:id',verifyToken,validatePUT, UserController.updateOne);

module.exports = router;
