// @ts-ignore
const Post = require('../models/post.model');
const User = require('../models/user.model');


class PostService {


    async createOne(req, res) {

        // const {category,title,description,address,area,maxPeople,price,deposit,security,utils,interior,images}=req.body;
        try {
            const result = await Post.create({ ...req.body });
            return res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ error: error.toString() })
        }
    }

    async updateOne(req, res) {
        const { } = req.body;
    }
    async getAll(req, res) {
        const currentPage = parseInt(req.params.currentPage);
        const perPage = 10;
        const skip = (currentPage - 1) * perPage;
        const result = await Post.find({ deleted: false })
            .skip(skip)
            .limit(perPage).exec();
        return res.status(200).json(result)
    }
    async readPostWithQuantity(req, res) {
        const quantityOfPost = await req.query.number;
        const result = await Post.find({}).limit(quantityOfPost);
        return res.status(200).json(result);
    }

    async getPosted(req, res) {
        const user_id = req.user.id;
        const result = await Post.find({ owner: user_id, deleted: false });
        return res.status(200).json(result);
    }
    async deletePost(req, res) {
        const idPost = await req.params.id;

        try {
            const result = await Post.findByIdAndUpdate({ _id: idPost }, { deleted: true, deletedAt: Date.now() });
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ Error: error.toString() })
        }
    }
    async getDetail(req, res) {
        try {
            const { slug } = req.params;
            const PostDetails = await Post.findOne({ slug: slug });
            return res.status(200).json(PostDetails);
        } catch (error) {
            return res.status(500).json({ Error: error.toString() })
        }

    }

    async getSearchValue(req, res) {
        const searchParam = req.params.searchParam;
        const currentPage = parseInt(req.params.currentPage);
        const perPage = 10;

        try {
            const skip = (currentPage - 1) * perPage;

            const result = await Post.find({ title: { $regex: searchParam, $options: 'i' } })
                .skip(skip)
                .limit(perPage)
                .exec();

            if (result.length === 0) {
                return res.status(404).json({ message: "No results found" });
            }

            return res.status(200).json({ message: "Search result", data: result });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async loadDeletedPost(req, res) {
        try {
            const result = await Post.find({ deleted: true, owner: req.user.id });
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ Error: error.toString() })
        }
    }
    async getPostedById(req, res) {
        const idPost = await req.params.id;
        try {
            const result = await Post.find({ _id: idPost, deleted: false });
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ Error: error.toString() })
        }
    }

    async restorePost(req, res) {
        const idPost = await req.params.id;
        try {
            const result = await Post.findByIdAndUpdate({ _id: idPost }, { deleted: false, deletedAt: null });
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ Error: error.toString() })
        }
    }

    async destroyPostById(req, res) {
        const idPost = await req.params.id;
        try {
            const result = await Post.findByIdAndDelete({ _id: idPost });
            return res.status(200).json({
                message: "Destroy successfully",
                ...result._doc
            });
        } catch (error) {
            return res.status(500).json({ Error: error.toString() })
        }
    }
    // async getFilterValue({ address, area, price, utils, currentPage }) {
    //     const query = {};
    //     const perPage = 10;
    //     try {
    //         const skip = (currentPage - 1) * perPage;

    //         if (address) {
    //             query.address = { $regex: address, $options: 'i' };
    //         }
    //         if (area) {
    //             query.area = { $gte: parseFloat(area) };
    //         }
    //         if (price) {
    //             query.price = { $lte: parseFloat(price) };
    //         }
    //         if (utils && utils.length > 0) {
    //             query.utils = { $all: utils };
    //         }

    //         const result = await Post.find(query)
    //             .skip(skip)
    //             .limit(perPage)
    //             .exec();

    //         return result;
    //     } catch (error) {
    //         return { error: error.message };
    //     }
    // }
    async getFilterValue({ address, area, price, utils, currentPage }) {
        const query = {};
        const perPage = 10;
        try {
            const skip = (currentPage - 1) * perPage;

            if (address && Array.isArray(address) && address.length > 0) {
                const concatenatedAddress = address.join(', ');
                query.address = { $regex: concatenatedAddress, $options: 'i' };
            }
            if (area && Array.isArray(area) && area.length > 0) {
                query.area = { $gte: parseFloat(area[0]) };
            }
            if (price && Array.isArray(price) && price.length > 0) {
                const priceQueries = price.map(priceRange => {
                    const [min, max] = priceRange.split('-');
                    return {
                        $and: [
                            { price: { $gte: parseFloat(min) } },
                            { price: { $lte: parseFloat(max) } }
                        ]
                    };
                });
                query.$or = priceQueries;
            }
            if (utils && Array.isArray(utils) && utils.length > 0) {
                query.utils = { $all: utils };
            }

            const result = await Post.find(query)
                .skip(skip)
                .limit(perPage)
                .exec();

            return result;
        } catch (error) {
            return { error: error.message };
        }
    }
    async getLandingPost(req, res) {
        try {
            const result = await Post.find().sort({ createdAt: -1 })
                .limit(10)
                .exec();
            return res.status(200).json({
                message: "get landing post success",
                data: result
            });
        } catch (error) {
            return res.status(500).json({ error: error.toString() });
        }
    }
    async favoritePost(req, res) {
        try {
            const { userId, idPost } = req.body;
            const getUser = await User.findById({ _id: userId });
            const getAllFarvorite = getUser.favoritePost;
            getAllFarvorite.push(idPost);
            const result = await User.findByIdAndUpdate({ _id: userId }, { favoritePost: getAllFarvorite });
            return res.status(200).json("Add favorites succesfully");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getPostedByOwner(req, res) {
        try {
            const { id } = req.params;
            const listPost = await Post.find({ owner: id, deleted: false });
            return res.status(200).json(listPost);
        } catch (error) {
            return res.status(500).json({ Error: error.toString() })
        }

    }
    async removeFavoritePost(req, res) {
        try {
            const { userId, idPost } = req.body;
            const getUser = await User.findById(userId);
            const getAllFavorite = getUser.favoritePost;

            const updatedFavorite = getAllFavorite.filter(postId => postId !== idPost);

            const result = await User.findByIdAndUpdate(userId, { favoritePost: updatedFavorite });

            return res.status(200).json("Remove favorite successfully");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

module.exports = new PostService();
