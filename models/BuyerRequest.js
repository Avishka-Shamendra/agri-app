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
        const request=await sql`
        SELECT * FROM buyer_request  where buyer_id=${uid} and post_id=${postid}
        `
        return request;
    }
}
module.exports=BuyerRequest