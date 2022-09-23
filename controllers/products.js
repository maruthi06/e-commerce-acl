const router = require("express").Router();

/* 
GET ->
Response - { message: "Products sent successfully" }
Status code - 200
POST ->
Response - { message: "Product added successfully" }
Status code - 201
PUT, PATCH ->
Response - { message: "Product updated successfully" }
Status code - 200
DELETE ->
Response - { message: "Product deleted successfully" }
Status code - 200

 */

router.get("/", (req, res) => {
    res.send({ message: "Products sent successfully" });
});

router.post("/", (req, res) => {
    res.status(201).send({ message: "Products added successfully" });
});

router.put("/", (req, res) => {
    res.send({ message: "Products updated successfully" });
});

router.patch("/", (req, res) => {
    res.send({ message: "Products updated successfully" });
});

router.delete("/", (req, res) => {
    res.send({ message: "Products deleted successfully" });
});

module.exports = router;