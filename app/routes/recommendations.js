const express = require("express");
const recommendations = require("../controllers/recommendations.controller");
// import all the routes here
const router = express.Router();

router.get("/", recommendations.get);
router.post("/generate", recommendations.generate);

module.exports = router;
