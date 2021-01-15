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

    static async getBuyers(limit){
        let data;

        if(!limit){
            data = await sql` SELECT U.uid,nic,contact_no,district,email,first_name,last_name,gender,banned FROM buyer AS B NATURAL JOIN userinfo AS U WHERE B.uid = U.uid ORDER BY U.banned,U.joined DESC`;
        }else{
            data = await sql` SELECT U.uid,nic,contact_no,district,email,first_name,last_name,gender,banned FROM buyer AS B NATURAL JOIN userinfo AS U WHERE B.uid = U.uid ORDER BY U.banned,U.joined DESC LIMIT ${limit}`;
        }

        //console.log(data);
        return data;
    }
}

module.exports = Buyer;