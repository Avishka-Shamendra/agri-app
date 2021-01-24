
const sql = require('../config/db');
class Complain{
    static async addComplain(complainer_id,complainee_id,reasons,added_day){
        const [complain] = await sql`
            INSERT INTO Complain
                ( uid,complainer_id,body,added_on) 
            VALUES 
                ( ${complainee_id}, ${complainer_id}, ${reasons},${added_day})
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

    static async getAllComplains(){
        const complains = await sql`
        SELECT complain.*,
        N.first_name as N_first,N.last_name as N_last,N.type as N_type,
        R.first_name as R_first,R.last_name as R_last,R.type as R_type
        FROM complain
        INNER JOIN userinfo as N ON N.uid=complain.uid
        INNER JOIN userinfo as R ON R.uid=complain.complainer_id
        ORDER BY added_on DESC
        `;
        return complains;
    }

    static async delete(id){
        await sql`
        DELETE FROM complain WHERE comp_id=${id}
        `;
        return true;
    }

    static async getCount(){
        const count= await sql`SELECT COUNT(*) FROm complain`;
        return count;
       }


}
module.exports=Complain