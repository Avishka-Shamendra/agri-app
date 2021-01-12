const sql = require('../config/db');

class Post{
    static async createPost(details){
        const [createdPost] = await sql`
            INSERT INTO post 
                ( farmer_id, product_name,  title,  description, product_category, quantity, expected_price, available_district, available_address, status, added_day, exp_day ) 
            VALUES 
                ( ${details['uid']}, ${details['product_name']}, ${details['title']},${details['description']},${details['product_category']},${details['quantity']},${details['expected_price']},${details['district']},${details['address']},${details['status']},${details['added_day']},${details['exp_day']} )
            RETURNING *
            `;
        return createdPost;
    }
}

module.exports = Post;