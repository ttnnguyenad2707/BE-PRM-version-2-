const asyncHandler = require('../utils/async-handler');
const PostService = require("../services/post.service");
const { post } = require('../routes/post.route');


module.exports = {
    
    createOne: asyncHandler(async (req, res) => {
        const post = await PostService.createOne(req, res);
    }),
    upload: asyncHandler(async (req, res) => {
        const post = await PostService.upload(req, res);
    }),
    getAll:asyncHandler(async (req, res) => {
        const post = await PostService.getAll(req, res);
    }),
    updateOne: asyncHandler(async (req, res) => {
        const post = await PostService.updateOne(req, res);
    }),
    getPosted: asyncHandler(async (req, res) => {
        const post = await PostService.getPosted(req, res);
    }),
    readPostWithQuantity: asyncHandler(async (req, res) => {
        const post = await PostService.readPostWithQuantity(req, res);
    }),
    deletePost: asyncHandler(async (req, res) => {
        const post = await PostService.deletePost(req, res);
    }),
    loadDeletedPost: asyncHandler(async (req, res) => {
        const post = await PostService.loadDeletedPost(req, res);
    }),
    restorePost: asyncHandler(async (req, res) => {
        const post = await PostService.restorePost(req, res);
    }),
    destroyPostById: asyncHandler(async (req, res) => {
        const post = await PostService.destroyPostById(req, res);
    }),
    getPostedById: asyncHandler(async (req, res) => {
        const post = await PostService.getPostedById(req, res);
    }),
    getDetail: asyncHandler(async (req, res) => {
        post = await PostService.getDetail(req, res);
    }),
    getSearchValue: asyncHandler(async (req, res) => {
        post = await PostService.getSearchValue(req, res);
    }),
    getFilterValue: asyncHandler(async (req, res) => {
        const { address, area, price, utils, currentPage} = req.body;
        try {
            const result = await PostService.getFilterValue({ address, area, price, utils, currentPage });
            return res.status(200).json({ message: "filter result", data: result });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }),
    favoritePost: asyncHandler(async (req, res) => {
        const user = await PostService.favoritePost(req, res);
    }),
};
