const asyncHandler = require('../utils/async-handler');
const User = require("../models/user.model");
const Messages = require("../models/conversation.model");


module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

// module.exports.getAllUsers = async (req, res, next) => {
//   try {
//     const users = await User.find({ _id: { $ne: req.params.id } })
//     console.log("user contact: " + users);
//     return res.json(users);
//   } catch (ex) {
//     next(ex);
//   }
// };

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const currentUser = req.params.id; // Sử dụng thông tin người dùng hiện tại từ req.params.id

    const messages = await Messages.find({
      users: { $in: [currentUser] }, // Tìm các cuộc trò chuyện liên quan đến người dùng hiện tại
    });

    // Tạo một danh sách các người gửi hoặc người nhận tin nhắn từ người dùng hiện tại
    const usersSet = new Set();
    messages.forEach((message) => {
      if (message.sender.toString() !== currentUser) {
        usersSet.add(message.sender.toString()); // Lấy người gửi của mỗi tin nhắn
      }
      if (message.users.length > 1) {
        message.users.forEach((user) => {
          if (user.toString() !== currentUser) {
            usersSet.add(user.toString());
          }
        });
      }
    });

    const usersArray = Array.from(usersSet);

    // Truy vấn thông tin của các người dùng dựa trên _id
    const usersInfo = await User.find(
      { _id: { $in: usersArray } },
      { _id: 1, lastname: 1 }
    );

    return res.json(usersInfo);
  } catch (ex) {
    next(ex);
  }
};


