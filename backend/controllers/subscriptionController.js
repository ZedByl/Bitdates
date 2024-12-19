const Subscription = require('../models/subscription');


exports.setEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email field is required' });
        }

        const createResult = await Subscription.insertMany({ email });

        res.json(createResult);
    } catch (error) {
        res.status(500).json({error: 'Ошибка при запросе к стороннему API'});
    }
}
