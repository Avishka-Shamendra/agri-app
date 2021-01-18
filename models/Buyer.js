const sql = require('../config/db');

class Buyer {
    static async create(firstName,lastName,gender,email, hashedPassword, nicNumber, contactNo, district) {
        //transaction as insert is one to two tables
        const [createdUser, createdBuyer] = await sql.begin(async sql => {
            const [User] = await sql`
            INSERT INTO UserInfo 
                ( email, type, password,first_name,last_name,gender ) 
            VALUES 
                ( ${email}, 'buyer', ${hashedPassword},${firstName},${lastName},${gender} )
            RETURNING *
            `
           
            const [Buyer] = await sql`
            INSERT INTO Buyer
                ( uid, nic, contact_no ,district ) 
            VALUES 
                ( ${User.uid}, ${nicNumber},${contactNo},${district} )
            RETURNING *
            `
           
            return [User, Buyer]
          })
          return [createdUser, createdBuyer];
    }

    static async updateBuyer(firstName,lastName,gender,email, nicNumber, contactNo, district, uid) {
        //transaction as insert is one to two tables
        const [updatedUser, updatedBuyer] = await sql.begin(async sql => {
            const [user] = await sql
            `
            UPDATE UserInfo 
            SET  email=${email}, first_name=${firstName},last_name=${lastName},gender=${gender} 
            WHERE uid=${uid}
            RETURNING *
            `
           
            const [Buyer] = await sql`
            UPDATE Buyer
            SET nic=${nicNumber},contact_no=${contactNo},district=${district}
            WHERE uid=${uid}
            RETURNING *
            `
            return [user, Buyer]
          })
          updatedUser.buyerData=updatedBuyer;
          return updatedUser;
    }

    // static async deleteBuyer(uid){
    //     const [buyer_id] = await sql.begin(async sql=>{
    //        sql`DELETE FROM userinfo WHERE uid=${uid} RETURNING uid`;
    //         return buyer_id;
    //     });
    //     return buyer_id;
    // }

    static async getBuyerByNICLike(nic_query, LIMIT=5){
        nic_query = '%'+nic_query+'%';
        const farmers = await sql`SELECT uid,nic FROM buyer WHERE nic LIKE ${nic_query} ORDER BY nic LIMIT ${LIMIT}`;
        farmers['actor_type'] ='buyer';
        return farmers;
    }



    static async getBuyers(limit){
        let data;

        if(!limit){
            data = await sql` SELECT U.uid,nic,joined,contact_no,district,email,first_name,last_name,gender,banned FROM buyer AS B NATURAL JOIN userinfo AS U WHERE B.uid = U.uid ORDER BY U.first_name ASC, U.last_name ASC, U.banned ASC,U.joined DESC`;
        }else{
            data = await sql` SELECT U.uid,nic,joined,contact_no,district,email,first_name,last_name,gender,banned FROM buyer AS B NATURAL JOIN userinfo AS U WHERE B.uid = U.uid ORDER BY U.first_name ASC, U.last_name ASC, U.banned ASC,U.joined DESC LIMIT ${limit}`;
        }
        return data;
    }

    static async getBuyer(uid){
        const [buyer] = await sql` SELECT U.uid,nic,contact_no,district,joined,email,first_name,last_name,gender,banned FROM buyer AS B NATURAL JOIN userinfo AS U WHERE B.uid = U.uid AND B.uid=${uid} ORDER BY U.first_name ASC, U.last_name ASC, U.banned ASC,U.joined DESC`;
        
        return buyer;
    }
}

module.exports = Buyer;