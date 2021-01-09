const sql = require('../config/db');

class User {
    static async getById(id) {
        const [user] = await sql`
            SELECT * from User 
            WHERE id=${id}
        `;
        return user;
    }

    static async isEmailRegistered(email) {
        const [user] = await sql`
            SELECT id from User 
            WHERE email=${email}
        `;
        return user != null;
    }

    static async getByEmail(email) {
        const [user] = await sql`
            SELECT * from User
            WHERE email=${email}
        `;
        return user;
    }

    static async createUser(email, password) {
        const [createdUser] = await sql`
            INSERT INTO Account 
                ( email, password,.. ) 
            VALUES 
                ( ${email}, ${password} )
            RETURNING *
            `;
        return createdUser;
    }
}

module.exports = User;