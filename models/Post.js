const sql = require('../config/db');

class Post{
    static async createPost(details){
        const [createdPost] = await sql`
            INSERT INTO post 
                ( farmer_id, product_name,  title,  description, product_category, quantity, expected_price, available_district, available_address, status, added_day, exp_day, img_url ) 
            VALUES 
                ( ${details['uid']}, ${details['product_name']}, ${details['title']},${details['description']},${details['product_category']},${details['quantity']},${details['expected_price']},${details['district']},${details['address']},${details['status']},${details['added_day']},${details['exp_day']}, ${details['img_url']} )
            RETURNING *
            `;
        return createdPost;
    }

    static async retrieveAllPost(Info){
        //console.log(`SELECT ${Info.labels} FROM post NATURAL LEFT JOIN images ${Info.WhereClause} ORDER BY ${Info.sort_param} ${Info.sort_order} ${Info.maxPost};`);
        //console.log(Info);
        //const query = Info.WhereClause+' ORDER BY '+ Info.sort_param+' '+Info.sort_order+' '+Info.maxPost
        //const query_t = "SELECT post_id,farmer_id,product_name,title,description,product_category,quantity,expected_price,available_district,available_address,status,added_day,exp_day,encode(data, 'base64') FROM post NATURAL LEFT JOIN images  ORDER BY  added_day DESC ;"
        //console.log(`SELECT ${ Info.labels_sting } FROM post NATURAL LEFT JOIN images ${ Info.WhereClause } ORDER BY ${ Info.sort_param } ${ Info.sort_order } ${ Info.maxPost }`);
        let data;

        switch (Info['all']) {
            case true:
                switch (Info['sort_param']) {
                    case 'added_day':
                        switch (Info['sort_order']) {
                            case 'DESC':
                                data = await sql`SELECT post_id,farmer_id,product_name,title,description,product_category,quantity,expected_price,available_district,available_address,status,added_day,exp_day,encode FROM post as P NATURAL LEFT JOIN (SELECT post_id , encode(data,'base64') AS encode FROM images) AS IMG WHERE P.post_id = IMG.post_id ORDER BY added_day DESC LIMIT ${Info['maxPost']}`;
                                break;
                            case 'ASC':
                                data = await sql`SELECT post_id,farmer_id,product_name,title,description,product_category,quantity,expected_price,available_district,available_address,status,added_day,exp_day,encode FROM post as P NATURAL LEFT JOIN (SELECT post_id , encode(data,'base64') AS encode FROM images) AS IMG WHERE P.post_id = IMG.post_id ORDER BY added_day ASC LIMIT ${Info['maxPost']}`;
                                break
                        }
                }
                break;
            case false:
                switch (Info['sort_param']) {
                    case 'added_day':
                        switch (Info['sort_order']) {
                            case 'DESC':
                                data = await sql`SELECT post_id,farmer_id,product_name,title,description,product_category,quantity,expected_price,available_district,available_address,status,added_day,exp_day,encode FROM post as P NATURAL LEFT JOIN (SELECT post_id , encode(data,'base64') AS encode FROM images) AS IMG WHERE P.post_id = IMG.post_id ORDER BY added_day DESC`;
                                break;
                            case 'ASC':
                                data = await sql`SELECT post_id,farmer_id,product_name,title,description,product_category,quantity,expected_price,available_district,available_address,status,added_day,exp_day,encode FROM post as P NATURAL LEFT JOIN (SELECT post_id , encode(data,'base64') AS encode FROM images) AS IMG WHERE P.post_id = IMG.post_id ORDER BY added_day ASC`;
                                break
                        }
                }
                break;


        }

        //return data;




        //console.log(data)
        //console.log(data.length);
        return data;
    }


}

module.exports = Post;