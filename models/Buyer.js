const sql = require('../config/db');

class Buyer {
    static async create(firstName,lastName,email, hashedPassword, nicNumber, contactNo, district) {
        //transaction as insert is one to two tables
        const [createdUser, createdBuyer] = await sql.begin(async sql => {
            const [User] = await sql`
            INSERT INTO UserInfo 
                ( email, type, password,first_name,last_name ) 
            VALUES 
                ( ${email}, 'buyer', ${hashedPassword},${firstName},${lastName} )
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
}

module.exports = Buyer;