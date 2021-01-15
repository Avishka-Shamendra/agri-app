const sql = require('../config/db');

class Post{
    static async createPost(uid,title,product_name,quantity,expected_price,description,product_category,district,address,phone_num,added_day,expire_date){
        const [createdPost] = await sql`
            INSERT INTO post 
                ( farmer_id, title, product_name, quantity, expected_price, description, product_category, available_district, available_address,contact_no, added_day, exp_day) 
            VALUES 
                ( ${uid},${title}, ${product_name}, ${quantity},${expected_price},${description},${product_category},${district},${address},${phone_num},${added_day},${expire_date})
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

    // get all active post ascending by date
    static async getAllActivePosts(){
        const posts = sql`
        SELECT * FROM post where post_id not in( select post_id from buyer_request) ORDER BY added_day DESC;`
        return posts; 
    }
    static async getPost(postid){
        const post=sql`
        select 
        post.post_id,post.farmer_id, post.product_name, post.title, post.description, post.product_category, post.quantity, post.expected_price, post.available_district,post.available_address, post.contact_no,post.added_day,post.img_data, 
        userinfo.email, userinfo.first_name, userinfo.last_name 
        from post natural join userinfo where userinfo.uid=post.farmer_id and post_id=${postid} and status='Active';`
        return post;
    }

}

module.exports = Post;