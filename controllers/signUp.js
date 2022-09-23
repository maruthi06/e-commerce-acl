const { signUpUser } = require("../models/user");
const { generateToken } = require("../utility/token");

const router = require("express").Router();

router.post("/", async (req, res) => {
    const { email, password, role } = req.body;
    const { access } = req.roleData;

    try {
        await signUpUser({ email, password, role });

        const token = generateToken({ email, password, role, access });

        res.status(201).send({
            token,
            message: "Regsitration successful"
        })
    } catch (error) {
        res.status(500).send({
            message: "Registration failed"
        });
    }
});

module.exports = router;