const sql = require('../config/db');
class BuyerRequest{
    static async addRequest(uid,postid,title,description){
        const [createdPost] = await sql`
            INSERT INTO buyer_request 
                ( buyer_id,post_id, request_title, description) 
            VALUES 
                ( ${uid}, ${postid}, ${title},${description})
            RETURNING *
            `;
        return createdPost;
    }

    static async checkAvailable(uid, postid){
        const [request]=await sql`
        SELECT * FROM buyer_request  where buyer_id=${uid} and post_id=${postid}
        `;
        return request;
    }

    static async getSentMessages(buyer_uid){
        const requests= await sql`
        SELECT buyer_request.*,farmer.contact_no,userinfo.first_name FROM buyer_request  
        INNER JOIN post USING(post_id) 
        INNER JOIN farmer ON post.farmer_id=farmer.uid
        INNER JOIN userinfo USING(uid)
         WHERE buyer_id=${buyer_uid}
         ORDER BY added_on DESC,request_title ASC
        `;
        return requests;

    }

    static async deleteMsg(id){
        await sql`DELETE FROM buyer_request WHERE req_msg_id=${id}`;
        return true;
    }

    static async getAllMessagesForAdmin(){
        const messages = await sql`
        SELECT buyer_request.*,post.farmer_id,
        B.first_name as buyer_first,B.last_name as buyer_last,
        F.first_name as seller_first,F.last_name as seller_last
        FROM buyer_request
        INNER JOIN post USING(post_id)
        INNER JOIN userinfo AS B ON buyer_request.buyer_id=B.uid
        INNER JOIN userinfo AS F ON post.farmer_id=F.uid
         ORDER BY req_state DESC,added_on DESC,request_title ASC
        `;
        return messages;
    }
}
module.exports=BuyerRequest