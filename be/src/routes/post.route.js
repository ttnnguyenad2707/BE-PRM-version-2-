const router = require('express').Router();
const PostController = require("../controllers/post.controller")
const { validatePOST, validatePUT } = require('../validations/post.validate');
const { verifyToken, } = require("../middlewares/verifyToken.middleware");

// const multer = require('multer');
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });



router.get('/:id', PostController.getOne);
router.get('/', PostController.getAll);
router.get('/owner/:owner', PostController.getAllByOwner);
router.post('/', PostController.createOne);
router.put('/:id', PostController.updateOne);
router.get('/slug/:slug', PostController.getOneBySlug);
router.get('/deleted/:owner', PostController.getAllDeleted);
router.delete('/:id', PostController.deleteOne);
router.delete('/destroy/:id', PostController.destroyOne)
router.put('/rs/:id', PostController.restoreOne);




// router.get('/getlandingPost', PostController.getLandingPost);
// router.get('/getSortByCreateDatePost/:currentPage', PostController.getSortByCreateDateProst);
// router.get('/getSortByPricePost/:currentPage', PostController.getSortByPriceProst);
// router.put('/favorites', verifyToken, PostController.favoritePost);
// router.put('/favorites/Removefavorites', verifyToken, PostController.RemovefavoritePost);
// router.put('/:id',verifyToken,validatePUT, PostController.updateOne);
// router.get('/getByNumberPost', PostController.readPostWithQuantity);
// router.get('/getAll/:currentPage',PostController.getAll);
// router.get('/getPosted', verifyToken, PostController.getPosted);
// router.delete('/:id', verifyToken, PostController.deletePost);
// router.post('/:id', verifyToken, PostController.restorePost);
// router.get('/getdeletedpost', verifyToken, PostController.loadDeletedPost);
// router.delete('/destroy/:id', verifyToken, PostController.destroyPostById)
// router.get('/:slug', PostController.getDetail);
// router.get('/:id',verifyToken,PostController.getPostedById);
// router.post('/upload', upload.single('image'), PostController.upload)
// router.get('/search/:searchParam/:currentPage', PostController.getSearchValue);
// router.post('/search/filter', PostController.getFilterValue);

// router.get('/getpostedbyowner/:id', PostController.getPostedByOwner);


module.exports = router;
