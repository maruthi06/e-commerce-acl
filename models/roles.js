const mongoInstance = require("../utility/db.connection");

const dbInstance = mongoInstance.getDbInstance();
const roles = dbInstance.collection('roles');

async function validateRole(role) {
    try {
        const roleObj = await roles.findOne({ role });

        return roleObj;
    } catch (error) {
        throw error;
    }
}

// run only once
async function addRoles() {
    await roles.drop();
    const insertRoles = [
        {
            role: "admin",
            access: [
                "get", "post", "put", "patch", "delete"
            ]
        },
        {
            role: "seller",
            access: [
                "get", "post", "put", "patch"
            ]
        },
        {
            role: "supporter",
            access: [
                "get", "delete"
            ]
        },
        {
            role: "customer",
            access: [
                "get"
            ]
        }
    ];

    await roles.insertMany(insertRoles);
}

module.exports = { validateRole, addRoles };