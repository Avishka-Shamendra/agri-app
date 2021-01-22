const sql = require('../config/db');

class Farmer {
    static async create(firstName,lastName,gender,email, hashedPassword, nicNumber, contactNo, address, district) {
        //transaction as insert is one to two tables
        const [createdUser, createdFarmer] = await sql.begin(async sql => {
            const [user] = await sql`
            INSERT INTO UserInfo
                ( email, type, password,first_name,last_name,gender ) 
            VALUES 
                ( ${email}, 'farmer', ${hashedPassword},${firstName},${lastName},${gender} )
            RETURNING *
            `
           
            const [Farmer] = await sql`
            INSERT INTO Farmer 
                ( uid, nic, contact_no , district , address ) 
            VALUES 
                ( ${user.uid}, ${nicNumber},${contactNo},${district},${address} )
            RETURNING *
            `
           
            return [user, Farmer]
          })
          return [createdUser, createdFarmer]
    }

    static async updateFarmer(firstName,lastName,gender,email, nicNumber, contactNo, address, district, uid) {
        //transaction as insert is one to two tables
        const [updatedUser, updatedFarmer] = await sql.begin(async sql => {
            const [user] = await sql
            `
            UPDATE UserInfo 
            SET  email=${email}, first_name=${firstName},last_name=${lastName},gender=${gender} 
            WHERE uid=${uid}
            RETURNING *
            `
           
            const [Farmer] = await sql`
            UPDATE Farmer
            SET nic=${nicNumber},contact_no=${contactNo},district=${district},address=${address}
            WHERE uid=${uid}
            RETURNING *
            `
            return [user, Farmer]
          })
          updatedUser.farmerData=updatedFarmer;
          return updatedUser;
    }

    static async getFarmers(limit){
        let data;

        if(!limit){
            data = await sql` SELECT U.uid,nic,contact_no,district,address,email,first_name,last_name,gender,banned
             FROM farmer AS F 
             NATURAL JOIN userinfo AS U 
             WHERE
              F.uid = U.uid ORDER BY U.first_name ASC, U.last_name ASC, U.banned ASC,U.joined DESC`;
        }else{
            data = await sql` SELECT U.uid,nic,contact_no,district,address,email,first_name,last_name,gender,banned
             FROM farmer AS F 
             NATURAL JOIN userinfo AS U
              WHERE
              F.uid = U.uid ORDER BY U.first_name ASC, U.last_name ASC, U.banned ASC,U.joined DESC LIMIT ${limit}`;
        }

        return data;
    }

    static async getFarmer(uid){
        const [farmer] = await sql` SELECT U.uid,nic,contact_no,district,joined,address,email,first_name,last_name,gender,banned FROM farmer AS F NATURAL JOIN userinfo AS U WHERE F.uid = U.uid AND F.uid=${uid} ORDER BY U.first_name ASC, U.last_name ASC, U.banned ASC,U.joined DESC`;
        
        return farmer;
    }

    static async getFarmerByNICLike(nic_query,LIMIT=5){
        nic_query = '%'+nic_query+'%';
        const farmers = await sql`SELECT uid,nic FROM farmer WHERE nic LIKE ${nic_query} ORDER BY nic DESC LIMIT ${LIMIT}`;
        farmers['actor_type'] ='farmer';
        return farmers;
    }

    // static async deleteFarmer(uid){
    //     const [farmer_id] = await sql.begin(async sql=>{
    //         await  sql`DELETE FROM userinfo WHERE uid=${uid} RETURNING uid`;
    //         return farmer_id;
    //     });

    //     return farmer_id;
    // }
}

module.exports = Farmer;