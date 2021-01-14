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
}

module.exports = Farmer;