const Subscription = require('../models/subscription');

exports.getAll = (req, res) => {

}

exports.createSubscription = async (req, res) => {
    try {
        const {email} = req.body;

        // console.log(req.body);

        const subscription = new Subscription({
            email: email,
            name: req.body.name,
            userId: req.user.id,
        })

        const savedSubscription = await subscription.save();
        res.status(201).json(savedSubscription);
    } catch (error) {
        console.error('Error while create subscription:', error);
        res.status(500).json({ message: 'Error while create subscription', error: error.message });
    }
}
