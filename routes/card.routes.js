const router = require("express").Router();
const CardController = require('../controller/card.controller');
const Card = require('../models/card.model');


router.get("/cards",CardController.get_cards);

router.post("/cards",CardController.post_cards);

router.post('/cards/fetchCMSID', async (req, res) => {
  try {
    const { card_id } = req.body;

    // Validate that card_id is provided
    if (!card_id) {
      return res.status(400).json({ message: 'card_id is required' });
    }

    // Fetch cms_id from the database based on card_id
    const card = await Card.findOne({ card_id });
    
    // If card is not found
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    // Return the cms_id
    res.status(200).json({ cms_id: card.cms_id });
  } catch (error) {
    console.error('Error fetching CMS ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;


module.exports = router;