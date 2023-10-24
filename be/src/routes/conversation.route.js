const { addMessage, getMessages, getAllUsers } = require("../controllers/conversation.controller");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.get("/allusers/:id", getAllUsers);

module.exports = router;