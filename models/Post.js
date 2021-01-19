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
        const posts = await sql`
        SELECT * FROM post 
        INNER JOIN UserInfo ON post.farmer_id=userinfo.uid
        ORDER BY added_day DESC, title ASC;`
        return posts;
    }

    static async getRecentPosts(){
        const posts = sql`
        SELECT * FROM post WHERE status='Active' ORDER BY added_day DESC, title ASC LIMIT 10;`
        return posts;
    }

    //get all posts belong to a farmer
    static async getFarmerPostsById(uid){
        const posts = await sql`
        SELECT * FROM post WHERE farmer_id=${uid} ORDER BY added_day DESC, title ASC;`
        return posts; 
    }

    static async getFilteredPosts(min_price,max_price,min_quantity,max_quantity,filter_category,filter_district,buyer_id){
        if(filter_category && filter_district){
            const posts = await sql`
            SELECT post.*,UserInfo.email,UserInfo.first_name,UserInfo.last_name,buyer_request.req_msg_id FROM post INNER JOIN UserInfo 
            ON UserInfo.uid=Post.farmer_id
            LEFT JOIN buyer_request ON (buyer_request.buyer_id,buyer_request.post_id)=(${buyer_id},post.post_id)
            WHERE status='Active'
             AND product_category=${filter_category} AND available_district=${filter_district}
             AND expected_price >= ${min_price} AND expected_price <=${max_price}
             AND quantity >= ${min_quantity} AND quantity <= ${max_quantity}
              ORDER BY added_day DESC, title ASC LIMIT 30;`
            return posts; 
        }
        if(filter_category){
            const posts = await sql`
            SELECT post.*,UserInfo.email,UserInfo.first_name,UserInfo.last_name FROM,buyer_request.req_msg_id post INNER JOIN UserInfo 
            ON UserInfo.uid=Post.farmer_id
            LEFT JOIN buyer_request ON (buyer_request.buyer_id,buyer_request.post_id)=(${buyer_id},post.post_id)
            WHERE status='Active' AND product_category=${filter_category}
            AND expected_price >= ${min_price} AND expected_price <=${max_price}
             AND quantity >= ${min_quantity} AND quantity <= ${max_quantity}
             ORDER BY added_day DESC, title ASC LIMIT 30;`
            return posts; 
        }
        if(filter_district){
            const posts = await sql`
            SELECT post.*,UserInfo.email,UserInfo.first_name,UserInfo.last_name,buyer_request.req_msg_id FROM post INNER JOIN UserInfo 
            ON UserInfo.uid=Post.farmer_id
            LEFT JOIN buyer_request ON (buyer_request.buyer_id,buyer_request.post_id)=(${buyer_id},post.post_id)
            WHERE status='Active' AND available_district=${filter_district}
            AND expected_price >= ${min_price} AND expected_price <=${max_price}
             AND quantity >= ${min_quantity} AND quantity <= ${max_quantity}
             ORDER BY added_day DESC, title ASC LIMIT 30;`
            return posts; 
        }
        else{
            const posts = await sql`
            SELECT post.*,UserInfo.email,UserInfo.first_name,UserInfo.last_name,buyer_request.req_msg_id FROM post INNER JOIN UserInfo 
            ON UserInfo.uid=Post.farmer_id
            LEFT JOIN buyer_request ON (buyer_request.buyer_id,buyer_request.post_id)=(${buyer_id},post.post_id)
            WHERE status='Active'
            AND expected_price >= ${min_price} AND expected_price <=${max_price}
            AND quantity >= ${min_quantity} AND quantity <= ${max_quantity}
            ORDER BY added_day DESC, title ASC LIMIT 30;`
            return posts; 
        }
       
    }

    static async getAllActivePosts(){
        const posts = await sql`
             SELECT post.*,UserInfo.email,UserInfo.first_name,UserInfo.last_name FROM post INNER JOIN UserInfo 
            ON UserInfo.uid=Post.farmer_id
            WHERE status='Active' ORDER BY added_day DESC, title ASC LIMIT 30;`
            return posts; 
    }

    static async getAllActivePostsWithMsgState(buyer_id){
        const posts = await sql`
             SELECT post.*,UserInfo.email,UserInfo.first_name,UserInfo.last_name,buyer_request.req_msg_id FROM post INNER JOIN UserInfo 
            ON UserInfo.uid=Post.farmer_id
            LEFT JOIN buyer_request ON (buyer_request.buyer_id,buyer_request.post_id)=(${buyer_id},post.post_id)
            WHERE status='Active' ORDER BY added_day DESC, title ASC LIMIT 30;`
            return posts; 
    }

    static async getPostsofFarmer(uid,limit){
        let data ;
            if(!limit){
                data = await sql`SELECT * FROM farmer INNER JOIN post AS P ON P.farmer_id=farmer.uid WHERE P.farmer_id = ${uid} ORDER BY added_day DESC,title ASC`;
            }
            else{
                data = await sql`SELECT * farmer INNER JOIN FROM post AS P ON P.farmer_id=farmer.uid WHERE P.farmer_id = ${uid} ORDER BY added_day DESC,title ASC LIMIT ${limit}`;
            }
        return data;
    }


    static async numPosts(status){
        let data;

        switch (status){
            case 'Active':
                data = await sql`SELECT COUNT(*) FROM (SELECT post_id FROM post WHERE status='Active') AS P`;
                break
            case 'Expired':
                data = await sql`SELECT COUNT(*) FROM (SELECT post_id FROM post WHERE status='Expired') AS P`;
                break
            case 'Sold':
                data = await sql`SELECT COUNT(*) FROM (SELECT post_id FROM post WHERE status='Sold') AS P`;
                break
            case 'Deleted':
                data = await sql`SELECT COUNT(*) FROM (SELECT post_id FROM post WHERE status='Deleted') AS P`;
                break
            default:
                data = await sql`SELECT COUNT(*) FROM post`;
                break
        }

        return data;
    }

    static async getPostFarmerView(post_id){
        const [post]= await sql`
        select 
        post.*,
        userinfo.email, userinfo.first_name, userinfo.last_name 
        from post natural join userinfo where userinfo.uid=post.farmer_id and post_id=${post_id};`
        return post;

    }

    static async getPost(postid){
        const post=sql`
        select 
        post.*,
        userinfo.email, userinfo.first_name, userinfo.last_name 
        from post natural join userinfo where userinfo.uid=post.farmer_id and post_id=${postid} and status='Active';`
        return post;

    }

    static async deletePost(post_id){
        const [post]=await sql`DELETE FROM post WHERE post_id=${post_id} RETURNING *`;
        return post;
    }

    static async markAsSold(post_id){
        const [post]=await sql`
        UPDATE post 
        SET status='Sold' WHERE post_id=${post_id}
        RETURNING *
        `;
        return post;
    }
}

module.exports = Post;