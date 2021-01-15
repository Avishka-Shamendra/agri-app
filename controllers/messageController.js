const {buyerRequestInfo} =require('./validators/buyerRequestInfo')
const messageServices =require('../services/messageServices')

class MessageController{
    static async buyerRequest(req,res){
        try{
            const {value, error}= await buyerRequestInfo.validate(req.body)
            if(error) throw error
            const message= await messageServices.addRequest(req.body,req.session.user.uid, req.params.postid)
            res.redirect('/buyer?message_success=Your buyer request is sent to the farmer.Get in touch for further deals');

        }
        catch(e){
            console.log(e)
            res.redirect(`/buyer/viewpost/${req.params.postid}?error=${e}&request_title=${req.body.title}&description=${req.body.description}`)
        }

    }
}

module.exports=MessageController;