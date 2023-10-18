const router = require('express').Router();
const ConversationController=require("../controllers/conversation.controller")
const {verifyToken,verifyTokenAdmin}=require("../middlewares/verifyToken.middleware");

router.post('/', ConversationController.createOne);
router.get('/:user1/:user2',ConversationController.getOne)
router.put('/:conversationId/message', ConversationController.updateOne);

module.exports = router;
