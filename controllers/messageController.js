const {buyerRequestInfo} =require('./validators/buyerRequestInfo');
const messageServices =require('../services/messageServices');
const BuyerRequest = require('../models/BuyerRequest');

class MessageController{
    static async buyerRequest(req,res){
        try{
            const {value, error}= await buyerRequestInfo.validate(req.body)
            if(error) throw error
            const message= await messageServices.addRequest(req.body,req.session.user.uid, req.params.postid)
            res.redirect(`/buyer/viewpost/${req.params.postid}?msg_success=Your buyer request is sent to the farmer. Get in touch with the farmer using the contact number for further communication. Thank you!`);

        }
        catch(e){
            res.redirect(`/buyer/viewpost/${req.params.postid}?msg_error=${e}&request_title=${req.body.title}&description=${req.body.description}#buyerRequest`);
        }

    }
    static async deleteMsg(req,res){
        try{
            await messageServices.deleteMsg(req.params.msg_id);
            res.redirect(`/buyer/sentRequests?del_suc=Message Deleted from the System Successfully`);
        }catch(e){
            res.redirect(`/buyer/sentRequests?error=${e}`);
        }
    } 
    static async deleteMsgViewPost(req,res){
        try{
            await messageServices.deleteMsg(req.params.msg_id);
            res.redirect(`/buyer?success=Message Deleted from the System Successfully`);
        }catch(e){
            res.redirect(`/buyer?error=${e}`);
        }
    } 

    static async deleteMsgAdmin(req,res){
        try{
            await messageServices.deleteMsg(req.params.req_msg_id);
            res.redirect(`/admin/buyerRequests?success=Message Deleted from the System Successfully`);
        }catch(e){
            res.redirect(`/admin/buyerRequests?error=${e}`);
        }
    } 

    static async adminMessagesPage(req,res){
        try{
            const messages=await messageServices.getAllMessagesForAdmin();
            res.render('adminBuyerRequestPage',{
                error:req.query.error,
                success:req.query.success,
                user:req.session.user,
                requests:messages,
            })
        }catch(e){
            res.redirect(`/admin?error=${e}`);
        }
    }

    static async markAsInterested(req,res){
        try{
            const post = await BuyerRequest.markAsInterested(req.params.req_id);
            if(!post)  res.redirect(`/farmer/post/${req.params.post_id}?req_error=Could not change state to Interested.Please try again later#requests`)
            else{
            res.redirect(`/farmer/post/${req.params.post_id}?req_success=Request Message Sucessfully Marked as Interested#requests`)
            }

        }catch(e){
            res.redirect(`/farmer/post/${req.params.post_id}?req_error=${e}#requests`)
        }
    }

    static async markAsNotInterested(req,res){
        try{
            const post = await BuyerRequest.markAsNotInterested(req.params.req_id+'1');
            if(!post)  res.redirect(`/farmer/post/${req.params.post_id}?req_error=Could not change state to Not Interested.Please try again later#requests`)
            else{
            res.redirect(`/farmer/post/${req.params.post_id}?req_success=Request Message Sucessfully Marked as Not Interested#requests`)
            }

        }catch(e){
            res.redirect(`/farmer/post/${req.params.post_id}?req_error=${e}#requests`)
        }
    }
}

module.exports=MessageController;