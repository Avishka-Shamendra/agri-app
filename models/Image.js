const sql = require("./../config/db");

//SELECT encode(data, 'base64') FROM image where id = 145

class ImageClass{
    static  async addPostImg(details){
        const [post_id] = await sql.begin(async sql => {
            const [img_data]= await sql`
            SELECT img_data FROM post WHERE post_id=${details['post_id']}
            `
            if(!img_data.img_data){
                const [post] = await sql`
                Update post set img_data= true 
                WHERE post_id=${details['post_id']}
                returning *
                `
                const [post_id] = await sql`
                INSERT INTO Post_image 
                ( post_id, img_type, name, data)
                VALUES
                ( ${details['post_id']}, ${details['type']}, ${details['name']}, ${details['data']})
                RETURNING post_id
                `
                return [post_id]

            }else{
                const [post_id] = await sql`
                UPDATE Post_image 
                SET img_type=${details['type']},name=${details['name']},data=${details['data']}
                WHERE post_id=${details['post_id']}
                RETURNING post_id
                `
                return [post_id]
            }
            
          });
          return post_id;
    }
}


module.exports = ImageClass;