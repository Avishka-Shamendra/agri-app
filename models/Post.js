const sql = require('../config/db');

class Post{
    static async createPost(uid,title,product_name,quantity,expected_price,description,product_category,district,address,added_day,expire_date){
        const [createdPost] = await sql`
            INSERT INTO post 
                ( farmer_id, title, product_name, quantity, expected_price, description, product_category, available_district, available_address, added_day, exp_day) 
            VALUES 
                ( ${uid},${title}, ${product_name}, ${quantity},${expected_price},${description},${product_category},${district},${address},${added_day},${expire_date})
            RETURNING *
            `;
        return createdPost;
    }

    static async getAllPost(){
        const posts = sql`
        SELECT * FROM posts ORDER BY added_day,title DESC;`
        return posts;
    }

    static async getRecentPosts(){
        const posts = sql`
        SELECT * FROM posts ORDER BY added_day,title DESC LIMIT 10;`
        return posts;
    }
}

module.exports = Post;