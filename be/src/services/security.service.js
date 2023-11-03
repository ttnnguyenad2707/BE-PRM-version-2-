// @ts-ignore
const Security = require('../models/security.model');


class SecurityService {


    async createOne(req, res) {
        try {
            const result = await Security.create({ ...req.body });
            return res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ error: error.toString() })
        }
    }

}

module.exports = new SecurityService();
