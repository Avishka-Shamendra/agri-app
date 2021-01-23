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

    static async deleteAccount(uid){
        await sql`DELETE
        FROM UserInfo
        WHERE uid=${uid}`;
    }

    static async isNICregistered(nic){
        const [farmer] = await sql`SELECT
        nic FROM Farmer
        WHERE nic=${nic}`;
        const [buyer] = await sql`SELECT
        nic FROM Buyer
        WHERE nic=${nic}`;
        return farmer!=null || buyer!=null;

    }

    static async banUser(uid){
        const [updatedUser] = await sql`
            UPDATE userinfo
                SET banned = true
            WHERE uid = ${uid}
            RETURNING first_name,last_name
        `;
        return updatedUser;
    }

    static async unbanUser(uid){
        const [updatedUser] = await sql`
            UPDATE userinfo
                SET banned = false
            WHERE uid = ${uid}
            RETURNING first_name,last_name
        `;
        return updatedUser;
    }

    static async numUsers(type){
        let data;

        switch (type) {
            case 'admin':
                data = await sql`SELECT COUNT(*) FROM (SELECT uid FROM userinfo WHERE type='admin') AS U;`;
                break
            case 'farmer':
                data = await sql`SELECT COUNT(*) FROM (SELECT uid FROM userinfo WHERE type='farmer') AS U;`;
                break
            case 'buyer':
                data = await sql`SELECT COUNT(*) FROM (SELECT uid FROM userinfo WHERE type='buyer') AS U;`;
                break
            default:
                data = await sql`SELECT COUNT(*) FROM userinfo;`;
                break
        }

        return data;
    }

    static async getFarmerByNameLike(name_query,LIMIT=5){
        name_query = '%'+name_query+'%'
        const users = await sql`SELECT uid,first_name,last_name,type FROM userinfo WHERE LOWER(first_name) LIKE LOWER(${name_query}) OR LOWER(last_name) LIKE LOWER(${name_query}) ORDER BY first_name ASC,last_name DESC LIMIT ${LIMIT}`;

        return users;
    }
}

module.exports = User;