
const sql = require('../config/db');
class Complain{
    static async addComplain(complainer_id,complainee_id,reasons){
        const [complain] = await sql`
            INSERT INTO Complain
                ( uid,complainer_id,body) 
            VALUES 
                ( ${complainee_id}, ${complainer_id}, ${reasons})
            RETURNING *
            `;
        return complain;
    }

    static async isAlreadyComplained(complainer_id, complainee_id){
        const [id]=await sql`
        SELECT comp_id FROM Complain  where uid=${complainee_id} and complainer_id=${complainer_id}
        `;
        return id!=null;
    }


}
module.exports=Complain