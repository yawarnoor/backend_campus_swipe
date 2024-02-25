const CardServices = require('../services/card.service');


exports.post_cards = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const {card_id, cms_id } = req.body;
        const add = await CardServices.addCard(card_id, cms_id)

        res.json({ status: true, success: 'Card Added successfully' });

    } catch (err) {
        console.log("---> err -->", err);
        next(err);
    }
}
exports.get_cards = async (req, res, next) => {
    try {
        const cards = await CardServices.getAllCards();
        res.status(200).json(cards);
    }
    catch (err) {
    console.log("---> err -->", err);
    next(err);
}
}