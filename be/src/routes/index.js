const router = require('express').Router();


router.use('/auth', require('./auth.route'));
router.use('/user', require('./user.route'));
router.use('/post', require('./post.route'));
router.use('/util', require('./util.route'));
router.use('/security', require('./security.route'));
router.use('/category', require('./category.route'));
router.use('/interior', require('./interior.route'));
router.use('/conversation', require('./conversation.route'));


module.exports = router;

