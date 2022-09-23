const { validateRole } = require("../models/roles");

const router = require("express").Router();

router.post("/", async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const { access } = await validateRole(role);

        const token = generateToken({ email, password, role, access });

        res.send({
            token,
            message: "Login successful"
        })
    } catch (error) {
        res.status(500).send({
            message: "Login failed"
        });
    }
});

module.exports = router;