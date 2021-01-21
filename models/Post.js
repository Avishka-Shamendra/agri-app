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

    //added image
    static async getAllPost(){
        const posts = await sql`
        SELECT post.*,encode(post_image.data, 'base64') AS img_b64
        FROM post 
        LEFT JOIN post_image ON(post.post_id=post_image.post_id)
        INNER JOIN UserInfo ON post.farmer_id=userinfo.uid
        ORDER BY added_day DESC, title ASC;`
        return posts;
    }

    //added image
    static async getRecentPosts(){
        const posts = sql`
        SELECT post.*,encode(post_image.data, 'base64') AS img_b64
        FROM post
        LEFT JOIN post_image ON(post.post_id=post_image.post_id)
        WHERE status='Active' ORDER BY added_day DESC, title ASC LIMIT 10;`
        return posts;
    }

    //get all posts belong to a farmer
    //added image
    static async getFarmerPostsById(uid){
        const posts = await sql`
        SELECT post.*,encode(post_image.data, 'base64') AS img_b64 
        FROM post
        LEFT JOIN post_image ON(post.post_id=post_image.post_id)
         WHERE farmer_id=${uid} ORDER BY added_day DESC, title ASC;`
        return posts; 
    }

    //added image
    static async getFilteredPosts(min_price,max_price,min_quantity,max_quantity,filter_category,filter_district,buyer_id){
        if(filter_category && filter_district){
            const posts = await sql`
            SELECT post.*,encode(post_image.data, 'base64') AS img_b64 ,UserInfo.email,UserInfo.first_name,UserInfo.last_name,buyer_request.req_msg_id FROM post
            LEFT JOIN post_image ON(post.post_id=post_image.post_id)
             INNER JOIN UserInfo 
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
            SELECT post.*,encode(post_image.data, 'base64') AS img_b64 ,UserInfo.email,UserInfo.first_name,UserInfo.last_name,buyer_request.req_msg_id FROM post
            LEFT JOIN post_image ON(post.post_id=post_image.post_id)
             INNER JOIN UserInfo 
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
            SELECT post.*,encode(post_image.data, 'base64') AS img_b64 ,UserInfo.email,UserInfo.first_name,UserInfo.last_name,buyer_request.req_msg_id FROM post 
            LEFT JOIN post_image ON(post.post_id=post_image.post_id)
            INNER JOIN UserInfo 
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
            SELECT post.*,encode(post_image.data, 'base64') AS img_b64 ,UserInfo.email,UserInfo.first_name,UserInfo.last_name,buyer_request.req_msg_id FROM post 
            LEFT JOIN post_image ON(post.post_id=post_image.post_id)
            INNER JOIN UserInfo 
            ON UserInfo.uid=Post.farmer_id
            LEFT JOIN buyer_request ON (buyer_request.buyer_id,buyer_request.post_id)=(${buyer_id},post.post_id)
            WHERE status='Active'
            AND expected_price >= ${min_price} AND expected_price <=${max_price}
            AND quantity >= ${min_quantity} AND quantity <= ${max_quantity}
            ORDER BY added_day DESC, title ASC LIMIT 30;`
            return posts; 
        }
       
    }

    //added image
    static async getAllActivePosts(){
        const posts = await sql`
            SELECT post.*,UserInfo.email,UserInfo.first_name,UserInfo.last_name,encode(post_image.data, 'base64') AS img_b64 
            FROM post 
            LEFT JOIN post_image ON(post.post_id=post_image.post_id)
            INNER JOIN UserInfo 
            ON UserInfo.uid=Post.farmer_id
            WHERE status='Active' ORDER BY added_day DESC, title ASC LIMIT 30;`
            return posts; 
    }

    //added image
    static async getAllActivePostsWithMsgState(buyer_id){
        const posts = await sql`
             SELECT post.*,encode(post_image.data, 'base64') AS img_b64 , UserInfo.email,UserInfo.first_name,UserInfo.last_name,buyer_request.req_msg_id
            FROM post
            LEFT JOIN post_image ON(post.post_id=post_image.post_id)
            INNER JOIN UserInfo ON UserInfo.uid=Post.farmer_id
            LEFT JOIN buyer_request ON (buyer_request.buyer_id,buyer_request.post_id)=(${buyer_id},post.post_id)
            WHERE status='Active' ORDER BY added_day DESC, title ASC LIMIT 30;`
            return posts; 
    }

    //added image
    static async getPostsofFarmer(uid,limit){
        let data ;
            if(!limit){
                data = await sql`SELECT farmer.*,P.*,encode(post_image.data, 'base64') AS img_b64 
                FROM farmer
                INNER JOIN post AS P ON P.farmer_id=farmer.uid
                LEFT JOIN post_image ON(P.post_id=post_image.post_id)
                WHERE P.farmer_id = ${uid} ORDER BY added_day DESC,title ASC`;
            }
            else{
                data = await sql`SELECT farmer.*,P.*,encode(post_image.data, 'base64') AS img_b64 
                FROM farmer
                INNER JOIN FROM post AS P ON P.farmer_id=farmer.uid
                LEFT JOIN post_image ON(P.post_id=post_image.post_id)
                WHERE P.farmer_id = ${uid} ORDER BY added_day DESC,title ASC LIMIT ${limit}`;
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
            default:
                data = await sql`SELECT COUNT(*) FROM post`;
                break
        }

        return data;
    }

    //added image
    static async getPostFarmerView(post_id){
        const [post]= await sql`
        select 
        post.*,
        encode(post_image.data, 'base64') AS img_b64,
        userinfo.email, userinfo.first_name, userinfo.last_name 
        FROM post 
        LEFT JOIN post_image ON(post.post_id=post_image.post_id)
        natural join userinfo
        where userinfo.uid=post.farmer_id and post.post_id=${post_id}`;
        return post;

    }

    //added image
    static async getPost(postid){
        const [post]= await sql`
        select 
        post.*,encode(post_image.data, 'base64') AS img_b64,
        userinfo.email, userinfo.first_name, userinfo.last_name 
        from post 
        LEFT JOIN post_image ON(post.post_id=post_image.post_id)
        natural join userinfo where userinfo.uid=post.farmer_id and post.post_id=${postid} and status='Active'`;
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

    static async updateExpired(){
        await sql`
        UPDATE post SET status='Expired'
        WHERE exp_day<NOW()
        `;
        return true;
    }

    static async deleteAllSoldPost(){
        await sql`DELETE FROM post WHERE status='Sold'`;
        return true;
    }

    static async deleteAllExpiredPost(){
        await sql`DELETE FROM post WHERE status='Expired'`;
        return true;
    }
}

module.exports = Post;