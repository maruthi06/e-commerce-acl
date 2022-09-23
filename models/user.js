const mongoInstance = require("../utility/db.connection");

const dbInstance = mongoInstance.getDbInstance();
const user = dbInstance.collection('user');

async function checkUserAvilable(email) {
    try {
        const checkUser = await user.findOne({ email });

        return checkUser;
    } catch (error) {
        throw error;
    }
}

async function signUpUser(userObject) {
    try {
        const insertObj = await user.insertOne({ ...userObject, createdTime: new Date() });

        return insertObj;
    } catch (error) {
        throw error;
    }
}

async function loginUser(email, password) {
    try {
        const user = await user.findOne({ email, password });

        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = { signUpUser, loginUser, checkUserAvilable };