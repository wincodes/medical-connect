const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "the user route works" }));

module.exports = router;
