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
}

module.exports = Buyer;