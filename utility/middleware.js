const { validateRole } = require("../models/roles");
const { loginUser, checkUserAvilable } = require("../models/user");
const { validateToken } = require("./token");

async function SignUpMiddleware(req, res, next) {
    const role = req.body.role;

    const checkUser = await checkUserAvilable(req.body.email);

    if (!checkUser) {
        const checkRole = await validateRole(role);

        if (checkRole) {
            req.roleData = checkRole;
            next();
        } else {
            return res.status(400).send({
                message: "invalid role passed"
            });
        }
    } else {
        return res.status(400).send({
            message: "User email already available"
        });
    }
}

async function LoginMiddleware(req, res, next) {
    const { email, password } = req.body.role;
    const checkUser = await loginUser(email, password);

    if (checkUser) {
        req.userInfo = checkUser;
        next();
    } else {
        return res.status(400).send({
            message: "invalid role passed"
        });
    }
}

function ProductMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        try {
            const method = req.method;
            const { email, role, access } = validateToken(token);

            console.log(email, role, access, method);

            if (access.includes(method.toLowerCase())) {
                req.userInfo = { email, role, access };
                next();
            } else {
                res.status(401).send({
                    message: "Not authorized to access endpoint"
                });
            }
        } catch (error) {
            res.status(401).send({
                message: "Not authorized to access endpoint"
            });
        }
    } else {
        res.status(401).send({
            message: "Missing token"
        });
    }
}

module.exports = { SignUpMiddleware, LoginMiddleware, ProductMiddleware };