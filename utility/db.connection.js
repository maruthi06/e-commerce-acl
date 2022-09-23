const { MongoClient } = require("mongodb");

class MongoInstance {
    constructor() {
        const connectionString = process.env["MONGO_CONNECTION_STRING"] || "mongodb://localhost:27017/e-commarce";
        this.mongoClient = new MongoClient(connectionString);
        this.isConnected = false;
    }

    async getInstance() {
        try {
            if (!this.isConnected) {
                this.mongoClient = await this.mongoClient.connect();

                this.isConnected = true;
            }

            console.log("DB connected");
            return this.mongoClient;
        } catch (error) {
            console.log("Error while connecting to db", error);
            throw error;
        }
    }

    getDbInstance() {
        return this.mongoClient.db();
    }
}

const mongoInstance = new MongoInstance();


module.exports = mongoInstance;