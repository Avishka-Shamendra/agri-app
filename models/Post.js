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
        SELECT * FROM post ORDER BY added_day,title DESC;`
        return posts;
    }

    static async getRecentPosts(){
        const posts = sql`
        SELECT * FROM post ORDER BY added_day,title DESC LIMIT 10;`
        return posts;
    }

    //get all posts belong to a farmer
    static async getFarmerPostsById(uid){
        const posts = sql`
        SELECT * FROM post WHERE farmer_id=${uid} ORDER BY added_day,title DESC;`
        return posts; 
    }
}

module.exports = Post;