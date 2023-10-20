const router = require('express').Router();
const PostController=require("../controllers/post.controller")
const {validatePOST,validatePUT}=require('../validations/post.validate');
const {verifyToken,}=require("../middlewares/verifyToken.middleware");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post('/',verifyToken,validatePOST, PostController.createOne);
router.get('/getlandingPost',PostController.getLandingPost);
router.put('/favorites',verifyToken,PostController.favoritePost);
router.put('/favorites/Removefavorites',verifyToken,PostController.RemovefavoritePost);
router.put('/:id',verifyToken,validatePUT, PostController.updateOne);
router.get('/getByNumberPost',PostController.readPostWithQuantity);
router.get('/getAll/:currentPage',PostController.getAll);
router.get('/getPosted',verifyToken,PostController.getPosted);
router.delete('/:id',verifyToken,PostController.deletePost);
router.post('/:id', verifyToken,PostController.restorePost);
router.get('/getdeletedpost',verifyToken,PostController.loadDeletedPost);
router.delete('/destroy/:id',verifyToken,PostController.destroyPostById)
router.get('/:slug',PostController.getDetail);
router.get('/:id',verifyToken,PostController.getPostedById);
router.post('/upload',upload.single('image'),PostController.upload)
router.get('/search/:searchParam/:currentPage', PostController.getSearchValue);
router.post('/search/filter', PostController.getFilterValue);

router.get('/getpostedbyowner/:id',PostController.getPostedByOwner);


module.exports = router;
