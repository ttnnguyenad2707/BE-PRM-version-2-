const router = require('express').Router();
const PostController=require("../controllers/post.controller")
const {validatePOST,validatePUT}=require('../validations/post.validate');
const {verifyToken}=require("../middlewares/verifyToken.middleware");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post('/',verifyToken,validatePOST, PostController.createOne);
router.put('/:id',verifyToken,validatePUT, PostController.updateOne);
router.get('/getByNumberPost',PostController.readPostWithQuantity);
router.get('/getPosted',PostController.getPosted);
router.delete('/:id',PostController.deletePost);
router.post('/:id', PostController.restorePost);
router.get('/getdeletedpost',PostController.loadDeletedPost);
router.delete('/destroy/:id',PostController.destroyPostById)
router.get('/:id',PostController.getPostedById);
router.post('/upload',upload.single('image'),PostController.upload)





module.exports = router;
