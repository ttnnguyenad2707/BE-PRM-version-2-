// // @ts-ignore
// const Conversation = require('../models/conversation.model')

// class ConversationService {

//     //tạo cuộc trò chuyện
//     async createOne(req, res) {
//         try {
//             const { user1, user2 } = req.body;
//             let conversation = await Conversation.findOne({ participants: { $all: [user1, user2] } });
//             if (!conversation) {
//                 conversation = await Conversation.create({
//                     participants: [user1, user2],
//                     messages: []
//                 })
//             }
//             return res.status(201).json(conversation)
//         } catch (error) {
//             return res.status(500).json({ "error": error.message });
//         }
//     }
//     //lấy tất cả cuộc trò chuyện của user
//     async getAllByUserId(req, res) {
//         try {
//             const userId = req.params.userId;
//             const getAll = await Conversation.find({
//                 participants: { $in: [userId] }
//             })
//             return res.status(200).json(getAll)
//         } catch (error) {
//             return res.status(500).json({ "error": error.message });
//         }
//     }
//     //lấy lịch sử tin nhắn
//     async getOne(req, res) {
//         const { user1, user2 } = req.params;
//         console.log({ user1, user2 });
//         const conversation = await Conversation.findOne({ participants: { $all: [user1, user2] } });
//         return res.json(conversation);
//     }
//     //lưu tin nhắn mới
//     async updateOne(req, res) {
//         const { conversationId } = req.params;
//         const { text, sender } = req.body;

//         const conversation = await Conversation.findById(conversationId);
//         conversation.messages.push({ text, sender });
//         await conversation.save();

//         return res.status(201).json(conversation);
//     }





// }

// module.exports = new ConversationService();
