// @ts-ignore
const Interior = require('../models/interior.model');


class InteriorService {


    async createOne(req, res) {
        try {
            const result = await Interior.create({ ...req.body });
            return res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ error: error.toString() })
        }
    }

}

module.exports = new InteriorService();
