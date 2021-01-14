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

    static async getUserById(id) {
        const [user] = await sql`
            SELECT * from farmer 
            WHERE uid=${id}
        `;
        return user;
    }

    static async isUIDRegistetred(uid) {
        const [user] = await sql`
            SELECT uid from farmer 
            WHERE uid=${uid}
        `;
        return user != null;
    }

    static async getFarmers(limit){
        let data;

        if(!limit){
            data = await sql` SELECT U.uid,nic,contact_no,district,address,email,first_name,last_name,gender,banned FROM farmer AS F NATURAL JOIN userinfo AS U WHERE F.uid = U.uid ORDER BY U.banned,U.joined DESC`;
        }else{
            data = await sql` SELECT U.uid,nic,contact_no,district,address,email,first_name,last_name,gender,banned FROM farmer AS F NATURAL JOIN userinfo AS U WHERE F.uid = U.uid ORDER BY U.banned,U.joined DESC LIMIT ${limit}`;
        }

        return data;
    }
}

module.exports = Farmer;