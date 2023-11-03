// @ts-ignore
const Util = require('../models/utils.model');


class UtilService {


    async createOne(req, res) {
        try {
            const result = await Util.create({ ...req.body });
            return res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ error: error.toString() })
        }
    }
    async getAll(req, res) {
        try {
            const result = await Util.find();
            return res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ error: error.toString() })
        }
    }

}

module.exports = new UtilService();
