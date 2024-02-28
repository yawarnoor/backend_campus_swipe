const CardModel = require("../models/card.model");

class CardServices {

    static async addCard(card_id, cms_id) {
        try{
                console.log("---- Cardid-----CMS --",card_id, cms_id);
                
                const createCard = new CardModel({card_id, cms_id});
                return await createCard.save();
        }catch(err){
            throw err;
        }
    }

    static async getAllCards(){
        try{
            return await CardModel.find();
        }catch(err){
            console.log(err);
        }
    }
    
}

module.exports = CardServices;