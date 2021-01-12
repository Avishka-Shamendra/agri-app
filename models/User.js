const sql = require('../config/db');

class User {
    static async getUserById(id) {
        const [user] = await sql`
            SELECT * from UserInfo 
            WHERE uid=${id}
        `;
        return user;
    }

    static async isEmailRegistetred(email) {
        const [user] = await sql`
            SELECT uid from userinfo 
            WHERE email=${email}
        `;
        return user != null;
    }
    

    static async findUser(email) {
        //no need of transactions as all are selects.
        const [user] = await sql`
            SELECT * from userinfo
            WHERE email=${email}
        `;
        if(user && user.type==='farmer'){
            const[farmerData]=await sql`
            SELECT * from Farmer
            WHERE uid=${user.uid}
            `;
            user.farmerData=farmerData;
        }
        if(user && user.type==='buyer'){
            const[buyerData]=await sql`
            SELECT * from Buyer
            WHERE uid=${user.uid}
            `;
            user.buyerData=buyerData;
        }
        return user;
    }

    static async createUser(firstName,lastName,gender,email, hashedPassword) {
        const [createdUser] = await sql`
            INSERT INTO UserInfo 
                ( email, type, password, first_name,last_name,gender ) 
            VALUES 
                ( ${email}, 'admin', ${hashedPassword},${firstName},${lastName},${gender} )
            RETURNING *
            `;
        return createdUser;
    }

    static async updateUser(firstName,lastName,gender,email,uid) {
        const [updatedUser] = await sql`
            UPDATE UserInfo 
            SET  email=${email}, first_name=${firstName},last_name=${lastName},gender=${gender} 
            WHERE uid=${uid}
            RETURNING *
            `;
        return updatedUser;
    }

    static async updatePassword(password,uid){
         await sql`
            UPDATE UserInfo 
            SET  password=${password}
            WHERE uid=${uid}
            `;
        return true;
    }
}

module.exports = User;