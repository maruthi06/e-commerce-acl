const express = require("express");
const bodyParser = require("body-parser");

const productRouter = require("./controllers/products");
const signUpRouter = require("./controllers/signUp");
const loginRouter = require("./controllers/login");

const mongoInstance = require("./utility/db.connection");
const { SignUpMiddleware, LoginMiddleware, ProductMiddleware } = require('./utility/middleware');
const { addRoles } = require("./models/roles");

(async () => {
    try {
        await mongoInstance.getInstance();
        await addRoles();

        const app = express();

        app.use(bodyParser.json());

        app.use("/products", ProductMiddleware, productRouter);
        app.use("/signup", SignUpMiddleware, signUpRouter);
        app.use("/login", LoginMiddleware, loginRouter);

        app.get("/", (req, res) => {
            res.send("Server is up & running");
        });

        app.listen(8080, () => {
            console.log("server started");
        });
    } catch (error) {
        console.log("Error in server", error);
        process.exit(1);
    }
})();