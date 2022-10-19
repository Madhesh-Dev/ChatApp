const router = require("express").Router();
const Message = require("../models/Message");

// new message


router.post("/",async (req,res)=>{
    const message = new Message(req.body);
    try {
        const savedMessage= await message.save();
        res.status(200).json(savedMessage);
        
    } catch (error) {
        res.status(500).json(error);
        
    }
    
})





// get a message of a conversation 

router.get("/:conversationId", async (req,res)=>{

    try {

        const messagesInfo = await Message.find({
            conversationId:req.params.conversationId
        })
        res.status(200).json(messagesInfo)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
    
})



module.exports = router;
