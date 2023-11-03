// @ts-ignore
const Category = require('../models/category.model');


class CategoryService {


    async createOne(req, res) {
        try {
            const result = await Category.create({ ...req.body });
            return res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ error: error.toString() })
        }
    }
    async getAll(req, res) {
        try {
            const result = await Category.find();
            return res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ error: error.toString() })
        }
    }

}

module.exports = new CategoryService();
